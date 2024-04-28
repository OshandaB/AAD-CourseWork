$(document).ready(function () {
    getAllCustomers();
    generateNextOrderId();
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
    var day = today.getDate().toString().padStart(2, '0'); // Adding leading zero if needed

    var formattedDate = year + '-' + month + '-' + day;
    console.log(formattedDate);

    $('#joinDate').val(formattedDate);
});

// var storedData = sessionStorage.getItem('rowData');
// if (storedData) {
//     var rowData = JSON.parse(storedData);
//      console.log(rowData);
//     for (const rowDatum of rowData) {
//         console.log(rowDatum)
//     }
// }

$('#saveCustomer').click(function () {
    $('label[id$="Error"]').hide();
    let id = $('#customerCode').val();
    let name = $('#customerName').val();
    let gender = $('#gender').val();
    let joinDate = $('#joinDate').val();
    let level = $('#level').val();
    let dob = $('#dob').val();
    let address01 = $('#addressLine01').val();
    let address02 = $('#addressLine02').val();
    let address03 = $('#addressLine03').val();
    let address04 = $('#addressLine04').val();
    let address05 = $('#addressLine05').val();
    let email = $('#email1').val();
    let contact = $('#cono').val();
    let totalPoints = $('#totalPoints').val();
    if (!id || !name || !gender || !joinDate || !level || !dob || !address03 || !address04 || !address05 || !email || !contact) {
        alert("Please fill in all required fields.");
        return;
    }
    let isValid = true;
    if (!validateId(id)) {
        $('#customerCodeError').show();
        isValid = false;
    }
    if (!validateName(name)) {
        $('#customerNameError').show();
        isValid = false;
    }
    if (new Date(joinDate) > new Date()) {
        $('#joinDateError').show();
        isValid = false;
    }
    if (new Date(dob) > new Date()) {
        $('#dobError').show();
        isValid = false;
    }
    if (!validateEmail(email)) {
        $('#emailError').show();
        isValid = false;
    }
    if (!validateContactNo(contact)) {
        $('#contactNoError').show();
        isValid = false;
    }
    if (!isValid) {
        return;
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/customers/save',
        method: 'POST',
        contentType: 'application/json',

        data: JSON.stringify({
            "id": id,
            "name": name,
            "gender": gender,
            "joinDate": joinDate,
            "level": level,
            "dob": dob,
            "addressLine01": address01,
            "addressLine02": address02,
            "addressLine03": address03,
            "addressLine04": address04,
            "addressLine05": address05,
            "contactNo": contact,
            "email": email,
            "totalPoints": totalPoints,

        }),
        success: function (response) {

            alert("Customer Save successful!");


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

$('#updateCustomer').click(function () {
    let id = $('#customerCode').val();
    let name = $('#customerName').val();
    let gender = $('#gender').val();
    let joinDate = $('#joinDate').val();
    let level = $('#level').val();
    let dob = $('#dob').val();
    let address01 = $('#addressLine01').val();
    let address02 = $('#addressLine02').val();
    let address03 = $('#addressLine03').val();
    let address04 = $('#addressLine04').val();
    let address05 = $('#addressLine05').val();
    let email = $('#email1').val();
    let contact = $('#cono').val();
    let totalPoints = $('#totalPoints').val();
    let repurDate = $('#repurchaseDate').val();

    if (!id || !name || !gender || !joinDate || !level || !dob || !address03 || !address04 || !address05 || !email || !contact) {
        alert("Please fill in all required fields.");
        return;
    }
    let isValid = true;
    if (!validateId(id)) {
        $('#customerCodeError').show();
        isValid = false;
    }
    if (!validateName(name)) {
        $('#customerNameError').show();
        isValid = false;
    }
    if (new Date(joinDate) > new Date()) {
        $('#joinDateError').show();
        isValid = false;
    }
    if (new Date(dob) > new Date()) {
        $('#dobError').show();
        isValid = false;
    }
    if (!validateEmail(email)) {
        $('#emailError').show();
        isValid = false;
    }
    if (!validateContactNo(contact)) {
        $('#contactNoError').show();
        isValid = false;
    }
    if (!isValid) {
        return;
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/customers/update',
        method: 'PATCH',
        contentType: 'application/json',

        data: JSON.stringify({
            "id": id,
            "name": name,
            "gender": gender,
            "joinDate": joinDate,
            "level": level,
            "dob": dob,
            "addressLine01": address01,
            "addressLine02": address02,
            "addressLine03": address03,
            "addressLine04": address04,
            "addressLine05": address05,
            "contactNo": contact,
            "email": email,
            "totalPoints": totalPoints,
            "recentPurchaseDate": repurDate

        }),
        success: function (response) {

            alert("Customer Update successful!");
            getAllCustomers();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Customer Update failed! Please check your input and try again.");
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
});


$('#deleteCustomer').click(function () {
    let id = $('#customerCode').val();
    $.ajax({
        url: 'http://localhost:8080/api/v1/customers/delete/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {

            alert("Customer Update successful!");
            getAllCustomers();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.message)
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
});
let repurseDate

function getAllCustomers() {
    $("#tblCustomer").empty()
    $.ajax({
        url: 'http://localhost:8080/api/v1/customers/gelAllCustomers',
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {

            $.each(response.data, function (index, customer) {
                if (customer.recentPurchaseDate == null) {
                    repurseDate = "Not Purchase Yet";
                } else {
                    repurseDate = customer.recentPurchaseDate;
                }
                let row = `<tr>
                     <td>${customer.id}</td>
                     <td>${customer.name}</td>
                     <td>${customer.gender}</td>
                     <td>${customer.joinDate}</td>
                     <td>${customer.level}</td>
                     <td>${customer.dob}</td>
                     <td>${customer.totalPoints}</td>
                     <td>${repurseDate}</td>
                     <td class="tbl-address"></td> 
                     <td>${customer.contactNo}</td>
                     <td>${customer.email}</td></tr>`;
                      $('#tblCustomer').append(row);
                if(customer.addressLine01 !== ""){
                    let line1 = `<span id="span_add_1">${customer.addressLine01}</span>,<br> `;
                    $(".tbl-address:last").append(line1);
                }
                if(customer.addressLine02 !== ""){
                    let line2 = `<span id="span_add_2">${customer.addressLine02}</span>,<br> `;
                    $(".tbl-address:last").append(line2);
                }

                let line3 = `<span id="span_add_3">${customer.addressLine03}</span>,<br> `;
                let line4 = `<span id="span_add_4">${customer.addressLine04}</span>,<br> `;
                let line5 = `<span id="span_add_5">${customer.addressLine05}</span>`;
                $(".tbl-address:last").append(line3);
                $(".tbl-address:last").append(line4);
                $(".tbl-address:last").append(line5);
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });
}

$('#tblCustomer').on('click', 'tr', function () {


    let id = $(this).find('td:first').text();
    let name = $(this).find('td:nth-child(2)').text();
    let gender = $(this).find('td:nth-child(3)').text();
    let joinDate = $(this).find('td:nth-child(4)').text();
    let level = $(this).find('td:nth-child(5)').text();
    let dob = $(this).find('td:nth-child(6)').text();
    let totalPoints = $(this).find('td:nth-child(7)').text();
    let repurDate = $(this).find('td:nth-child(8)').text();
    let add01 = $(this).find('#span_add_1').text();
    let add02 = $(this).find('#span_add_2').text();
    let add03 = $(this).find('#span_add_3').text();
    let add04 = $(this).find('#span_add_4').text();
    let add05 = $(this).find('#span_add_5').text();
    let contact = $(this).find('td:nth-child(14)').text();
    let email = $(this).find('td:nth-child(15)').text();


    $('#customerCode').val(id);
    $('#customerName').val(name);
    $('#gender').val(gender);
    $('#joinDate').val(joinDate);
    $('#level').val(level);
    $('#dob').val(dob);
    $('#totalPoints').val(totalPoints);
    if (repurDate === "Not Purchase Yet") {
        $('#repurchaseDate').val("null");
    } else {
        $('#repurchaseDate').val(repurDate);
    }

    $('#addressLine01').val(add01);
    $('#addressLine02').val(add02);
    $('#addressLine03').val(add03);
    $('#addressLine04').val(add04);
    $('#addressLine05').val(add05);
    $('#cono').val(contact);
    $('#email1').val(email);


});

function generateNextOrderId() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/v1/customers/genarateNextId',
        success: function (response) {
            console.log("generate" + response);
            let custId = response;
            if (custId != null && custId !== "") {
                let strings = custId.split("CUS-");
                console.log(custId);

                let id = parseInt(strings[1]);
                console.log(id);
                ++id;
                let digit = id.toString().padStart(3, '0');
                $('#customerCode').val("CUS-" + digit);

            } else {
                $('#customerCode').val("CUS-001");

            }
        },
        error: function (error) {
            console.log(error);
            $('#customerCode').val("CUS-001");
        }
    });

}
$("#searchCustomer").keyup(function () {

    searchCustomerByName();
});
function searchCustomerByName() {
    $("#tblCustomer").empty();
    let name = $("#searchCustomer").val();
    if ($("#searchCustomer").val() === "") {
        getAllCustomers();
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/customers/searchByName/'+name,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response.data.length === 0) {
                $('#tblCustomer').append('<tr><td colspan="16"  style="text-align: left; font-size: 16px;">No results found.</td></tr>');
            }
            $.each(response.data, function (index, customer) {
                if (customer.recentPurchaseDate == null) {
                    repurseDate = "Not Purchase Yet";
                } else {
                    repurseDate = customer.recentPurchaseDate;
                }
                let row = `<tr>
                     <td>${customer.id}</td>
                     <td>${customer.name}</td>
                     <td>${customer.gender}</td>
                     <td>${customer.joinDate}</td>
                     <td>${customer.level}</td>
                     <td>${customer.dob}</td>
                     <td>${customer.totalPoints}</td>
                     <td>${repurseDate}</td>
                     <td class="tbl-address"></td>
                     <td>${customer.contactNo}</td>
                     <td>${customer.email}</td></tr>`;
                $('#tblCustomer').append(row);
                if(customer.addressLine01 !== ""){
                    let line1 = `<span id="span_add_1">${customer.addressLine01}</span>,<br> `;
                    $(".tbl-address:last").append(line1);
                }
                if(customer.addressLine02 !== ""){
                    let line2 = `<span id="span_add_2">${customer.addressLine02}</span>,<br> `;
                    $(".tbl-address:last").append(line2);
                }

                let line3 = `<span id="span_add_3">${customer.addressLine03}</span>,<br> `;
                let line4 = `<span id="span_add_4">${customer.addressLine04}</span> `;
                let line5 = `<span id="span_add_5">${customer.addressLine05}</span>`;
                $(".tbl-address:last").append(line3);
                $(".tbl-address:last").append(line4);
                $(".tbl-address:last").append(line5);
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });

}