$(document).ready(function() {

    $('#dataTable tbody tr').on('click', function() {
        var rowData = $(this).find('td').map(function() {
            return $(this).text();
        }).get();

        sessionStorage.setItem('rowData', JSON.stringify(rowData));

        window.location.href = './add-customer.html';
    });
});