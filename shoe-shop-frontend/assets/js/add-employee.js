
$(document).ready(function () {
    $("#updateEmployee").prop("disabled", true);
    $("#deleteEmployee").prop("disabled", true);
    getAllEmployees();
    generateNextEmpId();
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
    var day = today.getDate().toString().padStart(2, '0'); // Adding leading zero if needed

    var formattedDate = year + '-' + month + '-' + day;
    console.log(formattedDate);

    $('#joinDate').val(formattedDate);
});

$('#saveEmployee').click(function () {
    $('label[id$="Error"]').hide();
    // Personal Info
    var employeeCodeValue = $('#employeeCode').val();
    var employeeNameValue = $('#employeeName').val();
    var profilePicFile = $('#customFile').prop('files')[0]; // For file input, use prop('files')[0]
    var genderValue = $('#gender').val();
    var statusValue = $('#status').val();
    var joinDateValue = $('#joinDate').val();
    var designationValue = $('#designation').val();
    var accessRoleValue = $('#accessRole').val();
    var dobValue = $('#dob').val();
    var attachedBranchValue = $('#attachedBranch').val();

    // Address Info
    var addressLine01Value = $('#addressLine01').val();
    var addressLine02Value = $('#addressLine02').val();
    var addressLine03Value = $('#addressLine03').val();
    var addressLine04Value = $('#addressLine04').val();
    var addressLine05Value = $('#addressLine05').val();

    // Contact Info & Bio
    var emailValue = $('#email1').val();
    var contactValue = $('#cono').val();
    var guardianContactValue = $('#emergencyContact').val();
    var guardianNameValue = $('#emergencyContactP').val();

    var formData = new FormData();
    formData.append('employeeCode', employeeCodeValue);
    formData.append('profilePic', profilePicFile); // Assuming profilePic is a file input field
    formData.append('employeeName', employeeNameValue);
    formData.append('email1', emailValue);
    formData.append('contact', contactValue);
    formData.append('gender', genderValue);
    formData.append('designation', designationValue);
    formData.append('accessRole', accessRoleValue);
    formData.append('status', statusValue);
    formData.append('attachedBranch', attachedBranchValue);
    formData.append('guardianName', guardianNameValue);
    formData.append('guardianContact', guardianContactValue);
    formData.append('addressLine01', addressLine01Value);
    formData.append('addressLine02', addressLine02Value);
    formData.append('addressLine03', addressLine03Value);
    formData.append('addressLine04', addressLine04Value);
    formData.append('addressLine05', addressLine05Value);
    formData.append('dob', dobValue);
    formData.append('joinDate', joinDateValue);
    if (!employeeCodeValue || !employeeNameValue || !profilePicFile || !genderValue || !statusValue || !joinDateValue || !designationValue || !accessRoleValue || !dobValue || !attachedBranchValue || !addressLine03Value || !addressLine04Value || !addressLine05Value || !emailValue || !contactValue || !guardianContactValue || !guardianNameValue ) {
        alert("Please fill in all required fields.");
        return;
    }
    let isValid = true;

    if (!validateName(employeeNameValue)) {
        $('#employeeName').show();
        isValid = false;
    }
    if (new Date(joinDateValue) > new Date()) {
        $('#joinDateError').show();
        isValid = false;
    }
    if (new Date(dobValue) > new Date()) {
        $('#dobError').show();
        isValid = false;
    }
    if (!validateEmail(emailValue)) {
        $('#emailError').show();
        isValid = false;
    }
    if (!validateContactNo(contactValue)) {
        $('#contactNoError').show();
        isValid = false;
    }
    if (!validateContactNo(guardianContactValue)) {
        $('#emergencyContact').show();
        isValid = false;
    }
    /*   if (!validateAddress(addressLine01Value)) {
           $('.address').show();
           isValid = false;
       }
       if (!validateAddress(addressLine02Value)) {
           $('.address').show();
           isValid = false;
       }
       if (!validateAddress(addressLine03Value)) {
           $('.address').show();
           isValid = false;
       }
       if (!validateAddress(addressLine04Value)) {
           $('.address').show();
           isValid = false;
       }
       if (!validatePostalCode(addressLine05Value)) {
           $('#postalCode').show();
           isValid = false;
       }*/
    if (!isValid) {
        return;
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/employees/save',
        method: 'POST',
        processData: false,
        contentType:false,
        data: formData,
        success: function (response) {
            alert("Employee saved successfully!");
            getAllEmployees();
            clearEmpTextFiels();
            generateNextEmpId();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                alert(jqXHR.responseJSON.message);
            } else {
                alert("Error occurred while saving employee.");
            }
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
});

$('#updateEmployee').click(function () {
    $('label[id$="Error"]').hide();
    // Personal Info
    var employeeCodeValue = $('#employeeCode').val();
    var employeeNameValue = $('#employeeName').val();
    var profilePicFile = $('#customFile').prop('files')[0]; // For file input, use prop('files')[0]
    var genderValue = $('#gender').val();
    var statusValue = $('#status').val();
    var joinDateValue = $('#joinDate').val();
    var designationValue = $('#designation').val();
    var accessRoleValue = $('#accessRole').val();
    var dobValue = $('#dob').val();
    var attachedBranchValue = $('#attachedBranch').val();

    // Address Info
    var addressLine01Value = $('#addressLine01').val();
    var addressLine02Value = $('#addressLine02').val();
    var addressLine03Value = $('#addressLine03').val();
    var addressLine04Value = $('#addressLine04').val();
    var addressLine05Value = $('#addressLine05').val();

    // Contact Info & Bio
    var emailValue = $('#email1').val();
    var contactValue = $('#cono').val();
    var guardianContactValue = $('#emergencyContact').val();
    var guardianNameValue = $('#emergencyContactP').val();

    var formData = new FormData();
    formData.append('employeeCode', employeeCodeValue);
    formData.append('profilePic', profilePicFile); // Assuming profilePic is a file input field
    formData.append('employeeName', employeeNameValue);
    formData.append('email1', emailValue);
    formData.append('contact', contactValue);
    formData.append('gender', genderValue);
    formData.append('designation', designationValue);
    formData.append('accessRole', accessRoleValue);
    formData.append('status', statusValue);
    formData.append('attachedBranch', attachedBranchValue);
    formData.append('guardianName', guardianNameValue);
    formData.append('guardianContact', guardianContactValue);
    formData.append('addressLine01', addressLine01Value);
    formData.append('addressLine02', addressLine02Value);
    formData.append('addressLine03', addressLine03Value);
    formData.append('addressLine04', addressLine04Value);
    formData.append('addressLine05', addressLine05Value);
    formData.append('dob', dobValue);
    formData.append('joinDate', joinDateValue);

    if (!employeeCodeValue || !employeeNameValue || !profilePicFile || !genderValue || !statusValue || !joinDateValue || !designationValue || !accessRoleValue || !dobValue || !attachedBranchValue || !addressLine03Value || !addressLine04Value || !addressLine05Value || !emailValue || !contactValue || !guardianContactValue || !guardianNameValue ) {
        alert("Please fill in all required fields.");
        return;
    }
    let isValid = true;

    if (!validateName(employeeNameValue)) {
        $('#employeeName').show();
        isValid = false;
    }
    if (new Date(joinDateValue) > new Date()) {
        $('#joinDateError').show();
        isValid = false;
    }
    if (new Date(dobValue) > new Date()) {
        $('#dobError').show();
        isValid = false;
    }
    if (!validateEmail(emailValue)) {
        $('#emailError').show();
        isValid = false;
    }
    if (!validateContactNo(contactValue)) {
        $('#contactNoError').show();
        isValid = false;
    }
    if (!validateContactNo(guardianContactValue)) {
        $('#contactNoEmgError').show();
        isValid = false;
    }
    /*   if (!validateAddress(addressLine01Value)) {
           $('.address').show();
           isValid = false;
       }
       if (!validateAddress(addressLine02Value)) {
           $('.address').show();
           isValid = false;
       }
       if (!validateAddress(addressLine03Value)) {
           $('.address').show();
           isValid = false;
       }
       if (!validateAddress(addressLine04Value)) {
           $('.address').show();
           isValid = false;
       }
       if (!validatePostalCode(addressLine05Value)) {
           $('#postalCode').show();
           isValid = false;
       }*/
    if (!isValid) {
        return;
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/employees/update',
        method: 'PATCH',
        processData: false,
        contentType:false,
        data: formData,
        success: function (response) {
            alert("Employee update successfully!");
            getAllEmployees();
            clearEmpTextFiels();
            generateNextEmpId();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                alert(jqXHR.responseJSON.message);
            } else {
                alert("Error occurred while update employee.");
            }
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
});

$('#deleteEmployee').click(function () {
    let id = $('#employeeCode').val();
    $.ajax({
        url: 'http://localhost:8080/api/v1/employees/delete/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {

            alert("Employee Delete successful!");
            getAllEmployees();
            clearEmpTextFiels();
            generateNextEmpId();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.message)
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
});

function generateNextEmpId() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/v1/employees/genarateNextId',
        success: function (response) {
            console.log("generate" + response);
            let custId = response;
            if (custId != null && custId !== "") {
                let strings = custId.split("EMP-");
                console.log(custId);

                let id = parseInt(strings[1]);
                console.log(id);
                ++id;
                let digit = id.toString().padStart(3, '0');
                $('#employeeCode').val("EMP-" + digit);

            } else {
                $('#employeeCode').val("EMP-001");

            }
        },
        error: function (error) {
            console.log(error);
            $('#employeeCode').val("EMP-001");
        }
    });

}
function getAllEmployees() {
    $("#updateEmployee").prop("disabled", true);
    $("#deleteEmployee").prop("disabled", true);
    $("#tblEmployee").empty()
    $.ajax({
        url: 'http://localhost:8080/api/v1/employees/getAllEmployees',
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
          console.log(response)
            $.each(response.data, function (index, employee) {
                let profilePicHtml = '';
                if (employee.employeeProfilePic) {
                    profilePicHtml = `<div >
                                        <img class="rounded-circle" src="data:image/jpeg;base64,${employee.employeeProfilePic}" width=40px alt="Profile Pic">
                                     </div>`;
                } else {
                    profilePicHtml = '<div class="rounded-circle">No Image</div>';
                }

                let row = `<tr>
                     <td>${employee.id}</td>
                     <td>${employee.name}</td>
                       <td>${profilePicHtml}</td>
                       <td>${employee.gender}</td>
                       <td>${employee.dateOfJoin}</td>
                       <td>${employee.designation}</td>
                       <td>${employee.civilStatus}</td>
                       <td>${employee.accessRole}</td>
                       <td>${employee.dob}</td>
                       <td>${employee.attachedBranch}</td>
                       <td class="tbl-address"></td>
                       <td>${employee.contactNo}</td>
                       <td>${employee.email}</td>
                     <td>${employee.emergencyContact}</td>
                      <td>${employee.emergencyContactPerson}</td>
                     </tr>`;
                   $('#tblEmployee').append(row);
                if(employee.addressLine01 !== ""){
                    let line1 = `<span id="span_add_1">${employee.addressLine01}</span>,<br> `;
                    $(".tbl-address:last").append(line1);
                }
                if(employee.addressLine02 !== ""){
                    let line2 = `<span id="span_add_2">${employee.addressLine02}</span>,<br> `;
                    $(".tbl-address:last").append(line2);
                }

                let line3 = `<span id="span_add_3">${employee.addressLine03}</span>,<br> `;
                let line4 = `<span id="span_add_4">${employee.addressLine04}</span>,<br> `;
                let line5 = `<span id="span_add_5">${employee.addressLine05}</span>`;
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
$('#tblEmployee').on('click', 'tr', function () {

    $("#updateEmployee").prop("disabled", false);
    $("#deleteEmployee").prop("disabled", false);

    let id = $(this).find('td:first').text();
    let name = $(this).find('td:nth-child(2)').text();
    let profilePic = $(this).find('td:nth-child(3)').html();
    let gender = $(this).find('td:nth-child(4)').text();
    let joinDate = $(this).find('td:nth-child(5)').text();
    let designation = $(this).find('td:nth-child(6)').text();
    let civilStatus = $(this).find('td:nth-child(7)').text();
    let accessRole = $(this).find('td:nth-child(8)').text();
    let dob = $(this).find('td:nth-child(9)').text();
    let attachBranch = $(this).find('td:nth-child(10)').text();
    let add01=$(this).find('#span_add_1').text();
    let add02= $(this).find('#span_add_2').text();
    let add03 = $(this).find('#span_add_3').text();
    let add04 = $(this).find('#span_add_4').text();
    let add05 = $(this).find('#span_add_5').text();
    let contact = $(this).find('td:nth-child(12)').text();
    let email = $(this).find('td:nth-child(13)').text();
    let emeCon = $(this).find('td:nth-child(14)').text();
    let emeConP = $(this).find('td:nth-child(15)').text();

    var base64Data;
    var matches = profilePic.match(/src="data:image\/jpeg;base64,([^"]+)"/);
    if (matches) {
        base64Data = matches[1];

        var byteCharacters = atob(base64Data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'image/jpeg' });

        var file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });

        var dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        var fileInput = document.getElementById('customFile');
        fileInput.files = dataTransfer.files;
    } else {
        console.log("No image data found in the table cell.");
    }

    console.log(email)

    $('#employeeCode').val(id);
    $('#employeeName').val(name);
    $('#gender').val(gender);
    $('#joinDate').val(joinDate);
    $('#designation').val(designation);
    $('#status').val(civilStatus);
    $('#accessRole').val(accessRole);
    $('#dob').val(dob);
    $('#attachedBranch').val(attachBranch);
    $('#addressLine01').val(add01);
    $('#addressLine02').val(add02);
    $('#addressLine03').val(add03);
    $('#addressLine04').val(add04);
    $('#addressLine05').val(add05);
    $('#cono').val(contact);
    $('#email1').val(email);
    $('#emergencyContact').val(emeCon);
    $('#emergencyContactP').val(emeConP);


});

$("#searchEmployee").keyup(function () {

    searchEmployeeByName();
});
function searchEmployeeByName() {
    $("#tblEmployee").empty();
    let name = $("#searchEmployee").val();
    if ($("#searchEmployee").val() === "") {
        getAllEmployees();
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/employees/searchByName/'+name,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response.data.length === 0) {
                $('#tblEmployee').append('<tr><td colspan="16"  style="text-align: left; font-size: 16px;">No results found.</td></tr>');
            }
            $.each(response.data, function (index, employee) {
                let profilePicHtml = '';
                if (employee.employeeProfilePic) {
                    profilePicHtml = `<div >
                                        <img class="rounded-circle" src="data:image/jpeg;base64,${employee.employeeProfilePic}" width=40px alt="Profile Pic">
                                     </div>`;
                } else {
                    profilePicHtml = '<div class="rounded-circle">No Image</div>';
                }

                let row = `<tr>
                     <td>${employee.id}</td>
                     <td>${employee.name}</td>
                       <td>${profilePicHtml}</td>
                       <td>${employee.gender}</td>
                       <td>${employee.dateOfJoin}</td>
                       <td>${employee.designation}</td>
                       <td>${employee.civilStatus}</td>
                       <td>${employee.accessRole}</td>
                       <td>${employee.dob}</td>
                       <td>${employee.attachedBranch}</td>
                       <td class="tbl-address"></td>
                       <td>${employee.contactNo}</td>
                       <td>${employee.email}</td>
                     <td>${employee.emergencyContact}</td>
                      <td>${employee.emergencyContactPerson}</td>
                     </tr>`;
                $('#tblEmployee').append(row);
                if(employee.addressLine01 !== ""){
                    let line1 = `<span id="span_add_1">${employee.addressLine01}</span>,<br> `;
                    $(".tbl-address:last").append(line1);
                }
                if(employee.addressLine02 !== ""){
                    let line2 = `<span id="span_add_2">${employee.addressLine02}</span>,<br> `;
                    $(".tbl-address:last").append(line2);
                }

                let line3 = `<span id="span_add_3">${employee.addressLine03}</span>,<br> `;
                let line4 = `<span id="span_add_4">${employee.addressLine04}</span>,<br> `;
                let line5 = `<span id="span_add_5">${employee.addressLine05}</span>`;
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


function clearEmpTextFiels() {

    $('#employeeName').val("");
    var gender = $('#gender');
    gender.selectedIndex =0;
    var status =$('#status');
    status.selectedIndex =0;
    $('#joinDate').val("");
    $('#designation').val("");
    var role =$('#accessRole')
    role.selectedIndex=0;
    $('#dob').val("");
    $('#attachedBranch').val("");
    $('#addressLine01').val("");
    $('#addressLine02').val("");
    $('#addressLine03').val("");
    $('#addressLine04').val("");
    $('#addressLine05').val("");
    $('#email1').val("");
    $('#cono').val("");
    $('#emergencyContact').val("");
    $('#emergencyContactP').val("");


    
}