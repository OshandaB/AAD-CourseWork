

$(document).ready(function () {
    getAllOrders();

});

function getAllOrders() {

    $('#tblSalesDetails').empty();
    $.ajax({
        url: 'http://localhost:8080/api/v1/salesDetails/gelAllOrders',
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log(response.data);

            $.each(response.data, function (index, orders) {
                let customerName;
                             if (orders.customerName==null || orders.customerName === ''){
                                 customerName = "Not A Loyalty Customer"
                             }else {
                                 customerName = orders.customerName;
                             }
                let row = `<tr>
                     <td class="fs-2">${orders.orderId}</td>
                   
                     <td class="fs-2">${customerName}</td>
                      <td class="fs-2">${orders.date}</td>

                      <td class="fs-2">${orders.totalPayment}</td>
                      <td class="fs-2">${orders.paymentMethod}</td>
                      <td class="fs-2">${orders.addedPoints}</td>
                      <td class="fs-2">${orders.employeeName}</td>
                     <td class="fs-7"><i class="ti ti-trash fs-7 delete-icon" title="refund" data-order-id="${orders.orderId}" data-order-date="${orders.date}"></i></td>
                       
                                    </tr>`;
                $('#tblSalesDetails').append(row);
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });
}
// Event delegation for delete icons
$('#tblSalesDetails').on('click', '.delete-icon', function () {
    const orderId = $(this).data('order-id');

    const orderDate = $(this).data('order-date');


    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const orderDateTime = new Date(orderDate);

    if (orderDateTime <= threeDaysAgo) {

        console.log("The order with ID:", orderId, "was placed three days or more earlier than today.");
        deleteOrder(orderId);
    } else {
        console.log("The order with ID:", orderId, "was not placed three days earlier than today.");
    }
});


function deleteOrder(orderId) {

    $.ajax({
        url: 'http://localhost:8080/api/v1/salesDetails/delete/' + orderId,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
            getAllOrders();
            $("#exampleModal").modal("hide");
            // generateNextSupId();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.message)
            console.log(jqXHR);
            console.log(textStatus)
        }
    });

}


$('#tblSalesDetails').on('click', 'tr', function () {
    let id = $(this).find('td:first').text();

    getSalesItems(id);


});
function getSalesItems(id) {
    $('#tblSalesItemDetails').empty();
    $.ajax({
        url: 'http://localhost:8080/api/v1/salesDetails/gelAllSalesItems/' + id,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
             console.log(response.data)
            $("#exampleModal").modal("show");
            $.each(response.data, function (index, orders) {

                let row = `<tr>
                     <td >${orders.itemCode}</td>
                   
                     <td >${orders.itemName}</td>
                      <td>${orders.qty}</td>

                      <td >${orders.size}</td>
                      <td >${orders.unitPrice}</td>
                 
                     <td class="fs-7"><i class="ti ti-trash fs-7 delete-sales-icon" data-order-id="${orders.orderId}" data-order-item="${orders.itemCode}" data-order-size="${orders.size}"></i></td>
                       
                                    </tr>`;
                $('#tblSalesItemDetails').append(row);
            });
            // generateNextSupId();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.message)
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
}



$('#tblSalesItemDetails').on('click', '.delete-sales-icon', function () {
    const orderId = $(this).data('order-id');

    const itemCode = $(this).data('order-item');

    const size = $(this).data('order-size');
    const rowCount = $('#tblSalesItem tbody tr').length;
    console.log(rowCount);
    if (rowCount === 1) {

        deleteOrder(orderId);
    } else {

        deleteOrderItem(orderId, itemCode, size);
    }


});
function deleteOrderItem(orderId, itemCode, size) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/salesDetails/delete/' + orderId +'/'+itemCode+'/'+size,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5479E5",
                cancelButtonColor: "#FA896B",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    getAllOrders();
                    $("#exampleModal").modal("hide");
                }
            });

            // generateNextSupId();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert(jqXHR.responseJSON.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: jqXHR.responseJSON.message,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
}
