$(document).ready(function () {
    generateNextShoeCode();
    loadAllSupIds();
    $("#updateInventory").prop("disabled", true);
    $("#deleteInventory").prop("disabled", true);


    getAllProducts();

});

$('#saveInventory').click(function () {
    $('label[id$="Error"]').hide();
    let id = $('#itemCode').val();
    const sizeInputs = $('input[name="size"]');
    const qtyInputs = $('input[name="qty"]');

    // Create an array to store size and quantity objects
    const sizeQtyArray = [];

    // Iterate through each pair of size and quantity inputs
    sizeInputs.each(function(index) {
        const size = $(this).val(); // Get size value
        const qty = qtyInputs.eq(index).val(); // Get corresponding quantity value
        let status;
        if (qty < 10) {
            status = "Low";
        } else if (qty == 0) {
            status = "Not Available";
        } else {
            status = "Available";
        }

        // Construct an object with size and quantity
        const sizeQtyObject = {
            itemCode:id,
            size: size,
            quantity: qty,
            status: status
        };

        // Push the object to the array
        sizeQtyArray.push(sizeQtyObject);
    });

    // Convert the array to JSON string
    const sizeQtyJson = JSON.stringify(sizeQtyArray);

    // Now you can store the `sizeQtyJson` string in your database
    // Send it to your backend API for storage or perform any necessary operations
    console.log(sizeQtyJson); // For testing, you can log the JSON string to the console

    let name = $('#itemDesc').val();
    let itemPictureInput = $('#itemPicture')[0].files[0];
    let category = $('#category').val();
    let size = $('#size').val();
    let supCode = $('#supplierCode').val();
    let supName = $('#supplierName').val();
    let unitPriceSale = $('#unitPriceSale').val();
    let unitPriceBuy = $('#unitPriceBuy').val();
    let expectedProfit = $('#expectedProfit').val();
    let profitMargin = $('#profitMargin').val();
    let status = $('#status').val();
    let qty = $('#qty').val();
    if (!id || !name || !itemPictureInput  || !category  || !supCode || !supName || !unitPriceSale || !unitPriceBuy || !expectedProfit || !profitMargin) {
        alert("Please fill in all required fields.");
        return;
    }
    let isValid = true;
    // // if (!validateId(id)) {
    // //     $('#customerCodeError').show();
    // //     isValid = false;
    // // }
    // if (!validateName(name)) {
    //     $('#supplierNameError').show();
    //     isValid = false;
    // }
    //
    if (!validateUnitPrice(unitPriceSale)) {
        $('#unitPriceSaleError').show();
        isValid = false;
    }
    if (!validateUnitPrice(unitPriceBuy)) {
        $('#unitPriceBuyError').show();
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    if (!itemPictureInput) {
        alert("Please select an image.");
        return;
    }

    //
    let reader = new FileReader();
    reader.onload = function(event) {
        let itemPicture = event.target.result;
        $.ajax({
            url: 'http://localhost:8080/api/v1/inventory/save',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "itemCode": id,
                "itemDesc": name,
                "category" : category,
                "itemPicture": itemPicture,
                "supplierCode":supCode,
                "supplierName":supName,
                "unitPriceSale":unitPriceSale,
                "unitPriceBuy":unitPriceBuy,
                "expectedProfit":expectedProfit,
                "profitMargin":profitMargin,
                "shoeSizeDTOList":sizeQtyArray

            }),
            success: function (response) {
                alert("Item Save successful!");
                getAllProducts();
                clearInventoryTextFields();
                // generateNextSupId();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
                console.log(jqXHR);
                console.log(textStatus)
            }
        });
    };

    reader.readAsDataURL(itemPictureInput);

});


$('#updateInventory').click(function () {
    $('label[id$="Error"]').hide();
    let id = $('#itemCode').val();
    const sizeInputs = $('input[name="size"]');
    const qtyInputs = $('input[name="qty"]');
    const idInput = $('input[name="ids"]');
    // Create an array to store size and quantity objects
    const sizeQtyArray = [];

    // Iterate through each pair of size and quantity inputs
    sizeInputs.each(function(index) {
        const size = $(this).val(); // Get size value
        const qty = qtyInputs.eq(index).val(); // Get corresponding quantity value
        const sId = idInput.eq(index).val();
        // Construct an object with size and quantity
        let status;
        if (qty < 10) {
            status = "Low";
        } else if (qty == 0) {
            status = "Not Available";
        } else {
            status = "Available";
        }

        // Construct an object with size and quantity
        const sizeQtyObject = {
            id:sId,
            itemCode:id,
            size: size,
            quantity: qty,
            status: status
        };
        // Push the object to the array
        sizeQtyArray.push(sizeQtyObject);
    });

    // Convert the array to JSON string
    const sizeQtyJson = JSON.stringify(sizeQtyArray);

    // Now you can store the `sizeQtyJson` string in your database
    // Send it to your backend API for storage or perform any necessary operations
    console.log(sizeQtyJson); // For testing, you can log the JSON string to the console

    let name = $('#itemDesc').val();
    let itemPictureInput = $('#itemPicture')[0].files[0];
    let category = $('#category').val();
    let size = $('#size').val();
    let supCode = $('#supplierCode').val();
    let supName = $('#supplierName').val();
    let unitPriceSale = $('#unitPriceSale').val();
    let unitPriceBuy = $('#unitPriceBuy').val();
    let expectedProfit = $('#expectedProfit').val();
    let profitMargin = $('#profitMargin').val();
    let status = $('#status').val();
    let qty = $('#qty').val();
    if (!id || !name || !itemPictureInput  || !category  || !supCode || !supName || !unitPriceSale || !unitPriceBuy || !expectedProfit || !profitMargin  ) {
        alert("Please fill in all required fields.");
        return;
    }
    let isValid = true;
    // // if (!validateId(id)) {
    // //     $('#customerCodeError').show();
    // //     isValid = false;
    // // }
    // if (!validateName(name)) {
    //     $('#supplierNameError').show();
    //     isValid = false;
    // }
    //
    if (!validateUnitPrice(unitPriceSale)) {
        $('#unitPriceSaleError').show();
        isValid = false;
    }
    if (!validateUnitPrice(unitPriceBuy)) {
        $('#unitPriceBuyError').show();
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    if (!itemPictureInput) {
        alert("Please select an image.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(event) {
        let itemPicture = event.target.result;
        $.ajax({
            url: 'http://localhost:8080/api/v1/inventory/update',
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify({
                "itemCode": id,
                "itemDesc": name,
                "category" : category,
                "itemPicture": itemPicture,
                "supplierCode":supCode,
                "supplierName":supName,
                "unitPriceSale":unitPriceSale,
                "unitPriceBuy":unitPriceBuy,
                "expectedProfit":expectedProfit,
                "profitMargin":profitMargin,
                "shoeSizeDTOList":sizeQtyArray

            }),
            success: function (response) {
                alert("Item Update successful!");
                getAllProducts();
                clearInventoryTextFields();
                // generateNextSupId();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
                console.log(jqXHR);
                console.log(textStatus)
            }
        });
    };

    reader.readAsDataURL(itemPictureInput);

});
let responsed;
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
                let itemPicHtml = '';
                if (product.itemPicture) {
                    itemPicHtml = `<div >
                                        <img class="rounded-circle" src="${product.itemPicture}" width=40px alt="Profile Pic">
                                     </div>`;
                } else {
                    itemPicHtml = '<div class="rounded-circle">No Image</div>';
                }

                let sizes = '';
                let quantities = '';
                let ids ='';
                let status = '';

                // Concatenate sizes and quantities separately
                $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                   ids += `${shoeSize.id}<br>`;
                    sizes += `${shoeSize.size}<br>`;
                    quantities += `${shoeSize.quantity}<br>`;
                    status += `${shoeSize.status}<br>`;
                });
                let row = `<tr>
                     <td>${product.itemCode}</td>
                     <td>${product.itemDesc}</td>
                     <td>${itemPicHtml}</td>
                      <td>${product.category}</td>
                   
                      <td>${product.supplierCode}</td>
                      <td>${product.supplierName}</td>
                      <td>${product.unitPriceSale}</td>
                      <td>${product.unitPriceBuy}</td>
                        <td>${product.expectedProfit}</td>
                      <td>${product.profitMargin}</td>
                      <td>${status}</td>  
                      <td>${sizes}</td> 
                      <td>${quantities}</td>
                       <td class="d-none">${ids}</td>`;
                $('#tblInventory').append(row);
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });
}
function loadAllSupIds() {

    $.ajax({
        url: 'http://localhost:8080/api/v1/suppliers/gelAllSuppliers',
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {

            $.each(response.data, function (index, supplier) {
                $('#supplierCode').append(`<option >${supplier.id}</option>`);

            });


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });
}
$('#supplierCode').click(function () {

    loadSupplierName($('#supplierCode').val());

});
$('#category').click(function () {

    generateNextShoeCode($('#category').val());

});
function generateNextShoeCode(shoeCode) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/v1/inventory/genarateNextId/'+shoeCode,
        success: function (response) {
            console.log("generate" + response);
            let supId = response;
            if (supId != null && supId !== "") {
                let strings = supId.split(shoeCode);
                console.log(supId);
                console.log(strings);
                let id = parseInt(strings[1]);
                console.log(id);
                ++id;
                let digit = id.toString().padStart(5, '0');
                $('#itemCode').val(shoeCode + digit);
                console.log(shoeCode+ digit);
            } else {
                if (shoeCode !== undefined){
                    $('#itemCode').val(shoeCode+"00001");
                    console.log(shoeCode+"00001")
                }


            }
        },
        error: function (error) {
            console.log(error);
            if (shoeCode !== undefined){
                $('#itemCode').val(shoeCode+"00001");
                console.log(shoeCode+"00001")
            }
            // $('#customerCode').val("SUP-001");
        }
    });

}

$('#tblInventory').on('click', 'tr', function () {
    $("#updateInventory").prop("disabled", false);
    $("#deleteInventory").prop("disabled", false);

    let id = $(this).find('td:first').text();
    let desc = $(this).find('td:nth-child(2)').text();
    let pic = $(this).find('td:nth-child(3)').html();
    let category = $(this).find('td:nth-child(4)').text();
    let supCode = $(this).find('td:nth-child(5)').text();
    let supName = $(this).find('td:nth-child(6)').text();
    let uSale = $(this).find('td:nth-child(7)').text();
    let uBuy = $(this).find('td:nth-child(8)').text();
    let expectedProfit= $(this).find('td:nth-child(9)').text();
    let profitMargin = $(this).find('td:nth-child(10)').text();
    let status = $(this).find('td:nth-child(11)').text();


    $('#itemCode').val(id);
    $('#itemDesc').val(desc);

    $('#category').val(category);
    $('#supplierCode').val(supCode);
    $('#supplierName').val(supName);
    $('#unitPriceSale').val(uSale);
    $('#unitPriceBuy').val(uBuy);
    $('#expectedProfit').val(expectedProfit);
    $('#profitMargin').val(profitMargin);
    $('#status').val(status);
    var matches = pic.match(/src="data:image\/(jpeg|png);base64,([^"]+)"/);
    if (matches) {
        var base64Data = matches[2];

        // Convert to jpeg
        var canvas = document.createElement('canvas');
        var img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var newDataURL = canvas.toDataURL('image/jpeg', 1.0);
            var jpegBase64Data = newDataURL.split(',')[1];

            // Creating File object
            var byteCharacters = atob(jpegBase64Data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: 'image/jpeg' });

            var file = new File([blob], 'item.jpg', { type: 'image/jpeg' });

            // Creating DataTransfer object and adding file to it
            var dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            // Setting files to file input
            var fileInput = document.getElementById('itemPicture');
            fileInput.files = dataTransfer.files;
        };
        img.src = 'data:image/' + matches[1] + ';base64,' + base64Data;
    } else {
        console.log("No image data found in the table cell.");
    }

    // Clear previous size and quantity fields
    $('#sizeQtyFields').empty();

    // Get the index of the clicked row
    var rowIndex = $(this).index();

    // Get the shoeSizeDTOList of the clicked product
    var shoeSizes =  responsed.data[rowIndex].shoeSizeDTOList;

    // Create size and quantity fields dynamically
    $.each(shoeSizes, function (index, shoeSize) {
        var newSizeLabel = $("<label class='form-label'>").text("Size *");

        var sizeInput = $("<input>").attr({
            type: "text",
            class: "form-control mb-2",
            name :"size",
            value: shoeSize.size,
        });

        var newQtyLabel = $("<label class='form-label'>").text("Quantity *");

        var quantityInput = $("<input>").attr({
            type: "number",
            class: "form-control mb-2",
            name :"qty",
            value: shoeSize.quantity,
        });
        var ids = $("<input>").attr({
            type: "text",
            class: "form-control d-none mb-2",
            name :"ids",
            value: shoeSize.id,
        });
        // $('#sizeQtyFields').append(sizeInput).append(quantityInput);
        $('#sizeQtyFields').append(ids,newSizeLabel,sizeInput,newQtyLabel,quantityInput);
    });
});
function loadSupplierName(supCode) {

    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/v1/suppliers/getOneSupplier/'+supCode,
        success: function (response) {
            $('#supplierName').val(response.data.name);
        },
        error: function (error) {
            console.log(error);

            // $('#customerCode').val("SUP-001");
        }
    });


}

$('#deleteInventory').click(function () {
    let id = $('#itemCode').val();
    $.ajax({
        url: 'http://localhost:8080/api/v1/inventory/delete/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {

            alert("Product Delete successful!");
          getAllProducts();
            clearInventoryTextFields();
            // generateNextSupId();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.message)
            console.log(jqXHR);
            console.log(textStatus)
        }
    });
});

function addSizeQtyFields() {
    var sizeQtyFields = $("#sizeQtyFields");
    var sizeQtyGroup = $("<div>").addClass("form-group row sizeQtyGroup");

    var newSizeLabel = $("<label class='form-label'>").text("Size *");
    var newSizeInput = $("<input>").attr({
        type: "text",
        class: "form-control",
        name: "size",
        placeholder: "5/7/8/9/10/11/M/L/S",
        required: true
    });

    var newQtyLabel = $("<label class='form-label mt-3'>").text("Quantity *");
    var newQtyInput = $("<input>").attr({
        type: "number",
        class: "form-control",
        value:0,
        name: "qty",
        placeholder: "Quantity *",
        required: true
    });
    var closeBtn = $("<button>").addClass("btn btn-danger col-auto mt-3 mb-3").text("Cancel").click(function() {
        $(this).closest(".sizeQtyGroup").remove();
    });

    sizeQtyGroup.append(newSizeLabel, newSizeInput, newQtyLabel, newQtyInput,closeBtn);

    sizeQtyFields.append(sizeQtyGroup);
}

$("#searchInventory").keyup(function () {

    searchSupplierByName();
});
function searchSupplierByName() {
    $("#tblInventory").empty();
    let name = $("#searchInventory").val();
    if ($("#searchInventory").val() === "") {
        getAllProducts();
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/inventory/searchByName/'+name,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response.data.length === 0) {
                $('#tblInventory').append('<tr><td colspan="16"  style="text-align: left; font-size: 16px;">No results found.</td></tr>');
            }
            $.each(response.data, function (index, product) {
                let itemPicHtml = '';
                if (product.itemPicture) {
                    itemPicHtml = `<div >
                                        <img class="rounded-circle" src="${product.itemPicture}" width=40px alt="Profile Pic">
                                     </div>`;
                } else {
                    itemPicHtml = '<div class="rounded-circle">No Image</div>';
                }

                let sizes = '';
                let quantities = '';
                let ids ='';

                // Concatenate sizes and quantities separately
                $.each(product.shoeSizeDTOList, function (i, shoeSize) {
                    ids += `${shoeSize.id}<br>`;
                    sizes += `${shoeSize.size}<br>`;
                    quantities += `${shoeSize.quantity}<br>`;
                });
                let row = `<tr>
                     <td>${product.itemCode}</td>
                     <td>${product.itemDesc}</td>
                     <td>${itemPicHtml}</td>
                      <td>${product.category}</td>
                   
                      <td>${product.supplierCode}</td>
                      <td>${product.supplierName}</td>
                      <td>${product.unitPriceSale}</td>
                      <td>${product.unitPriceBuy}</td>
                        <td>${product.expectedProfit}</td>
                      <td>${product.profitMargin}</td>
                      <td>${product.status}</td>  
                      <td>${sizes}</td> 
                      <td>${quantities}</td>
                       <td class="d-none">${ids}</td>`;
                $('#tblInventory').append(row);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.error(jqXHR);
            console.log(textStatus)
        }
    });

}
$("#unitPriceBuy").keyup(function () {

    let uPriceSale = $("#unitPriceSale").val()
    let uPriceBuy = $("#unitPriceBuy").val()

    $("#expectedProfit").val(uPriceSale-uPriceBuy);
    let profit_margin = ($("#expectedProfit").val() / $("#unitPriceSale").val()) * 100;


    $("#profitMargin").val(profit_margin);
});
$('#resetInventory').click(function () {
    clearInventoryTextFields();
});
function clearInventoryTextFields() {
    $('#itemDesc').val("");
    $('#itemCode').val("");
    var status = $('#status');
    status.selectedIndex =0;

    var category = $('#category');
    category.selectedIndex =0;

    var supplierCode1 = $('#supplierCode');
    supplierCode1.selectedIndex =0;
    $('#itemPicture').val("");
    $('#supplierName').val("");
    $('#unitPriceBuy').val("");
    $('#unitPriceSale').val("");
    $('#expectedProfit').val("");

    $('#profitMargin').val("");


}


