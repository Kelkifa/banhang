

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
        const productId = $(this).attr('productId');
        const selectedColor = $('.jsShowImageOrder[state=checked][jsName=color]').attr('jsValue');
        const selectedShape = $('.jsShowImageOrder[state=checked][jsName=shape]').attr('jsValue');
        const soLuong = $('#jsSoLuongInput').val();

        if (!selectedColor || !selectedShape) {
            alert('Vui long chon hinh dang va mau sac');
            return;
        }

        //dialog effect
        $('.jsDialog--loader').addClass('dialog--show');
        try {
            const jsonResponse = await fetch('/cart', {
                method: 'POST',
                body: JSON.stringify({ productId, soLuong, shape: selectedShape, color: selectedColor }),
                headers: { 'Content-Type': 'application/json' }
            })
            const response = await jsonResponse.json();
            console.log(response);
            //thay so luong san pham da them vo cart tren cart icon
            if (response.success === true) {
                $('#jsSelectedProducts').html(`<div>${response.selectedProducts}</div>`)
                //dialog effect
                $('.jsDialog--success').addClass('dialog--show');
                $('.jsDialog--loader').removeClass('dialog--show');

                setInterval(() => {
                    // $('.jsDialog--loader').removeClass('dialog--show');
                    $('.jsDialog--success').removeClass('dialog--show');
                }, 1700);
            }
            else {
                /****************************************/
                /** Them dialog Khong thanh cong o day **/
                /****************************************/
                $('.jsDialog--loader').removeClass('dialog--show');
            }
        } catch (err) {
            console.log(err);
            $('.jsDialog--success').removeClass('dialog--show');
            $('.jsDialog--loader').removeClass('dialog--show');
        }
    });
    // Press buy now
    $('#jsBuy').click(function (e) {
        //get data
        const selectedColor = $('.jsShowImageOrder[state=checked][jsName=color]').attr('jsValue');
        const selectedShape = $('.jsShowImageOrder[state=checked][jsName=shape]').attr('jsValue');
        const soLuong = $('#jsSoLuongInput').val();
        //push data to form
        $('form[name=jsBuyForm] input[name=color]').val(selectedColor);
        $('form[name=jsBuyForm] input[name=shape]').val(selectedShape);
        $('form[name=jsBuyForm] input[name=soLuong]').val(soLuong);
        //submit
        $('form[name=jsBuyForm]').submit();
    });

    /** Cart */
    //thay doi tong tien khi so luong thay doi
    $('.jsCartSoLuongInput').change(function () {
        const soLuong = $(this).val();
        const singleCost = $(this).attr('singleCost');
        const stringTongTien = (parseInt(singleCost) * soLuong).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $(this).parent().next().text(stringTongTien);

        //Change total cost in buy group
        ChangeTotalCost();
    });
    //submit form delete cart
    $('form[name=CartDelete]').children('a').click(function (e) {
        e.preventDefault();
        $(this).parent().submit();
    });
    //checkbox choose product
    $('#jsChooseAllProducts').click(function () {
        if ($(this).is(':checked')) {
            $('.jsChoosedProduct').prop('checked', true);
        }
        else {
            $('.jsChoosedProduct').prop('checked', false);
        }

        //Change tatal cost in buy group

        ChangeTotalCost();
    });
    //Click to checkbox input
    $('.jsChoosedProduct').click(function () {
        //Change choose all checkbox input
        if ($('.jsChoosedProduct:not(:checked)').length > 0)
            $('#jsChooseAllProducts').prop('checked', false);
        if ($('.jsChoosedProduct:checked').length == $('.jsChoosedProduct').length)
            $('#jsChooseAllProducts').prop('checked', true);

        //Change total cost in buy group
        ChangeTotalCost();
    });
    //show buy form
    $('#jsDialog .btn').click(function () {
        $(this).parent().submit();
    });
    //Hide buy form
    $('#jsComebackBtn').click(function () {
        $('.dialog').removeClass('dialog--show');
    })
    //Click to buy now button
    $('#jsBuyNowBtn').click(function () {
        $('.dialog').addClass('dialog--show');
    });
    //Click to delete cart btn
    $('.delete-cart-btn').click(function (e) {
        e.preventDefault();
        const formindex = $(this).attr('formindex');
        $(`form[formindex="${formindex}"]`).submit();
    });
});




function ChangeTotalCost() {
    var totalCost = 0;
    $('.jsChoosedProduct:checked').each(function () {
        const soLuongInputEl = $(this).parents('tr').children('.jsSoLuong').children('input');
        const soLuong = parseInt(soLuongInputEl.val())
        const singleCost = parseInt(soLuongInputEl.attr('singleCost'));
        totalCost += soLuong * singleCost;
    });
    $('#jsBuyNowCost').text(totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ");
}