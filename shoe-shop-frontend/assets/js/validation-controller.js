
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
function validatePostalCode(postalCode) {

    return /^\d{5}$/.test(postalCode);
}

function validateQuantity(quantity) {
    // Example regex pattern for validating quantity (positive integers only)
    const quantityPattern = /^[1-9]\d*$/;
    return quantityPattern.test(quantity);
}

function validateUnitPrice(unitPrice) {
    // Example regex pattern for validating unit price (positive numbers with up to 2 decimal places)
    const unitPricePattern = /^\d+(\.\d{1,2})?$/;
    return unitPricePattern.test(unitPrice);
}