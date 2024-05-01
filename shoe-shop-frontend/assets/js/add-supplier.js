

$(document).ready(function () {
    $("#updateSupplier").prop("disabled", true);
    $("#deleteSupplier").prop("disabled", true);
    getAllSuppliers();
    generateNextSupId();


});



$('#saveSupplier').click(function () {
    $('label[id$="Error"]').hide();
    let id = $('#supplierCode').val();
    let name = $('#supplierName').val();
    let category = $('#category').val();

    let address01 = $('#addressLine01').val();
    let address02 = $('#addressLine02').val();
    let address03 = $('#addressLine03').val();
    let address04 = $('#addressLine04').val();
    let address05 = $('#addressLine05').val();
    let address06 = $('#addressLine06').val();
    let email = $('#email1').val();
    let mobile = $('#conoMobile').val();
    let landLine = $('#conoLan').val();
    if (!id || !name || !category  || !address03 || !address04 || !address05 || !address06 || !email || !mobile) {
        alert("Please fill in all required fields.");
        return;
    }
    let isValid = true;
    // if (!validateId(id)) {
    //     $('#customerCodeError').show();
    //     isValid = false;
    // }
    if (!validateName(name)) {
        $('#supplierNameError').show();
        isValid = false;
    }

    if (!validateEmail(email)) {
        $('#emailError').show();
        isValid = false;
    }
    if (!validateContactNo(mobile)) {
        $('#contactNoMoError').show();
        isValid = false;
    }
    if (!validateContactNo(landLine)) {
        $('#contactNoLaError').show();
        isValid = false;
    }
    if (!isValid) {
        return;
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/suppliers/save',
        method: 'POST',
        contentType: 'application/json',

        data: JSON.stringify({
            "id": id,
            "name": name,
            "category" : category,
            "addressLine01": address01,
            "addressLine02": address02,
            "addressLine03": address03,
            "addressLine04": address04,
            "addressLine05": address05,
            "addressLine06": address06,
            "contactNo1": mobile,
            "contactNo2": landLine,
            "email": email,

        }),
        success: function (response) {

            alert("Supplier Save successful!");
            getAllSuppliers();
            clearSupTextFiels();
            generateNextSupId();


        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.message);
            // $.each(jqXHR.responseJSON.data, function (index, customer) {
            //     alert(`${customer.message}`)
            // })
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
});
$('#updateSupplier').click(function () {
    $('label[id$="Error"]').hide();
    let id = $('#supplierCode').val();
    let name = $('#supplierName').val();
    let category = $('#category').val();

    let address01 = $('#addressLine01').val();
    let address02 = $('#addressLine02').val();
    let address03 = $('#addressLine03').val();
    let address04 = $('#addressLine04').val();
    let address05 = $('#addressLine05').val();
    let address06 = $('#addressLine06').val();
    let email = $('#email1').val();
    let mobile = $('#conoMobile').val();
    let landLine = $('#conoLan').val();
    if (!id || !name || !category  || !address03 || !address04 || !address05 || !address06 || !email || !mobile) {
        alert("Please fill in all required fields.");
        return;
    }
    let isValid = true;
    // if (!validateId(id)) {
    //     $('#customerCodeError').show();
    //     isValid = false;
    // }
    if (!validateName(name)) {
        $('#supplierNameError').show();
        isValid = false;
    }

    if (!validateEmail(email)) {
        $('#emailError').show();
        isValid = false;
    }
    if (!validateContactNo(mobile)) {
        $('#contactNoMoError').show();
        isValid = false;
    }
    if (!validateContactNo(landLine)) {
        $('#contactNoLaError').show();
        isValid = false;
    }
    if (!isValid) {
        return;
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/suppliers/update',
        method: 'PATCH',
        contentType: 'application/json',

        data: JSON.stringify({
            "id": id,
            "name": name,
            "category" : category,
            "addressLine01": address01,
            "addressLine02": address02,
            "addressLine03": address03,
            "addressLine04": address04,
            "addressLine05": address05,
            "addressLine06": address06,
            "contactNo1": mobile,
            "contactNo2": landLine,
            "email": email,

        }),
        success: function (response) {

            alert("Supplier Update successful!");
            getAllSuppliers();
            clearSupTextFiels();
            generateNextSupId();


        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.message);
            // $.each(jqXHR.responseJSON.data, function (index, customer) {
            //     alert(`${customer.message}`)
            // })
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
});

$('#deleteSupplier').click(function () {
    let id = $('#supplierCode').val();
    $.ajax({
        url: 'http://localhost:8080/api/v1/suppliers/delete/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {

            alert("Customer Delete successful!");
            getAllSuppliers();
            clearSupTextFiels();
            generateNextSupId();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.message)
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
});
let con2;
function getAllSuppliers() {
    $("#updateSupplier").prop("disabled", true);
    $("#deleteSupplier").prop("disabled", true);
    $("#tblSupplier").empty()
    $.ajax({
        url: 'http://localhost:8080/api/v1/suppliers/gelAllSuppliers',
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {

            $.each(response.data, function (index, supplier) {
                if (supplier.contactNo2 == "") {
                    con2 = "No Landline Number";
                } else {
                    con2 = supplier.contactNo2;
                }
                let row = `<tr>
                     <td>${supplier.id}</td>
                     <td>${supplier.name}</td>
                     <td>${supplier.category}</td>
                     <td class="tbl-address"></td> 
                     <td>${supplier.contactNo1}</td>
                     <td>${con2}</td>
                     <td>${supplier.email}</td></tr>`;
                $('#tblSupplier').append(row);
                if(supplier.addressLine01 !== ""){
                    let line1 = `<span id="span_add_1">${supplier.addressLine01}</span>,<br> `;
                    $(".tbl-address:last").append(line1);
                }
                if(supplier.addressLine02 !== ""){
                    let line2 = `<span id="span_add_2">${supplier.addressLine02}</span>,<br> `;
                    $(".tbl-address:last").append(line2);
                }

                let line3 = `<span id="span_add_3">${supplier.addressLine03}</span>,<br> `;
                let line4 = `<span id="span_add_4">${supplier.addressLine04}</span>,<br> `;
                let line5 = `<span id="span_add_5">${supplier.addressLine05}</span>,<br>`;
                let line6 = `<span id="span_add_6">${supplier.addressLine06}</span>`;
                $(".tbl-address:last").append(line3);
                $(".tbl-address:last").append(line4);
                $(".tbl-address:last").append(line5);
                $(".tbl-address:last").append(line6);
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });
}
$('#tblSupplier').on('click', 'tr', function () {

    $("#updateSupplier").prop("disabled", false);
    $("#deleteSupplier").prop("disabled", false);


    let id = $(this).find('td:first').text();
    let name = $(this).find('td:nth-child(2)').text();
    let category = $(this).find('td:nth-child(3)').text();
    let add01 = $(this).find('#span_add_1').text();
    let add02 = $(this).find('#span_add_2').text();
    let add03 = $(this).find('#span_add_3').text();
    let add04 = $(this).find('#span_add_4').text();
    let add05 = $(this).find('#span_add_5').text();
    let add06= $(this).find('#span_add_6').text();
    let contact01 = $(this).find('td:nth-child(5)').text();
    let contact02 = $(this).find('td:nth-child(6)').text();
    let email = $(this).find('td:nth-child(7)').text();


    $('#supplierCode').val(id);
    $('#supplierName').val(name);
    $('#category').val(category);
    if (contact02 == "No Landline Number") {
        $('#conoLan').val("");
    } else {
        $('#conoLan').val(contact02);
    }

    $('#addressLine01').val(add01);
    $('#addressLine02').val(add02);
    $('#addressLine03').val(add03);
    $('#addressLine04').val(add04);
    $('#addressLine05').val(add05);
    $('#addressLine06').val(add06);
    $('#conoMobile').val(contact01);
    $('#email1').val(email);


});

function generateNextSupId() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/v1/suppliers/genarateNextId',
        success: function (response) {
            console.log("generate" + response);
            let supId = response;
            if (supId != null && supId !== "") {
                let strings = supId.split("SUP-");
                console.log(supId);

                let id = parseInt(strings[1]);
                console.log(id);
                ++id;
                let digit = id.toString().padStart(3, '0');
                $('#supplierCode').val("SUP-" + digit);

            } else {
                $('#supplierCode').val("SUP-001");

            }
        },
        error: function (error) {
            console.log(error);
            $('#customerCode').val("SUP-001");
        }
    });

}

$("#searchSupplier").keyup(function () {

    searchSupplierByName();
});
function searchSupplierByName() {
    $("#tblSupplier").empty();
    let name = $("#searchSupplier").val();
    if ($("#searchSupplier").val() === "") {
        getAllSuppliers();
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/suppliers/searchByName/'+name,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response.data.length === 0) {
                $('#tblSupplier').append('<tr><td colspan="16"  style="text-align: left; font-size: 16px;">No results found.</td></tr>');
            }
            $.each(response.data, function (index, supplier) {
                if (supplier.contactNo2 == "") {
                    con2 = "No Landline Number";
                } else {
                    con2 = supplier.contactNo2;
                }
                let row = `<tr>
                     <td>${supplier.id}</td>
                     <td>${supplier.name}</td>
                     <td>${supplier.category}</td>
                     <td class="tbl-address"></td> 
                     <td>${supplier.contactNo1}</td>
                     <td>${con2}</td>
                     <td>${supplier.email}</td></tr>`;
                $('#tblSupplier').append(row);
                if(supplier.addressLine01 !== ""){
                    let line1 = `<span id="span_add_1">${supplier.addressLine01}</span>,<br> `;
                    $(".tbl-address:last").append(line1);
                }
                if(supplier.addressLine02 !== ""){
                    let line2 = `<span id="span_add_2">${supplier.addressLine02}</span>,<br> `;
                    $(".tbl-address:last").append(line2);
                }

                let line3 = `<span id="span_add_3">${supplier.addressLine03}</span>,<br> `;
                let line4 = `<span id="span_add_4">${supplier.addressLine04}</span>,<br> `;
                let line5 = `<span id="span_add_5">${supplier.addressLine05}</span>,<br>`;
                let line6 = `<span id="span_add_6">${supplier.addressLine06}</span>`;
                $(".tbl-address:last").append(line3);
                $(".tbl-address:last").append(line4);
                $(".tbl-address:last").append(line5);
                $(".tbl-address:last").append(line6);
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });

}


function clearSupTextFiels() {
    $('#supplierName').val("");
    var category = $('#category');
    category.selectedIndex =0;


    $('#addressLine01').val("");
    $('#addressLine02').val("");
    $('#addressLine03').val("");
    $('#addressLine04').val("");
    $('#addressLine05').val("");
    $('#addressLine06').val("");
    $('#email1').val("");
    $('#conoMobile').val("");
    $('#conoLan').val("");
}