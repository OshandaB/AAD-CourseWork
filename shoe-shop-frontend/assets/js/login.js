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
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login Success",
                        showConfirmButton: false,
                        background: '#202936',
                        timer: 1500,
                        width: '500px',
                        customClass: {
                            popup: 'custom-swal-popup', // Custom class for popup
                            title: 'custom-swal-title', // Custom class for title
                            timerProgressBar: 'custom-timer-progress-bar'// This will apply custom CSS for height
                        },
                        timerProgressBar: true,
                        willClose: () => {
                            //set token in env.js
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('email', data.userDTO.email);

                            if (data.userDTO.role === 'ADMIN') {
                                localStorage.setItem('picture', data.employeeDTO.employeeProfilePic);
                                window.location.replace('admin-index.html');
                            } else if (data.userDTO.role === 'USER') {
                                localStorage.setItem('userPicture', data.employeeDTO.employeeProfilePic);
                                window.location.replace('user-place-order.html');
                            }
                        }
                    });
                    const style = document.createElement('style');
                    style.innerHTML = `
              .custom-swal-popup {
                  padding-bottom: 30px !important; /* Adjust padding */
            border-radius: 5px !important; /* Customize border radius */
            color:  white !important; /* Custom text color */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) !important; /* Custom shadow */
            }
            .custom-swal-title {
                font-size: 18px !important; /* Adjust title font size */
            }
            .custom-timer-progress-bar {
                background: linear-gradient(to right, #00b09b, #96c93d) !important; /* Custom progress bar color */
            }
        `;
                    document.head.appendChild(style);

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
                console.error(jqXHR);
                console.log(textStatus)
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Login Failed "+jqXHR.responseJSON.message,
                    showConfirmButton: false,
                    timer: 3000,
                    width: '500px',

                    customClass: {
                        popup: 'custom-swal-popup', // Custom class for popup
                        title: 'custom-swal-title', // Custom class for title
                        timerProgressBar: 'custom-timer-progress-bar'// This will apply custom CSS for height
                    },
                    timerProgressBar: true,
                });
                const style = document.createElement('style');
                style.innerHTML = `
        .custom-swal-popup {
            padding-bottom: 30px !important; /* Adjust padding */
            border-radius: 5px !important; /* Customize border radius */
             background-color:  #202936 !important; /* Custom background color */
            color:  white !important; /* Custom text color */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) !important; /* Custom shadow */
        }
        .custom-swal-title {
            font-size: 18px !important; /* Adjust title font size */
            font-weight: bold !important; /* Adjust font weight */
        }
        .custom-timer-progress-bar {
            background: linear-gradient(to right, #ff6f61, #d32f2f) !important; /* Custom progress bar color */
        }
    `;
                document.head.appendChild(style);
            }

        });

    });
});