(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.Recorder = f()
    }
})(function () {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {exports: {}};
                t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }

        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function (require, module, exports) {
            "use strict";

            module.exports = require("./recorder").Recorder;

        }, {"./recorder": 2}], 2: [function (require, module, exports) {
            'use strict';

            var _createClass = (function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            })();

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Recorder = undefined;

            var _inlineWorker = require('inline-worker');

            var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var Recorder = exports.Recorder = (function () {
                function Recorder(source, cfg) {
                    var _this = this;

                    _classCallCheck(this, Recorder);

                    this.config = {
                        bufferLen: 4096,
                        numChannels: 2,
                        mimeType: 'audio/wav'
                    };
                    this.recording = false;
                    this.callbacks = {
                        getBuffer: [],
                        exportWAV: []
                    };

                    Object.assign(this.config, cfg);
                    this.context = source.context;
                    this.node = (this.context.createScriptProcessor || this.context.createJavaScriptNode).call(this.context, this.config.bufferLen, this.config.numChannels, this.config.numChannels);

                    this.node.onaudioprocess = function (e) {
                        if (!_this.recording) return;

                        var buffer = [];
                        for (var channel = 0; channel < _this.config.numChannels; channel++) {
                            buffer.push(e.inputBuffer.getChannelData(channel));
                        }
                        _this.worker.postMessage({
                            command: 'record',
                            buffer: buffer
                        });
                    };

                    source.connect(this.node);
                    this.node.connect(this.context.destination); //this should not be necessary

                    var self = {};
                    this.worker = new _inlineWorker2.default(function () {
                        var recLength = 0,
                            recBuffers = [],
                            sampleRate = undefined,
                            numChannels = undefined;

                        self.onmessage = function (e) {
                            switch (e.data.command) {
                                case 'init':
                                    init(e.data.config);
                                    break;
                                case 'record':
                                    record(e.data.buffer);
                                    break;
                                case 'exportWAV':
                                    exportWAV(e.data.type);
                                    break;
                                case 'getBuffer':
                                    getBuffer();
                                    break;
                                case 'clear':
                                    clear();
                                    break;
                            }
                        };

                        function init(config) {
                            sampleRate = config.sampleRate;
                            numChannels = config.numChannels;
                            initBuffers();
                        }

                        function record(inputBuffer) {
                            for (var channel = 0; channel < numChannels; channel++) {
                                recBuffers[channel].push(inputBuffer[channel]);
                            }
                            recLength += inputBuffer[0].length;
                        }

                        function exportWAV(type) {
                            var buffers = [];
                            for (var channel = 0; channel < numChannels; channel++) {
                                buffers.push(mergeBuffers(recBuffers[channel], recLength));
                            }
                            var interleaved = undefined;
                            if (numChannels === 2) {
                                interleaved = interleave(buffers[0], buffers[1]);
                            } else {
                                interleaved = buffers[0];
                            }
                            var dataview = encodeWAV(interleaved);
                            var audioBlob = new Blob([dataview], {type: type});

                            self.postMessage({command: 'exportWAV', data: audioBlob});
                        }

                        function getBuffer() {
                            var buffers = [];
                            for (var channel = 0; channel < numChannels; channel++) {
                                buffers.push(mergeBuffers(recBuffers[channel], recLength));
                            }
                            self.postMessage({command: 'getBuffer', data: buffers});
                        }

                        function clear() {
                            recLength = 0;
                            recBuffers = [];
                            initBuffers();
                        }

                        function initBuffers() {
                            for (var channel = 0; channel < numChannels; channel++) {
                                recBuffers[channel] = [];
                            }
                        }

                        function mergeBuffers(recBuffers, recLength) {
                            var result = new Float32Array(recLength);
                            var offset = 0;
                            for (var i = 0; i < recBuffers.length; i++) {
                                result.set(recBuffers[i], offset);
                                offset += recBuffers[i].length;
                            }
                            return result;
                        }

                        function interleave(inputL, inputR) {
                            var length = inputL.length + inputR.length;
                            var result = new Float32Array(length);

                            var index = 0,
                                inputIndex = 0;

                            while (index < length) {
                                result[index++] = inputL[inputIndex];
                                result[index++] = inputR[inputIndex];
                                inputIndex++;
                            }
                            return result;
                        }

                        function floatTo16BitPCM(output, offset, input) {
                            for (var i = 0; i < input.length; i++, offset += 2) {
                                var s = Math.max(-1, Math.min(1, input[i]));
                                output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                            }
                        }

                        function writeString(view, offset, string) {
                            for (var i = 0; i < string.length; i++) {
                                view.setUint8(offset + i, string.charCodeAt(i));
                            }
                        }

                        function encodeWAV(samples) {
                            var buffer = new ArrayBuffer(44 + samples.length * 2);
                            var view = new DataView(buffer);

                            /* RIFF identifier */
                            writeString(view, 0, 'RIFF');
                            /* RIFF chunk length */
                            view.setUint32(4, 36 + samples.length * 2, true);
                            /* RIFF type */
                            writeString(view, 8, 'WAVE');
                            /* format chunk identifier */
                            writeString(view, 12, 'fmt ');
                            /* format chunk length */
                            view.setUint32(16, 16, true);
                            /* sample format (raw) */
                            view.setUint16(20, 1, true);
                            /* channel count */
                            view.setUint16(22, numChannels, true);
                            /* sample rate */
                            view.setUint32(24, sampleRate, true);
                            /* byte rate (sample rate * block align) */
                            view.setUint32(28, sampleRate * 4, true);
                            /* block align (channel count * bytes per sample) */
                            view.setUint16(32, numChannels * 2, true);
                            /* bits per sample */
                            view.setUint16(34, 16, true);
                            /* data chunk identifier */
                            writeString(view, 36, 'data');
                            /* data chunk length */
                            view.setUint32(40, samples.length * 2, true);

                            floatTo16BitPCM(view, 44, samples);

                            return view;
                        }
                    }, self);

                    this.worker.postMessage({
                        command: 'init',
                        config: {
                            sampleRate: this.context.sampleRate,
                            numChannels: this.config.numChannels
                        }
                    });

                    this.worker.onmessage = function (e) {
                        var cb = _this.callbacks[e.data.command].pop();
                        if (typeof cb == 'function') {
                            cb(e.data.data);
                        }
                    };
                }

                _createClass(Recorder, [{
                    key: 'record',
                    value: function record() {
                        this.recording = true;
                    }
                }, {
                    key: 'stop',
                    value: function stop() {
                        this.recording = false;
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        this.worker.postMessage({command: 'clear'});
                    }
                }, {
                    key: 'getBuffer',
                    value: function getBuffer(cb) {
                        cb = cb || this.config.callback;
                        if (!cb) throw new Error('Callback not set');

                        this.callbacks.getBuffer.push(cb);

                        this.worker.postMessage({command: 'getBuffer'});
                    }
                }, {
                    key: 'exportWAV',
                    value: function exportWAV(cb, mimeType) {
                        mimeType = mimeType || this.config.mimeType;
                        cb = cb || this.config.callback;
                        if (!cb) throw new Error('Callback not set');

                        this.callbacks.exportWAV.push(cb);

                        this.worker.postMessage({
                            command: 'exportWAV',
                            type: mimeType
                        });
                    }
                }], [{
                    key: 'forceDownload',
                    value: function forceDownload(blob, filename) {
                        var url = (window.URL || window.webkitURL).createObjectURL(blob);
                        var link = window.document.createElement('a');
                        link.href = url;
                        link.download = filename || 'output.wav';
                        var click = document.createEvent("Event");
                        click.initEvent("click", true, true);
                        link.dispatchEvent(click);
                    }
                }]);

                return Recorder;
            })();

            exports.default = Recorder;

        }, {"inline-worker": 3}], 3: [function (require, module, exports) {
            "use strict";

            module.exports = require("./inline-worker");
        }, {"./inline-worker": 4}], 4: [function (require, module, exports) {
            (function (global) {
                "use strict";

                var _createClass = (function () {
                    function defineProperties(target, props) {
                        for (var key in props) {
                            var prop = props[key];
                            prop.configurable = true;
                            if (prop.value) prop.writable = true;
                        }
                        Object.defineProperties(target, props);
                    }

                    return function (Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                })();

                var _classCallCheck = function (instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                };

                var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);

                var InlineWorker = (function () {
                    function InlineWorker(func, self) {
                        var _this = this;

                        _classCallCheck(this, InlineWorker);

                        if (WORKER_ENABLED) {
                            var functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
                            var url = global.URL.createObjectURL(new global.Blob([functionBody], {type: "text/javascript"}));

                            return new global.Worker(url);
                        }

                        this.self = self;
                        this.self.postMessage = function (data) {
                            setTimeout(function () {
                                _this.onmessage({data: data});
                            }, 0);
                        };

                        setTimeout(function () {
                            func.call(self);
                        }, 0);
                    }

                    _createClass(InlineWorker, {
                        postMessage: {
                            value: function postMessage(data) {
                                var _this = this;

                                setTimeout(function () {
                                    _this.self.onmessage({data: data});
                                }, 0);
                            }
                        }
                    });

                    return InlineWorker;
                })();

                module.exports = InlineWorker;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}]
    }, {}, [1])(1)
});

// Recorder 라이브러리 이용하여 RecorderMP3 생성함
(function (window) {

    // Initializing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.URL = window.URL || window.webkitURL;

    var RecorderMP3 = {
        is_init: false,
        audio_context: [],
        audio_stream: null,
        recorder: null,
        url: '',
        audio_format: 'audio/mpeg', // mp3 포맷
        mp3_directory: '/files/tmpRecMP3/shadowing/',
        upload_server: "http://champ.hackers.com/html/",
        upload_handler: "record_upload.php",
        recording_status: false,
        mp3_name: '_recorder',
        is_flash: false,
        saving_status: false,
        mic_state: false,   // 마이크 접근 권한(TRUE:받음 / FALSE:거부당함)
        message_list: '',
        flash_obj: '',
        mic_access_try_cnt: 0,
        is_navigator_checked: false,

        /**
         * 마이크 접근 권한을 요청하고 callback 함수를 실행함(HTML5 일때만 사용가능)
         * @param callback
         */
        getMicAccess: function (callback) {
            var myself = this;

            navigator.mediaDevices.getUserMedia({audio: true})
                .then(function (stream) {
                    stream.getTracks()[0].stop();

                    navigator.mediaDevices.enumerateDevices().then(function(devices) {
                        devices.forEach(function(_device) {
                            var device = {};
                            for (var d in _device) {
                                device[d] = _device[d];
                            }

                            if (device.kind === 'audioinput' && device.label.match(/마이크/)) {
                                myself.mic_state = true;
                            }
                        });

                        if (myself.mic_state) {
                            if (typeof(callback) == "function") {
                                callback(true);
                            }
                        } else {
                            if (typeof(callback) == "function") {
                                callback(false);
                            }
                        }
                    }).catch(function (err) {
                        if (typeof(callback) == "function") {
                            callback(false);
                        }
                    });

                }).catch(function (err) {

                if (typeof(callback) == "function") {
                    callback(false);
                }
            });

        },

        init: function (callback) {

            var myself = this;

            if (!myself.is_init) {

                this.setMessageList();

                try {
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;

                    window.URL = window.URL || window.webkitURL;

                    this.audio_context = new AudioContext;

                    // 마이크 체크
                    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                        // Firefox 38+ seems having support of enumerateDevicesx

                        navigator.mediaDevices.enumerateDevices().then(function(devices) {
                            devices.forEach(function(_device) {
                                var device = {};
                                for (var d in _device) {
                                    device[d] = _device[d];
                                }

                                if (device.kind === 'audioinput' && device.label.match(/마이크/)) {
                                    myself.mic_state = true;
                                }
                            });
                        }).catch(function (err) {
                            myself.mic_state = false;
                        });
                    }

                } catch (e) {

                    this.is_flash = true;

                    var flashvars = {};

                    // 플래시 담을 영역 생성
                    var _recorder= document.createElement("div");
                    _recorder.id = "_recorder";

                    document.querySelector("body").appendChild(_recorder);

                    // [주의]플래시파일은 실섭으로 리다이렉트 됨
                    flashvars.myFilename = myself.mp3_name;
                    flashvars.myServer = myself.upload_server;
                    flashvars.myHandler = myself.upload_handler;
                    flashvars.myDirectory = this.mp3_directory;
                    flashvars.timeLimit = "100";
                    flashvars.showLink = "Y";
                    flashvars.hideFlash = "true";
                    flashvars.bitRate = "128";
                    flashvars.licensekey = "63535ca7a0d4320da2f7dfbf0dddbf1f";

                    var parameters = {};
                    parameters.wmode = "transparent";
                    var attributes = {};
                    attributes.id = "_recorder";
                    attributes.name = "_recorder";

                    var embed_callback = function (e) {
                        if (e.success) {
                            var _flash = document.querySelector("#_recorder");

                            _flash.style.position = "fixed";
                            _flash.style.zIndex = "9999";
                            _flash.style.top = "0px";
                            _flash.style.left = "0px";
                            _flash.style.display = "";

                            myself.flash_obj = e.ref;
                        }
                    }

                    swfobject.embedSWF("/plugins/recorder/barebonesRecorder7.swf?ID=" + Math.random() * 100, "_recorder", "215", "138", "11.2", "expressInstall.swf", flashvars, parameters, attributes, embed_callback);
                }
            }

        },

        record: function (_callback) {
            var myself = this;

            myself.callback = _callback;

            if (this.recording_status === true) {
                return;
            }

            // Initializing
            try {

                // 미디어 접근 권환 요청
                navigator.mediaDevices.getUserMedia({audio: true})
                    .then(function (stream) {

                        // RecorderMP3 내에서 전역으로 strema 접근 가능하도록 함
                        myself.audio_stream = stream;

                        // MediaStreamSource 생성
                        var input = myself.audio_context.createMediaStreamSource(stream);

                        // Recorder 생성
                        myself.recorder = new Recorder(input);

                        // 녹음 시작
                        myself.recorder && myself.recorder.record();
                        myself.recording_status = true;

                        if (typeof(myself.callback) == "function") {
                            myself.callback(myself.getMessage(0));
                        }

                    }).catch(function (err) {

                    if (typeof(myself.callback) == "function") {
                        myself.callback(myself.getMessage(100));
                    }

                    console.log('No live audio input: ' + err);

                });

            } catch (e) {

                // Flash recorder 사용
                this.is_flash = true;

                if (!this.mic_state) {
                    if (typeof(myself.callback) == "function") {
                        myself.callback(myself.getMessage(100));
                    }

                    return;
                }

                // 녹음 시작 요청
                this.mp3_name = "_recorder_" + Date.now();
                this.thisMovie("_recorder").sendRecord();

                this.recording_status = true;

                if (typeof(this.callback) == "function") {
                    this.callback(this.getMessage(0));
                }
            }

        },

        stop: function (callback) {
            var self = this;
            self.callback = callback;

            if (this.recording_status === false) {
                return;
            }

            if (this.is_flash) {

                this.thisMovie("_recorder").sendStop();
                this.thisMovie("_recorder").setFilename(this.mp3_name);
                this.thisMovie("_recorder").sendSave();

                this.recording_status = false;

            } else {

                // 녹음 정지
                this.recorder && this.recorder.stop();

                // Audio Stream 정지
                this.audio_stream.getAudioTracks()[0].stop();

                // 녹음 데이터 변환(blob->mp3) 및 url 생성
                this.recorder && this.recorder.exportWAV(function (blob) {

                    self.url = URL.createObjectURL(blob);

                    if (typeof(self.callback) == "function") {
                        self.callback(self.url, blob);
                    }

                }, (this.audio_format || 'audio/wav'));

                this.recording_status = false;

            }

        },

        getUrl: function () {

            if (this.is_flash && this.saving_status == "success") {

                var origin = window.location.href.substring(0, window.location.href.indexOf('?'));

                origin = origin.replace(window.location.protocol + "//", '').replace('\#;', '').replace(window.location.pathname, '');

                var url = window.location.protocol + "//" + origin + this.mp3_directory + this.mp3_name + ".mp3";

                return url;
            } else {

                return false;
            }
        },

        thisMovie: function (movieName) {

            if (navigator.appName.indexOf("Microsoft") != -1) {

                return window[movieName];
            } else {

                return document[movieName];
            }
        },

        setMessageList: function () {
            var msg_list = new Array();

            msg_list[100] = "mic is not ready";

            this.message_list = msg_list;
        },

        getMessage: function (code) {
            var rs = {
                'result' : true,
                'code' : 0,
                'msg' : 'success'
            }

            if (code in this.message_list) {

                if (code > 0) {
                    rs.result = false;
                }

                rs.code = code;
                rs.msg = this.message_list[code];
            }

            return rs;

        }

    };

    window.RecorderMP3 = RecorderMP3;

}(window));

window.onload = function () {

}

// Barebones Recorder Message
// 플래시로부터 전달되는 상태 메세지
var recMessageArray = new Array();
recMessageArray[0] = "entering demo mode.";
recMessageArray[1] = "ready to go!";
recMessageArray[2] = "recording";
recMessageArray[3] = "stopped recording";
recMessageArray[4] = "stopped playing";
recMessageArray[5] = "ready!!";
recMessageArray[6] = "playing";
recMessageArray[7] = "starting to save";
recMessageArray[8] = "hmm. nothing to save";
recMessageArray[9] = "truncating the file to 10 seconds";
recMessageArray[10] = "encoding to MP3";
recMessageArray[11] = "...";
recMessageArray[12] = "encoding error";
recMessageArray[13] = "encode complete";
recMessageArray[14] = "uploading...";
recMessageArray[15] = "upload complete";
recMessageArray[16] = "record pause";
recMessageArray[17] = "play pause";
recMessageArray[18] = "mic not ready";
recMessageArray[19] = "mic ready";

// Recorder flash 호출 함수
function recorderMessage(x) {

    if (x == 7) {

        RecorderMP3.saving_status = "saving";
    } else if (x == 15) {

        RecorderMP3.saving_status = "success";

        if (typeof(RecorderMP3.callback) == "function") {

            RecorderMP3.callback(RecorderMP3.getUrl());
        }

    } else if (x == 8 || x == 12) {

        RecorderMP3.saving_status = "fail";
    }

    console.log("Recorder message: (" + x + ")" + recMessageArray[x]);
}

// 플래시 마이크 미터 함수
function recorderMeter(x) {

    if (x >= 0) {
        var _recorder = document.querySelector("#_recorder");

        _recorder.style.width = "1px";
        _recorder.style.height = "1px";

        RecorderMP3.mic_state = true;
    } else {

        RecorderMP3.mic_state = false;
    }
}