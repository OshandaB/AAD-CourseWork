
$(function () {
    var jpegImageData = localStorage.getItem('picture')||localStorage.getItem('userPicture');
    setProfileImage(jpegImageData, 'jpeg');
    var pngImageData = localStorage.getItem('picture') || localStorage.getItem('userPicture');
    setProfileImage(pngImageData, 'png');
    function setProfileImage(imageData, format) {
        var imageElement = document.getElementById('profileImage');

        if (imageElement) {
            var mimeType = format.toLowerCase() === 'png' ? 'image/png' : 'image/jpeg';

            imageElement.src = `data:${mimeType};base64,${imageData}`;
        } else {
            console.error('Image element not found');
        }
    }

    $('#btnLogout').click(function () {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('picture');
        localStorage.removeItem('userPicture');
        window.location.replace('authentication-login.html');
    });

});

let notifications = document.querySelector('.notifications');
let success = document.getElementById('success');
let error = document.getElementById('error');
let warning = document.getElementById('warning');
let info = document.getElementById('info');

let signIn = document.getElementById('btnLogin');

function createToast(type, icon, title, text){
    alert('toast')
    let newToast = document.createElement('div');
    newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
            </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(
        ()=>newToast.remove(), 5000
    )
}
success.onclick = function(){
    alert('success')
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Success';
    let text = 'This is a success toast.';
    createToast(type, icon, title, text);
}
error.onclick = function(){
    let type = 'error';
    let icon = 'fa-solid fa-circle-exclamation';
    let title = 'Error';
    let text = 'This is a error toast.';
    createToast(type, icon, title, text);
}
warning.onclick = function(){
    let type = 'warning';
    let icon = 'fa-solid fa-triangle-exclamation';
    let title = 'Warning';
    let text = 'This is a warning toast.';
    createToast(type, icon, title, text);
}
info.onclick = function(){
    let type = 'info';
    let icon = 'fa-solid fa-circle-info';
    let title = 'Info';
    let text = 'This is a info toast.';
    createToast(type, icon, title, text);
}
signIn.onclick = function(){
    alert('sign in')
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Success';
    let text = 'You have successfully signed in.';
    createToast(type, icon, title, text);
}