$(document).ready(function () {
    $('.button_modal li button').on('click',function () {
        var valCategory = $('.choose_category span').empty();
        var choose_val = $(this).text();
        $(valCategory).append(choose_val)
        $('#sort').modal('toggle')
    })
    $('.nav-tabs li').on('click', function () {
        $('.nav-tabs li').removeClass('active')
        $(this).addClass('active')

    })
})
