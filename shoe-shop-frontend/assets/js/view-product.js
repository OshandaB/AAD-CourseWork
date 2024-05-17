$(document).ready(function () {

    getAllProducts();

})

function getAllProducts() {
    $('#tblInventory').empty();
    $.ajax({
        url: 'http://localhost:8080/api/v1/inventory/gelAllProducts',
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log(response.data);
            responsed = response;
            $.each(response.data, function (index, product) {

             /*   let sizes = '';
                let quantities = '';
                let ids ='';
                let status = '';

                // Concatenate sizes and quantities separately
                $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                    ids += `${shoeSize.id}<br>`;
                    sizes += `${shoeSize.size}`;
                    quantities += `${shoeSize.quantity}`;
                    status += `${shoeSize.status}`;
                });*/
                let sizes = '';

// Concatenate sizes, quantities, and statuses together
                $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                    sizes += `<p><strong>Size:</strong> ${shoeSize.size}, <strong>Quantity:</strong> ${shoeSize.quantity}, <strong>Status:</strong> ${shoeSize.status}</p>`;
                });
                let category = '';
                if (product.category === 'FSW') {
                    category = 'Formal Shoe Women';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'CSM') {
                    category = 'Casual Shoe Men';
                } else if (product.category === 'CSW') {
                    category = 'Casual Shoe Men';
                }
              let card =  `<div class="col-sm-6 col-xxl-4">
    <div class="card hover-img overflow-hidden productCard">
        <div class="position-relative">
            <a href="../main/eco-shop-detail.html">
                <img src="${product.itemPicture}" class="card-img-top" alt="modernize-img">
            </a>
            <a href="javascript:void(0)" class="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                <i class="ti ti-basket fs-4"></i>
            </a>
        </div>
        <div class="card-body pt-3 p-4">
         <h6 class="fs-5 fw-bold mb-2">${product.itemCode}</h6>
            <h4 class="fs-4 fw-bold mb-2">${product.itemDesc}</h4>
             <h4 class="fs-3 fw-bold mb-2">${category}</h4>
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h6 class="fs-5 mb-0 text-primary"> LKR ${product.unitPriceSale ? product.unitPriceSale.toLocaleString() : ''}  <span class="ms-2 fw-normal text-muted fs-5">
                   
                    </span>
                </h6>
                <ul class="list-unstyled d-flex align-items-center mb-0">
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                </ul>
            </div>
            <div class="mt-3">
               ${sizes}
            </div>
        </div>
    </div>
</div>`
                $('#productGrid').append(card);
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });
}
const anchorTags = document.querySelectorAll('#categoryList a');

// Add click event listener to each anchor tag
anchorTags.forEach(tag => {
    tag.addEventListener('click', function() {
        const text = tag.textContent.trim();
        const firstLetter = text.charAt(0);
        searchProductByCateName(firstLetter);
        console.log(`${text} - ${firstLetter}`);
    });
});
const anchorTags1 = document.querySelectorAll('#categoryList1 a');

// Add click event listener to each anchor tag
anchorTags1.forEach(tag => {
    tag.addEventListener('click', function() {
        const text = tag.textContent.trim();
        const firstLetter = text.charAt(0);
        searchProductByCateName(firstLetter);
        console.log(`${text} - ${firstLetter}`);
    });
});

function searchProductByCateName(category) {
    $("#productGrid").empty();

    $.ajax({
        url: 'http://localhost:8080/api/v1/inventory/searchByCateFname/'+category,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response.data.length === 0) {
                $('#productGrid').append('<div class="alert alert-info" role="alert">No result found</div>');
            }
            $.each(response.data, function (index, product) {

                /*   let sizes = '';
                   let quantities = '';
                   let ids ='';
                   let status = '';

                   // Concatenate sizes and quantities separately
                   $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                       ids += `${shoeSize.id}<br>`;
                       sizes += `${shoeSize.size}`;
                       quantities += `${shoeSize.quantity}`;
                       status += `${shoeSize.status}`;
                   });*/
                let sizes = '';

// Concatenate sizes, quantities, and statuses together
                $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                    sizes += `<p><strong>Size:</strong> ${shoeSize.size}, <strong>Quantity:</strong> ${shoeSize.quantity}, <strong>Status:</strong> ${shoeSize.status}</p>`;
                });
                let category = '';
                if (product.category === 'FSW') {
                    category = 'Formal Shoe Women';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'CSM') {
                    category = 'Casual Shoe Men';
                } else if (product.category === 'CSW') {
                    category = 'Casual Shoe Men';
                }
                let card =  `<div class="col-sm-6 col-xxl-4">
    <div class="card hover-img overflow-hidden productCard">
        <div class="position-relative">
            <a href="../main/eco-shop-detail.html">
                <img src="${product.itemPicture}" class="card-img-top" alt="modernize-img">
            </a>
            <a href="javascript:void(0)" class="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                <i class="ti ti-basket fs-4"></i>
            </a>
        </div>
        <div class="card-body pt-3 p-4">
         <h6 class="fs-5 fw-bold mb-2">${product.itemCode}</h6>
            <h4 class="fs-4 fw-bold mb-2">${product.itemDesc}</h4>
             <h4 class="fs-3 fw-bold mb-2">${category}</h4>
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h6 class="fs-5 mb-0 text-primary"> LKR ${product.unitPriceSale ? product.unitPriceSale.toLocaleString() : ''}  <span class="ms-2 fw-normal text-muted fs-5">
                   
                    </span>
                </h6>
                <ul class="list-unstyled d-flex align-items-center mb-0">
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                </ul>
            </div>
            <div class="mt-3">
               ${sizes}
            </div>
        </div>
    </div>
</div>`
                $('#productGrid').append(card);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });

}
document.querySelectorAll('input[name="exampleRadios"]').forEach(radio => {
    radio.addEventListener('change', function(event) {
        const selectedGender = event.target.value;
        searchProductByGender(selectedGender)
        console.log(selectedGender);
    });
});
document.querySelectorAll('input[name="exampleRadiosPrice"]').forEach(radio => {
    radio.addEventListener('change', function(event) {
        const price = event.target.value;
        searchProductByPrice(price)
        console.log(price);
    });
});
function searchProductByGender(gender) {
    $("#productGrid").empty();

    $.ajax({
        url: 'http://localhost:8080/api/v1/inventory/searchByCateGenderName/'+gender,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log(response.data)
            if (response.data.length === 0) {
                $('#productGrid').append('<div class="alert alert-info" role="alert">No result found</div>');
            }
            $.each(response.data, function (index, product) {

                /*   let sizes = '';
                   let quantities = '';
                   let ids ='';
                   let status = '';

                   // Concatenate sizes and quantities separately
                   $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                       ids += `${shoeSize.id}<br>`;
                       sizes += `${shoeSize.size}`;
                       quantities += `${shoeSize.quantity}`;
                       status += `${shoeSize.status}`;
                   });*/
                let sizes = '';

// Concatenate sizes, quantities, and statuses together
                $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                    sizes += `<p><strong>Size:</strong> ${shoeSize.size}, <strong>Quantity:</strong> ${shoeSize.quantity}, <strong>Status:</strong> ${shoeSize.status}</p>`;
                });
                let category = '';
                if (product.category === 'FSW') {
                    category = 'Formal Shoe Women';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'CSM') {
                    category = 'Casual Shoe Men';
                } else if (product.category === 'CSW') {
                    category = 'Casual Shoe Men';
                }
                let card =  `<div class="col-sm-6 col-xxl-4">
    <div class="card hover-img overflow-hidden productCard">
        <div class="position-relative">
            <a href="../main/eco-shop-detail.html">
                <img src="${product.itemPicture}" class="card-img-top" alt="modernize-img">
            </a>
            <a href="javascript:void(0)" class="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                <i class="ti ti-basket fs-4"></i>
            </a>
        </div>
        <div class="card-body pt-3 p-4">
         <h6 class="fs-5 fw-bold mb-2">${product.itemCode}</h6>
            <h4 class="fs-4 fw-bold mb-2">${product.itemDesc}</h4>
             <h4 class="fs-3 fw-bold mb-2">${category}</h4>
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h6 class="fs-5 mb-0 text-primary"> LKR ${product.unitPriceSale ? product.unitPriceSale.toLocaleString() : ''}  <span class="ms-2 fw-normal text-muted fs-5">

                    </span>
                </h6>
                <ul class="list-unstyled d-flex align-items-center mb-0">
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                </ul>
            </div>
            <div class="mt-3">
               ${sizes}
            </div>
        </div>
    </div>
</div>`
                $('#productGrid').append(card);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
   getAllProducts();
            console.error(jqXHR);
            console.log(textStatus)
        }
    });

}

function searchProductByPrice(price) {
    $("#productGrid").empty();

    $.ajax({
        url: 'http://localhost:8080/api/v1/inventory/searchByCatePrice/'+price,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log(response.data)
            if (response.data.length === 0) {
                $('#productGrid').append('<div class="alert alert-info" role="alert">No result found</div>');
            }
            $.each(response.data, function (index, product) {

                /*   let sizes = '';
                   let quantities = '';
                   let ids ='';
                   let status = '';

                   // Concatenate sizes and quantities separately
                   $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                       ids += `${shoeSize.id}<br>`;
                       sizes += `${shoeSize.size}`;
                       quantities += `${shoeSize.quantity}`;
                       status += `${shoeSize.status}`;
                   });*/
                let sizes = '';

// Concatenate sizes, quantities, and statuses together
                $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                    sizes += `<p><strong>Size:</strong> ${shoeSize.size}, <strong>Quantity:</strong> ${shoeSize.quantity}, <strong>Status:</strong> ${shoeSize.status}</p>`;
                });
                let category = '';
                if (product.category === 'FSW') {
                    category = 'Formal Shoe Women';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'CSM') {
                    category = 'Casual Shoe Men';
                } else if (product.category === 'CSW') {
                    category = 'Casual Shoe Men';
                }
                let card =  `<div class="col-sm-6 col-xxl-4">
    <div class="card hover-img overflow-hidden productCard">
        <div class="position-relative">
            <a href="../main/eco-shop-detail.html">
                <img src="${product.itemPicture}" class="card-img-top" alt="modernize-img">
            </a>
            <a href="javascript:void(0)" class="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                <i class="ti ti-basket fs-4"></i>
            </a>
        </div>
        <div class="card-body pt-3 p-4">
         <h6 class="fs-5 fw-bold mb-2">${product.itemCode}</h6>
            <h4 class="fs-4 fw-bold mb-2">${product.itemDesc}</h4>
             <h4 class="fs-3 fw-bold mb-2">${category}</h4>
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h6 class="fs-5 mb-0 text-primary"> LKR ${product.unitPriceSale ? product.unitPriceSale.toLocaleString() : ''}  <span class="ms-2 fw-normal text-muted fs-5">

                    </span>
                </h6>
                <ul class="list-unstyled d-flex align-items-center mb-0">
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                </ul>
            </div>
            <div class="mt-3">
               ${sizes}
            </div>
        </div>
    </div>
</div>`
                $('#productGrid').append(card);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            getAllProducts();
            console.error(jqXHR);
            console.log(textStatus)
        }
    });

}

$("#text-srh").keyup(function () {

    searchSupplierByName();
});
function searchSupplierByName() {
    $("#productGrid").empty();
    let name = $("#text-srh").val();
    if ($("#text-srh").val() === "") {
        getAllProducts();
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/inventory/searchByName/'+name,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response.data.length === 0) {
                $('#productGrid').append('<div class="alert alert-info" role="alert">No result found</div>');
            }
            $.each(response.data, function (index, product) {

                /*   let sizes = '';
                   let quantities = '';
                   let ids ='';
                   let status = '';

                   // Concatenate sizes and quantities separately
                   $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                       ids += `${shoeSize.id}<br>`;
                       sizes += `${shoeSize.size}`;
                       quantities += `${shoeSize.quantity}`;
                       status += `${shoeSize.status}`;
                   });*/
                let sizes = '';

// Concatenate sizes, quantities, and statuses together
                $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                    sizes += `<p><strong>Size:</strong> ${shoeSize.size}, <strong>Quantity:</strong> ${shoeSize.quantity}, <strong>Status:</strong> ${shoeSize.status}</p>`;
                });
                let category = '';
                if (product.category === 'FSW') {
                    category = 'Formal Shoe Women';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'FSM') {
                    category = 'Formal Shoe Men';
                } else if (product.category === 'CSM') {
                    category = 'Casual Shoe Men';
                } else if (product.category === 'CSW') {
                    category = 'Casual Shoe Men';
                }
                let card =  `<div class="col-sm-6 col-xxl-4">
    <div class="card hover-img overflow-hidden productCard">
        <div class="position-relative">
            <a href="../main/eco-shop-detail.html">
                <img src="${product.itemPicture}" class="card-img-top" alt="modernize-img">
            </a>
            <a href="javascript:void(0)" class="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                <i class="ti ti-basket fs-4"></i>
            </a>
        </div>
        <div class="card-body pt-3 p-4">
         <h6 class="fs-5 fw-bold mb-2">${product.itemCode}</h6>
            <h4 class="fs-4 fw-bold mb-2">${product.itemDesc}</h4>
             <h4 class="fs-3 fw-bold mb-2">${category}</h4>
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h6 class="fs-5 mb-0 text-primary"> LKR ${product.unitPriceSale ? product.unitPriceSale.toLocaleString() : ''}  <span class="ms-2 fw-normal text-muted fs-5">

                    </span>
                </h6>
                <ul class="list-unstyled d-flex align-items-center mb-0">
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                    <li><i class="ti ti-star text-warning fs-6 me-1"></i></li>
                </ul>
            </div>
            <div class="mt-3">
               ${sizes}
            </div>
        </div>
    </div>
</div>`
                $('#productGrid').append(card);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });

}
$('.resetFilter').click(function () {
    $('input[type="radio"]').prop('checked', false);
});