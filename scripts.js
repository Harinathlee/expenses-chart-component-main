fetch("data.json")
  .then((response) => response.json())
  .then((jsondata) => {
    var days = [];
    var amounts = [];
    for (var i = 0; i < 7; i++) {
      days.push(jsondata[i].day);
      amounts.push(jsondata[i].amount);
    }
    //setup data for chart
    const data = {
      labels: days,
      datasets: [
        {
          data: amounts,
          backgroundColor: [
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(186, 34%, 60%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
          ],
          borderRadius: 4,
          borderSkipped: false,
          hoverBackgroundColor: [
            "hsl(10, 73%, 72%)",
            "hsl(10, 73%, 72%)",
            "hsl(187, 50%, 75%)",
            "hsl(10, 73%, 72%)",
            "hsl(10, 73%, 72%)",
            "hsl(10, 73%, 72%)",
            "hsl(10, 73%, 72%)",
          ],
        },
      ],
    };

    //config
    const config = {
      type: "bar",
      data: data,
      options: {
        //chnages the curser to pointer when we hover over the bar. when hovered over bar charElement will return or else it will be null
        onHover: (event, chartElement) => {
          if (chartElement.length > 0) {
            event.native.target.style.cursor = "pointer";
          } else {
            event.native.target.style.cursor = "default";
          }
        },
        // styles the x and y axis. Here Imade it to dissapear
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
              drawBorder: false,
              display: false,
            },
          },
          y: {
            begingAtZero: true,
            grid: {
              drawOnChartArea: false,
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        // Legend is the top heading like thing which appears by default Imade it to dissapear
        plugins: {
          legend: {
            display: false,
          },

          //tool tip is the data that shows on hover the bar
          tooltip: {
            callbacks: {
              title: function (tooltipItems, data) {
                return "";
              }, //dissapear the title
              labelColor: function (tooltipItem, chart) {
                return {
                  backgroundColor: "rgb(0, 0, 0)",
                };
              },
              label: function (context) {
                var label = context.dataset.label || "";

                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
            yAlign: "bottom",

            displayColors: false,
          },
        },
      },
    };

    //render init this displays the chart in html
    const myChart = new Chart(document.getElementById("myChart"), config);
  });
