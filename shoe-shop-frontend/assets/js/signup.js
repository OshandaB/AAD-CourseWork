$(document).ready(function () {


    $('#btnSignUp').click(function () {
        let username = $('#txtUsername').val();
        let password = $('#txtPassword').val();
        let role = $('#accessRole').val();
        console.log(username);
        console.log(password);
        if (!username || !password || !role) {
            alert('All fields are required.');
            return;
        }
        if (!validateEmail(username)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            return;
        }
        //create ajax request
        $.ajax({
            url: 'http://localhost:8080/api/v1/auth/signup',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: username,
                password: password,
                role:role
            }),
            success: function (data, textStatus, xhr) {
                console.log(data);
                console.log(xhr.status);
                if (xhr.status === 200) {
                    //set token in env.js
                    // localStorage.setItem('token', data.token);
                    // localStorage.setItem('email',data.userDTO.email)
                    // localStorage.setItem('picture',data.employeeDTO.employeeProfilePic)
                    //
                    // console.log(token);
                    //
                    //
                    // window.location.replace('admin-index.html');
                    alert('register successful')
                    $('#registerModal').modal('hide');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
  alert(jqXHR.responseJSON.message);
                console.error(jqXHR);
                console.log(textStatus)
            }

        });

    });
});