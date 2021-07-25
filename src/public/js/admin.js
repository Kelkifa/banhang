$(document).ready(function () {

    /** Admin Leftbar */
    // Dropdown handler
    // toggle the hide dropdown and change icon
    $('.admin__item__dropdown__show').click(function () {
        // toggle the hide dropdown
        $(this).next().toggle();
        // change the dropdown icon
        $(this).children('.DropdownIcon').toggleClass('DropdownIcon--rotate');
    })
    //leftbar hide show
    $('#jsLeftbarBtn').click(function () {
        // $('.AdminLeftbar').toggleClass('jsAdminLeftbarHide');
        // $(this).toggleClass('color--red');
        // $('#jsAdminContainerBody').toggleClass('AdminContainer__body__MaxWidth');
        $(this).parent().toggleClass('AdminLeftbar--hide');
        $('#jsAdminContainerBody').toggleClass('AdminContainer__body--fullwidth');
    })
    //

    /** Admin Product*/
    //Product create update
    $('.jsImageInput').keyup(function () { //change pre show image
        var srcArr = $(this).val().split('\n');
        var preShowImageElement = $($(this).attr('preShow'));
        preShowImageElement.html('');
        srcArr.forEach(function (src, index) {
            preShowImageElement.append(`<li><img src="${src}" alt="faild"></li>`);
        });
    });
    var urlParams = new URLSearchParams(window.location.search);
    var finishFlag = urlParams.get('finish');
    var productName = urlParams.get('product');
    if (finishFlag == 'created') {
        $('#jsAdminProductCreateNotifi').text(`Tạo sản phẩm ${productName} thành công`);
    }
    if (finishFlag == 'updated') {
        $('#jsAdminProductCreateNotifi').text(`Cập nhật sản phẩm "${productName}" thành công`);
    }
    //table
    $('#jsDeleteProductBtn, #jsRestoreProductBtn').click(function (e) {
        e.preventDefault();
        // console.log($(this));
        $(this).parent().submit();
    })

})