

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

        //shape and color aren't checked
        if (!selectedColor || !selectedShape) {
            $('.jsDialog--fail').addClass('dialog--show');
            setInterval(() => {
                $('.jsDialog--fail').removeClass('dialog--show');
            }, 1300);
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
                }, 1300);
            }
            else {
                $('.jsDialogAddCart--fail').addClass('dialog--show');
                $('.jsDialog--loader').removeClass('dialog--show');
                setInterval(() => {
                    $('.jsDialogAddCart--fail').removeClass('dialog--show');
                }, 1300);
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
        //check choosed shape and color
        if ((!selectedColor || !selectedShape)) {
            alert('Vui long chon hinh dang va mau sac');
            return;
        }
        const soLuong = $('#jsSoLuongInput').val();
        //push data to form
        $('form[name=jsBuyForm] input[name=color]').val(selectedColor);
        $('form[name=jsBuyForm] input[name=shape]').val(selectedShape);
        $('form[name=jsBuyForm] input[name=soLuong]').val(soLuong);
        //submit
        $('form[name=jsBuyForm]').submit();
    });


    /** Cart */
    //Thay doi gia trong buy group
    changeTotalCostAndProductNumber();
    //Add shape and color form input
    addShapeAndColorInput();
    //thay doi tong tien khi so luong thay doi
    $('.jsCartSoLuongInput').change(function () {
        const soLuong = $(this).val();
        const singleCost = $(this).attr('singleCost');
        const stringTongTien = (parseInt(singleCost) * soLuong).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $(this).parent().next().text(stringTongTien);

        //Change total cost in buy group
        changeTotalCostAndProductNumber();
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
        changeTotalCostAndProductNumber();
    });
    //Click to checkbox input
    $('.jsChoosedProduct').click(function () {
        //Change choose all checkbox input
        if ($('.jsChoosedProduct:not(:checked)').length > 0)
            $('#jsChooseAllProducts').prop('checked', false);
        if ($('.jsChoosedProduct:checked').length == $('.jsChoosedProduct').length)
            $('#jsChooseAllProducts').prop('checked', true);

        //Change total cost in buy group
        changeTotalCostAndProductNumber();
    });
    //show buy form
    $('#jsDialog button[type=submit]').click(function () {
        $('form[name="buy-form"]').submit();
    });
    //Hide buy form
    $('#jsComebackBtn').click(function () {
        $('.dialog').removeClass('dialog--show');
    })
    //Click to buy now button
    $('#jsBuyNowBtn').click(function () {
        //check choosed products
        if ($('.jsChoosedProduct:checked').length > 0) {
            $('#jsDialog').addClass('dialog--show');
            return;
        }
        $('.jsNotificeDialog--fail').addClass('dialog--show');
        setInterval(function () {
            $('.jsNotificeDialog--fail').removeClass('dialog--show');
        }, 1300);

    });
    //Click to delete cart btn
    $('.delete-cart-btn').click(function (e) {
        e.preventDefault();
        const formindex = $(this).attr('formindex');
        $(`form[formindex="${formindex}"]`).submit();
    });
    //Change checkbox input
    $('.jsChoosedProduct, #jsChooseAllProducts').change(function () {
        addShapeAndColorInput();
    });
});



//change total cost and product number in buy group
function changeTotalCostAndProductNumber() {
    var totalCost = 0;
    var productNumber = 0;
    $('.jsChoosedProduct:checked').each(function () {
        const soLuongInputEl = $(this).parents('tr').children('.jsSoLuong').children('input');
        const soLuong = parseInt(soLuongInputEl.val())
        const singleCost = parseInt(soLuongInputEl.attr('singleCost'));
        totalCost += soLuong * singleCost;
        productNumber += soLuong;
    });
    $('#jsBuyNowCost').text(totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ");
    $('#jsBuyGroupProductNumber').text(productNumber);
}
function addShapeAndColorInput() {
    //get element
    const checkedShapeEle = $('.jsChoosedProduct:checked').parents('tr').children('#jsCartShape');
    const checkedColorEle = $('.jsChoosedProduct:checked').parents('tr').children('#jsCartColor');
    //remove shape and color hidden input
    $('input.jsShapeColorHiddenInput').remove();
    //add shape and color hidden input
    const shape = checkedShapeEle.attr('jsShapeValue')
    checkedShapeEle.children('div').html(`<input class=jsShapeColorHiddenInput type=hidden name=shape[] value="${shape}" />`);

    const color = checkedColorEle.attr('jsColorValue')
    checkedColorEle.children('div').html(`<input class=jsShapeColorHiddenInput type=hidden name=color[] value="${color}" />`);
}