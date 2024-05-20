$(document).ready(function () {


    $('#btnLogin').click(function () {
        let username = $('#txtUsername').val();
        let password = $('#txtPassword').val();
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
                console.log(xhr.status);
                if (xhr.status === 200) {
                    //set token in env.js
                    localStorage.setItem('token', data.token);

                    console.log(token);


                    window.location.replace('admin-index.html');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
                console.error(jqXHR);
                console.log(textStatus)
            }

        });

    });
});