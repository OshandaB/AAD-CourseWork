
function validateEmail(email) {
    // Simple email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateAddress(address) {
    // Simple email validation regex
    return /^[a-zA-Z0-9\s.,-]*$/.test(address);
}
function validateId(id) {
    // Simple email validation regex
    return /^CUS-\d{3}$/.test(id);
}
function validateName(name) {
    // Simple email validation regex
    return /^[a-zA-Z\s]+$/.test(name);
}

function validateContactNo(contactNo) {

    return /(^$|[0-9]{10})/.test(contactNo);
}