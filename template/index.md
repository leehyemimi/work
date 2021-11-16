## SCSS가이드

### [기본파일구조](https://github.com/leehyemimi/work/tree/master/template/assets/css)

```scss
css/
├── common/
│   ├── _reset.scss
│   ├── _mixin.scss
│   ├── _form.scss
│   ├── _btn.scss
│   ├── _board.scss
│   ├── _component.scss
│   ├── _popUp.scss
│   ├── _webfont.scss
│   └── webfont/
│    	├── notokr-regular.eot
│    	├── notokr-regular.ttf
│    	├── notokr-regular.woff
│    	└── notokr-regular.woff2
├── _variables.scss //변수 
├── _layout.scss //레이아웃
├── _lecture.scss //서브페이지중 하나
├── common.scss //공통
├── main.scss 
└── sub.scss


** 참고 **
-----------------------------------
공통(탬플릿)파일
------------------------------------
css/
├── common/
│   ├── _reset.scss
│   ├── _mixin.scss
│   ├── _form.scss
│   ├── _btn.scss
│   ├── _board.scss
│   ├── _component.scss
│   ├── _popUp.scss
│   └── _webfont.scss	
------------------------------------
사이트마다 변경되는 파일
------------------------------------
css/
├── _variables.scss //변수 
├── _layout.scss //레이아웃
├── _lecture.scss //서브페이지중 하나
├── common.scss //공통.scss 
├── main.scss 
└── sub.scss
```



#### common.scss

```css
@charset "UTF-8";
@import 'variables',
    'common/mixin',
    'common/webfont',
    'common/reset',
    'layout';

/* color */
.point-color{color:$ptc !important;}
```



#### sub.scss

```css
@charset "UTF-8";
@import 'variables',
    'common/mixin',
    'common/form',
    'common/btn',
    'common/ico',
    'common/board',
    'common/component',
    'common/popUp',
    'lecture';   // page
```



#### main.scss

```css
@charset "UTF-8";

@import 'variables',
    'common/mixin';
```

