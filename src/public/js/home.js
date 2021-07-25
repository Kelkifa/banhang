$(document).ready(function () {
    /** Home */
    //change heart icon
    $('.jsHomeHeartIcon').click(function () {
        $(this).toggleClass('fa-heart-o');
        $(this).toggleClass('fa-heart');
    })

    /** Home Detail */
    var imgShowElement = $('#jsDetailShowImg');
    // check the product style
    $(".jsShowImageOrder").click(function () {
        var liElement = $(this).parent().children('li');
        liElement.children('.CheckedIcon').hide();
        liElement.attr('state', 'false');
        liElement.removeClass('ChoosenOrderBorder');

        $(this).attr('state', 'checked');
        $(this).addClass('ChoosenOrderBorder');
        $(this).children('.CheckedIcon').show();
    });
    // switch Img left grid
    $('.detail__group__left__MultiImgContainer li').mouseover(function () {
        //img show
        var imgLink = $(this).children('img').attr('src');
        imgShowElement.attr('src', imgLink);
        //img border
        $(this).parent().children('li').removeClass('ImgBorder');
        $(this).addClass('ImgBorder');
    })
    // Switch Img right grid
    $('.jsShowImageOrder').mouseover(function () {
        imgShowElement.attr('src', $(this).attr('src'));
    })
    // press add to card
    $('#jsAddToCart').click(async function () {
        var productId = $(this).attr('productId');
        var selectedColor = $('.jsShowImageOrder[state=checked][jsName=color]').attr('jsValue');
        var selectedShape = $('.jsShowImageOrder[state=checked][jsName=shape]').attr('jsValue');
        var soLuong = $('#jsSoLuongInput').val();
        if (!selectedColor || !selectedShape) {
            alert('Vui long chon hinh dang va mau sac');
            return;
        }
        try {
            const jsonResponse = await fetch('/cart', {
                method: 'POST',
                body: JSON.stringify({ productId, soLuong, shape: selectedShape, color: selectedColor }),
                headers: { 'Content-Type': 'application/json' }
            })
            const response = await jsonResponse.json();
            //thay so luong san pham da them vo cart tren cart icon
            if (response.success === true) {
                $('#jsSelectedProducts').html(`<div>${response.selectedProducts}</div>`)
            }
        } catch (err) {
            console.log(err);
        }
    })
})