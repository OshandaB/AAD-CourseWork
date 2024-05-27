$(document).ready(function () {
  setSalesOverview(5,2024);
  mostSalesItemByMonth(5,2024);
  mostSalesFourItems();
  totalCustomers();
  sendEmailForBithday();

});



    // setSalesOverview();
  /*function setSalesOverview() {

    // =====================================
    // Profit
    // =====================================
    var chart = {
      series: [
        { name: "Earnings this month:", data: [355, 390, 300, 350, 390, 180, 355, 390] },
        // { name: "Expense this month:", data: [280, 250, 325, 215, 250, 310, 280, 250] },
      ],

      chart: {
        type: "bar",
        height: 345,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: "#adb0bb",
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },


      colors: ["#5D87FF", "#49BEFF"],


      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: [6],
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all'
        },
      },
      markers: { size: 0 },

      dataLabels: {
        enabled: false,
      },


      legend: {
        show: false,
      },


      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },

      xaxis: {
        type: "category",
        categories: ["16/08", "17/08", "18/08", "19/08", "20/08", "21/08", "22/08", "23/08"],
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
        },
      },


      yaxis: {
        show: true,
        min: 0,
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: "butt",
        colors: ["transparent"],
      },


      tooltip: { theme: "light" },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              }
            },
          }
        }
      ]


    };

    var chart = new ApexCharts(document.querySelector("#chart"), chart);
    chart.render().then(r => {
      console.log(r);
    });
  }*/

// Function to update the chart
  function updateChart(salesMap) {
    $('#chart').empty();
    let dates = Object.keys(salesMap);
    let payments = Object.values(salesMap);

    var chartOptions = {
      series: [
        { name: "Earnings this month:", data: payments }
      ],
      chart: {
        type: "bar",
        height: 345,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: "#adb0bb",
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
      colors: ["#5D87FF", "#49BEFF"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: [6],
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all'
        },
      },
      markers: { size: 0 },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        type: "category",
        categories: dates,
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: Math.max(...payments) + 50, // Adjust max value according to the data
        tickAmount: 4,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: "butt",
        colors: ["transparent"],
      },
      tooltip: { theme: "dark" },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              }
            },
          }
        }
      ]
    };

    var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
    chart.render();
  }

  function setMostSalesItem(highestDailySales, categories,itemDetailsMap) {
    $('#chartMost').empty();
    // Chart configuration
    var chartOptions = {
      series: [
        { name: "Highest sales quantity:", data: highestDailySales },
      ],
      chart: {
        type: "bar",
        height: 345,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: "#adb0bb",
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
      colors: ["#5D87FF", "#49BEFF"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: [6],
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all'
        },
      },
      markers: { size: 0 },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        type: "category",
        categories: categories,
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: "butt",
        colors: ["transparent"],
      },
      tooltip: {
        theme:'dark',
        enabled: true,
        y: {
          formatter: function (val, { series, seriesIndex, dataPointIndex }) {
            let date = categories[dataPointIndex];
            let itemDetails = itemDetailsMap.get(date);
            if (itemDetails) {
              return `Item Name: ${itemDetails.itemName}<br>Item Code: ${itemDetails.itemCode}<br>Quantity: ${val}`;
            }
            return `Quantity: ${val}`;
          }
        }
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              }
            },
          }
        }
      ]
    };

    var chart = new ApexCharts(document.querySelector("#chartMost"), chartOptions);
    chart.render().then(r => {
      console.log(r);
    });
  }
  // =====================================
  // Breakup
  // =====================================
  function piechart(customerLevelMap) {
    var breakup = {
      color: "#adb5bd",
      series:  Object.values(customerLevelMap),
      labels: Object.keys(customerLevelMap),
      chart: {
        width: 180,
        type: "donut",
        fontFamily: "Plus Jakarta Sans', sans-serif",
        foreColor: "#adb0bb",
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
          },
        },
      },
      stroke: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
      colors: ["#5D87FF", "#ecf2ff", "#F9F9FD"],

      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 150,
            },
          },
        },
      ],
      tooltip: {
        theme: "dark",
        fillSeriesColor: false,
      },
    };

    var chartPie = new ApexCharts(document.querySelector("#breakup"), breakup);
    chartPie.render();
  }




  // =====================================
  // Earning
  // =====================================
  var earning = {
    chart: {
      id: "sparkline3",
      type: "area",
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: "Earnings",
        color: "#49BEFF",
        data: [25, 66, 20, 40, 12, 58, 20],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: ["#f3feff"],
      type: "solid",
      opacity: 0.05,
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  new ApexCharts(document.querySelector("#earning"), earning).render();

  $('#salesMonth').click(function () {
    let dateString = $('#salesMonth').val();
    const dateParts = dateString.split('/');

// Extract the year and month
    const year = dateParts[0];
    const month = dateParts[1];
    setSalesOverview(month,year);
    //create ajax request

  });

//   $('#mostSalesItemByMonth').click(function () {
//     let dateString = $('#mostSalesItemByMonth').val();
//     const dateParts = dateString.split('/');
//
// // Extract the year and month
//     const year = dateParts[0];
//     const month = dateParts[1];
//     //create ajax request
//     $.ajax({
//       url: 'http://localhost:8080/api/v1/dashboard/mostSalesItemByDate/'+month+'/'+year,
//       method: 'GET',
//       contentType: 'application/json',
//       headers: {
//         'Authorization': 'Bearer '+token
//       },
//       success: function (response) {
//         console.log(response.data);
//
//         let salesMap = {};
//         $.each(response.data, function (index, sales) {
//
//           console.log(sales.qty);
//             console.log(sales.salesDate);
//
//         });
//
//       },
//       error: function (jqXHR,error) {
//         console.log(error);
//
//       }
//
//
//
//     });
//   });
  $('#mostSalesItemByMonth').click(function () {
    let dateString = $('#mostSalesItemByMonth').val();
    const dateParts = dateString.split('/');

    // Extract the year and month
    const year = dateParts[0];
    const month = dateParts[1];
  mostSalesItemByMonth(month,year);
    // Create AJAX request to fetch the data

  });


      function setSalesOverview(month,year) {
        $.ajax({
          url: 'http://localhost:8080/api/v1/dashboard/filterByMonth/'+month+'/'+year,
          method: 'GET',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer '+token
          },
          success: function (response) {
            console.log(response.data);

            let salesMap = {};
            $.each(response.data, function (index, sales) {
              console.log(sales.date);
              console.log(sales.totalPayment);
              //If there are many payments on the same day, add all the payments to the relevant day
              if (sales.date in salesMap) {
                salesMap[sales.date] += sales.totalPayment;
              } else {
                salesMap[sales.date] = sales.totalPayment;
              }
              console.log(salesMap);
            });
            updateChart(salesMap);

          },
          error: function (jqXHR,error) {
            if (jqXHR.status === 401) {
              window.location.replace('authentication-login.html');
            }
            console.log(error);

          }



        });
      }

      function mostSalesItemByMonth(month,year) {
        $.ajax({
          url: 'http://localhost:8080/api/v1/dashboard/mostSalesItemByDate/' + month + '/' + year,
          method: 'GET',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          success: function (response) {
            console.log(response.data);

            // Create a map to store the highest qty item for each day
            let dailySalesMap = new Map();

            // Group sales data by each day
            $.each(response.data, function (index, sales) {
              let salesDate = sales.salesDate; // Assuming salesDate is in 'YYYY-MM-DD' format
              let day = new Date(salesDate).getDate();

              if (!dailySalesMap.has(day)) {
                dailySalesMap.set(day, []);
              }

              dailySalesMap.get(day).push(sales);
            });

            // Find the item with the highest quantity for each day
            let highestDailySales = [];
            let categories = [];
            let itemDetailsMap = new Map();
            dailySalesMap.forEach((salesList, day) => {
              let highestQty = 0;
              let highestQtyItem = null;

              salesList.forEach(sales => {
                if (sales.qty > highestQty) {
                  highestQty = sales.qty;
                  highestQtyItem = sales;
                }
              });

              if (highestQtyItem) {
                highestDailySales.push(highestQtyItem.qty);
                categories.push(`${month}/${String(day).padStart(2, '0')}`);
                itemDetailsMap.set(`${month}/${String(day).padStart(2, '0')}`, highestQtyItem);

              }
            });

            // Render the chart with the processed data
            setMostSalesItem(highestDailySales, categories,itemDetailsMap);
          },
          error: function (jqXHR, error) {
            if (jqXHR.status === 401) {
              window.location.replace('authentication-login.html');
            }
            console.log(error);
          }
        });
      }

      function mostSalesFourItems() {
        $.ajax({
          url: 'http://localhost:8080/api/v1/dashboard/mostSalesItemFour',
          method: 'GET',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer '+token
          },
          success: function (response) {
            console.log(response.data);
            $.each(response.data, function (index, salesItem) {
              console.log(salesItem)
              getItemDetails(salesItem)
            });

          },
          error: function (jqXHR,error) {
            if (jqXHR.status === 401) {
              window.location.replace('authentication-login.html');
            }
            console.log(error);

          }



        });
      }

      function getItemDetails(salesItem) {
        $.ajax({
          url: 'http://localhost:8080/api/v1/inventory/getOneProduct/' + salesItem,
          method: 'GET',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer '+token
          },
          success: function (response) {
            console.log(response.data);
            let card =`<div class="col-sm-6 col-xl-3">
          <div class="card overflow-hidden rounded-2">
            <div class="position-relative">
              <a href="javascript:void(0)"><img src="${response.data.itemPicture}" class="card-img-top rounded-0" alt="..."></a>
              <a href="javascript:void(0)" class="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i class="ti ti-basket fs-4"></i></a>                      </div>
            <div class="card-body pt-3 p-4">
              <h4 class="fs-4 fw-bold mb-2 text-primary">${response.data.itemDesc}</h4>
             <h4 class="fs-3 fw-bold mb-2 text-primary">${response.data.category}</h4>
              <div class="d-flex align-items-center justify-content-between">
                   <h6 class="fs-5 mb-0 text-primary"> LKR ${response.data.unitPriceSale ? response.data.unitPriceSale.toLocaleString() : ''}  <span class="ms-2 fw-normal text-muted fs-5">
                   
                    </span>
                </h6>
            
              </div>
            </div>
          </div>
        </div>`
            $('#dashPicture').append(card);
          },
          error: function (jqXHR,error) {
            console.log(error);

          }



        });
      }
      function totalCustomers() {
        //create ajax request
        $.ajax({
          url: 'http://localhost:8080/api/v1/dashboard/countCustomers',
          method: 'GET',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer '+token
          },
            success: function (response) {
                console.log(response.data);
                $('#totalCustomers').text(response.data);
                getCustomerLevel();
            },
            error: function (jqXHR,error) {
                console.log(error);

            }
        });
      }
      function getCustomerLevel() {
        $.ajax({
          url: 'http://localhost:8080/api/v1/customers/gelAllCustomers',
          method: 'GET',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer '+token
          },
          success: function (response) {
            console.log(response.data);
            let customerLevelMap = new Map();
            $.each(response.data, function (index, customer) {
              if (customer.level in customerLevelMap) {
                customerLevelMap[customer.level] += 1;
              } else {
                customerLevelMap[customer.level] = 1;
              }
            });
            console.log(customerLevelMap);
        piechart(customerLevelMap)

          },
            error: function (jqXHR,error) {
                console.log(error);

            }
        });
      }
      
      function sendEmailForBithday() {

        $.ajax({
          url: 'http://localhost:8080/api/v1/customers/sendEmail',
          method: 'GET',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer '+token
          },
          success: function (response) {

            console.log(response.data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Birthday Wishes Sent!",
              background: '#202936',
              text: response.message, // Assuming response has a message property
              showConfirmButton: true,
              timer: 3000,
              customClass: {
                popup: 'custom-swal-popup', // Custom class for popup
                title: 'custom-swal-title', // Custom class for title
                content: 'custom-swal-content' // Custom class for content
              },
              timerProgressBar: true,
            });

            // Add custom CSS
            const style = document.createElement('style');
            style.innerHTML = `
                .custom-swal-popup {
                    padding: 20px !important; /* Adjust padding */
                    border-radius: 15px !important; /* Customize border radius */
                    color: #fff !important; /* Custom text color */
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) !important; /* Custom shadow */
                }
                .custom-swal-title {
                    font-size: 20px !important; /* Adjust title font size */
                    font-weight: bold !important; /* Adjust font weight */
                }
                .custom-swal-content {
                    font-size: 16px !important; /* Adjust content font size */
                }
                .custom-timer-progress-bar {
                    background: linear-gradient(to right, #00b09b, #96c93d) !important; /* Custom progress bar color */
                }
            `;
            document.head.appendChild(style);
          },
          error: function (jqXHR,error) {
            console.log(error);

          }
        });
      }





