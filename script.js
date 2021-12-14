
    const labels =["Jan","Feb","Mar","Apr","May","June","July"];
//    console.log("labels");
//    console.log(labels);

// These are colors from chart.js utils
    const CHART_COLORS = {
    pink: 'rgb(255, 020, 147)',
    orange: 'rgb(255, 165, 000)',
    yellow: 'rgb(255, 255, 000)',
    green: 'rgb(000, 255, 000)',
    blue: 'rgb(000, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
    };
//    console.dir(CHART_COLORS);

    const CHART_COLORS_50_Percent = {
    pink: 'rgb(255, 020, 147)',
    orange: 'rgb(255, 165, 000)',
    yellow: 'rgb(255, 255, 000)',
    green: 'rgb(000, 255, 000)',
    blue: 'rgb(000, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: [40, -60, 38, 17, 83, -1, -40],
          borderColor: CHART_COLORS.yellow,
          backgroundColor: CHART_COLORS_50_Percent.yellow,
          hidden: true
        },
        {
          label: 'Dataset 2',
          data: [-40, -20, -50, 35, 57, 56, -33],
          borderColor: CHART_COLORS.orange,
          backgroundColor: CHART_COLORS_50_Percent.orange,
          hidden: true
        }
      ]
    };
  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      }
    };
//    console.log(config);

    const myChart = new Chart(
      document.getElementById('myChart'),
        config);
//    console.dir(myChart);
//    console.log("Ending");


