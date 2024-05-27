
let cartDetails=[];

$(document).ready(function () {
    // generateNextOrderCode();
    loadAllCustIds();
    generateNextOrderId();
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
    var day = today.getDate().toString().padStart(2, '0'); // Adding leading zero if needed

    var formattedDate = year + '-' + month + '-' + day;


    $('#orderDate').val(formattedDate);
    $('#placeOrder').prop("disabled",true);
    $('#addToCart').prop("disabled",true);
    $("#addPoint").prop("disabled", true);
});


$('#addToCart').on('click', function () {
    $('#tblCart').empty();

    $("#addPoint").prop("disabled", false);
    addToCart();

});


function clearPlaceOrderTextFields() {
    $('#cash').val("");
    $('.Total').text("");
    $('#balance').text("");
    $('#subTotal').text("");
    $('#discount').text("");
    $('#disPrice').text("");

}

$('#placeOrder').on('click', function () {
    if (parseFloat($('#cash').val()) >= parseFloat($('.Total').text())) {
        placeOrderB();

        clearPlaceOrderTextFields();
        $('#tblCart').empty();
        cartDetails = [];
        // generateNextOrderId(function (nextOrderId) {
        //     $('#oId').val(nextOrderId);
        // });


    } else {

        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Insufficient Credit!!!",
            background: '#202936',
            showConfirmButton: true,
            timer: 3000,
            color:'white',

        });
    }

}
);

$('#pay').on('click', function () {

            placeOrderB();

            clearPlaceOrderTextFields();
            $('#tblCart').empty();
            cartDetails = [];
            // generateNextOrderId(function (nextOrderId) {
            //     $('#oId').val(nextOrderId);
            // });




    }
);
$('#resetOrder').on('click', function () {

    clearOrderFilds();
});
function isExists(itemCode,size) {
    for (const item of cartDetails) {

        if (item.itemCode === itemCode && item.size === size ) {

            return item;
        }
    }
    return null
}
let oQty;
function addToCart() {
    $('#tblCart').empty();
    if (($('#qty').val().length!=0) && (parseInt($('#qty').val())<=parseInt($('#quantity').val())) ){
        let code = $('#itemCode').val();
        let name = $('#itemName').val();
        let category = $('#category').val();
        let size = $('#sizes').val();
        let price =  parseFloat($('#price').text().match(/\d+(?:\.\d+)?/)[0]).toFixed(2);
         oQty = parseInt($('#qty').val())
        let total = (price * oQty).toFixed(2);
        let exists = isExists($('#itemCode').val(), size);


        if (exists != null) {
            exists.qty = exists.qty + oQty;
            total = (price * exists.qty).toFixed(2);
            exists.unitPrice = total;
        } else {
            var cartTm = Object.assign({}, cartTM);
            cartTm.itemCode = code;
            cartTm.itemName = name;
            cartTm.unitPrice = price;
            cartTm.qty = oQty;
            cartTm.unitPrice = total;
            cartTm.size = size;
            cartDetails.push(cartTm);
        }
        reduceQuanty();
        calculateTotal();
        loadAllItems();

        $('#itemCode').val(null);
        $('#sizes').val(null);
        $('#itemName').val("");
        $('#quantity').val("");
        $('#qty').val("");
        $('#category').val("");
        $('#itemPicture').empty();
        $('#price').text("");

    }else {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please Check Quantity!",
            background: '#202936',
            showConfirmButton: true,
            timer: 3000,
            color:'white',

        });
        loadAllItems();
    }

}
console.log(cartDetails)

function reduceQuanty() {
    for (const tm of cartDetails) {
        if (tm.itemCode===$('#itemCode').val() && tm.size===$('#sizes').val()){
            let newQty = $('#quantity').val()-oQty;
            $('#quantity').val(newQty);
        }
    }
}
function loadAllItems() {
    for (let i = 0; i < cartDetails.length; i++) {
        let row = `<tr>
                     <td>${cartDetails[i].itemCode}</td>
                     <td>${cartDetails[i].itemName}</td>
                      <td>${cartDetails[i].size}</td>
                       <td>${cartDetails[i].qty}</td>
                     <td>${cartDetails[i].unitPrice}</td>
                    <td><i onclick="deleteRow(this)" class="ti ti-trash fs-9"></i></td>
                    </tr>`;
        $('#tblCart').append(row);
    }
}
function deleteRow(button) {

    let row = $(button).closest('tr');

    let index = row.index();

    row.remove();

    cartDetails.splice(index, 1);
    console.log(cartDetails)
}

    $('#customerCode').on('change', function () {
        let custId = $("#customerCode").val();
        setCustomerDetails(custId);

    });

    let itemCode;
    $('#itemCode').on('change', function () {
        itemCode = $("#itemCode").val();
        setItemDetails(itemCode);
        enabledCartBtn();
        enabledOrDisabledBtn();

    });
    $('#sizes').on('change', function () {
        let sizes = $("#sizes").val();
        $.ajax({
            url: 'http://localhost:8080/api/v1/inventory/getQty/' + itemCode + '/' + sizes,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer '+token
            },
            success: function (response) {

                console.log(response.data)
                $('#quantity').val(response.data.quantity)

            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.error(jqXHR);
                console.log(textStatus)
            }
        });

    });

    function setItemDetails(itemCode) {
        $.ajax({
            url: 'http://localhost:8080/api/v1/inventory/getOneProduct/' + itemCode,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer '+token
            },
            success: function (response) {

                console.log(response.data)
                $('#sizes').empty();
                $('#itemName').val(response.data.itemDesc);
                $('#price').text("LKR " + response.data.unitPriceSale + "/==");
                $('#category').val(response.data.category);
                $('#sizes').append(` <option selected disabled>Choose</option>`);
                $('#itemPicture').empty();
                let profilePicHtml = `<div >
                                        <img class="ti-border-radius" src="${response.data.itemPicture}" width=100px alt="Profile Pic">
                                     </div>`;
                $('#itemPicture').append(profilePicHtml);
                $.each(response.data.shoeSizeDTOList, function (i, shoeSize) {

                    $('#sizes').append(`<option >${shoeSize.size}</option>`);
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.error(jqXHR);
                console.log(textStatus)
            }
        });
    }

    function setCustomerDetails(id) {
        $.ajax({
            url: 'http://localhost:8080/api/v1/customers/getOneCustomer/' + id,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer '+token
            },
            success: function (response) {

                console.log(response.data)
                $('#customerName').val(response.data.name);
                $('#level').text(response.data.level);
                $('#email1').val(response.data.email);
                $('#cono').val(response.data.contactNo);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.error(jqXHR);
                console.log(textStatus)
            }
        });
    }

    function loadAllCustIds() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/customers/gelAllCustomers',
            method: 'GET',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer '+token
            },
            success: function (response) {

                $.each(response.data, function (index, customer) {
                    $('#customerCode').append(`<option >${customer.id}</option>`);

                });
                loadAllItemCodes();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 401) {
                    window.location.replace('authentication-login.html');
                }
                console.error(jqXHR);
                console.log(textStatus)
            }
        });
    }

    function loadAllItemCodes() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/inventory/gelAllProducts',
            method: 'GET',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer '+token
            },
            success: function (response) {

                $.each(response.data, function (index, product) {
                    $('#itemCode').append(`<option >${product.itemCode}</option>`);

                });


            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 401) {
                    window.location.replace('authentication-login.html');
                }
                console.error(jqXHR);
                console.log(textStatus)
            }
        });
    }

function getItemDetails() {
        let orderId = $('#orderId').val()
    let rows = $("#tblCart").children().length;
    var array = [];
    for (let i = 0; i < rows; i++) {
        let itCode = $("#tblCart").children().eq(i).children(":eq(0)").text();
        let itDesc = $("#tblCart").children().eq(i).children(":eq(1)").text();
        let itSize = $("#tblCart").children().eq(i).children(":eq(2)").text();
        let itQty = $("#tblCart").children().eq(i).children(":eq(3)").text();
        let total = $("#tblCart").children().eq(i).children(":eq(4)").text();
        array.push({orderId: orderId, itemCode: itCode, itemName: itDesc, qty: itQty, unitPrice: total, size: itSize});
    }
    return array;
}
function placeOrderB() {

    let oId = $('#orderId').val();
    let date = $('#orderDate').val();
    let custCode = $('#customerCode').val();
    let custName = $('#customerName').val();
    let empCode = $('#employeeCode').val();
    let empName =  $('#employeeName').val();
    let totalPayment = $('.Total').text();
    let addPoint =  $('#addPoint').val();
    let payMethod = $('#payMethod').val();
    let  salesDetails = getItemDetails();

    let orderObj ={
        orderId:oId ,
        date : date,
        customerCode: custCode,
        customerName: custName,
        paymentMethod: payMethod,
        addedPoints : addPoint,
        employeeCode : "EMP-006",
        employeeName : "banuka",
        totalPayment: totalPayment,
        salesItemDTOList:salesDetails};

    $.ajax({
        url: 'http://localhost:8080/api/v1/placeOrder/orderPlace',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(orderObj),
        headers: {
            'Authorization': 'Bearer '+token
        },
        success: function (response) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "OrderPlaced successful!",
                background: '#202936',
                showConfirmButton: true,
                timer: 3000,
                color:'white',

            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "OrderPlaced Not successful!! Please check your input and try again.",
                background: '#202936',
                showConfirmButton: true,
                timer: 3000,
                color:'white',

            });
            console.log(jqXHR);
            console.log(textStatus)
        }
    });

}

function calculateTotal() {
    let Total =0;

    for (let i = 0; i <cartDetails.length; i++) {
        Total=Total+parseFloat(cartDetails[i].unitPrice)

    }
    $('.Total,.TotalC,#subTotal').text(Total.toFixed(2));


}

function generateNextOrderId() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/v1/placeOrder/genarateNextId',
        headers: {
            'Authorization': 'Bearer '+token
        },
        success: function (response) {
            console.log("generate" + response);
            let custId = response;
            if (custId != null && custId !== "") {
                let strings = custId.split("ORD-");


                let id = parseInt(strings[1]);

                ++id;
                let digit = id.toString().padStart(3, '0');
                $('#orderId').val("ORD-" + digit);

            } else {
                $('#orderId').val("ORD-001");

            }
        },
        error: function (error) {
            if (jqXHR.status === 401) {
                window.location.replace('authentication-login.html');
            }
            console.log(error);
            $('#orderId').val("ORD-001");
        }
    });

}

$('#qty').on("keydown keyup", function (e) {


    enabledOrDisabledBtn();
    enabledCartBtn();
});
$("#addPoint").keyup(function () {
    let points = $('#addPoint').val();

    if (points!==""){
        console.log(points)
        $('#discount').text(parseFloat(points)*2);
        console.log(parseFloat(points)*2);
        let subTotal = parseFloat($('#subTotal').text());
        console.log(subTotal)
        let discount = subTotal*parseFloat($('#discount').text())*0.01;
        $('#disPrice').text(discount)

        $('.Total,.TotalC,#cardTotal').text((subTotal-discount).toFixed(2));
    }else {
        $('#discount').text("");
        $('#disPrice').text("");
        $('.Total,.TotalC').text(parseFloat($('#subTotal').text()).toFixed(2));

    }




});

function calculateBalance() {
    if ($('#cash').val().length!=0 && ($('.TotalC').text().length!=0)){
        let subTotal = parseFloat($('.Total').text());
        let cash = parseFloat($('#cash').val());

        let balance = cash-subTotal;
        $('#balance').text(balance.toFixed(2));


    }else {

        $('#balance').val(0.00);
    }
}

$('#cash').on("keydown keyup", function (e) {

    calculateBalance();
    enabledOrDisabledBtn()
})
function enabledCartBtn() {
    if (($('#itemCode').val() !==null) && ($('#itemCode').val() !==null) && ($('#qty').val().length!=0)  ){
        $('#addToCart').prop("disabled",false);
    }else {
        $('#addToCart').prop("disabled",true);
    }
}
function enabledOrDisabledBtn() {
    if (   ($('#cash').val().length!==0) && cartDetails.length!==0 ){
        $('#placeOrder').prop("disabled",false);
    }else {
        $('#placeOrder').prop("disabled",true);
    }
}

function clearOrderFilds() {
    $('#customerCode').val(null);
    $('#customerName').val("");
    $('#level').text("");
    $('#email1').val("");
    $('#cono').val("");
    $('#itemCode').val(null);
    $('#sizes').val(null);
    $('#itemName').val("");
    $('#quantity').val("");
    $('#qty').val("");
    $('#category').val("");
    $('#itemPicture').empty();
    $('#price').text("");

}

$('#payMethod').on('click', function () {
    let method = $("#payMethod").val();
   if (method==="Card"){
       $('#exampleModalCard').modal('show');
   }else if (method==="Cash"){
       $('#exampleModalCash').modal('show');
   }

});

$('#cardNext').on('click', function () {
    let username = $('#emailaddress1').val();
    let password = $('#password1').val();
    console.log(username);
    console.log(password);

    //create ajax request
    $.ajax({
        url: 'http://localhost:8080/api/v1/auth/signin',
        method: 'POST',
        contentType: 'application/json',

        data: JSON.stringify({
            email: username,
            password: password
        }),
        success: function (data, textStatus, xhr) {
            console.log(data);
            console.log(data.userDTO.role)
            console.log(xhr.status);
            if (xhr.status === 200 && data.userDTO.role==="ADMIN") {
                //set token in env.js
                localStorage.setItem('token', data.token);

                $('#adminCredintial').hide();
                $('#cashPage').show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please check your input and try again.",
                text: jqXHR.responseJSON.message,
                background: '#202936',
                showConfirmButton: true,
                timer: 3000,
                color:'white',

            });
            console.error(jqXHR);
            console.log(textStatus)
        }

    });




});

