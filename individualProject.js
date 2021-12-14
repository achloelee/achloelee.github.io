var registrationKey = window.prompt("Enter your registration key: ");
let responseCount=0;

const sectorCode ={
    "0000": "Total nonfarm",
    "0500": "Total private",
    "0600":	"Goods-producing",
    "0700":	"Service-providing",
    "0800":	"Private service-providing",
    "1000":	"Mining and logging",
    "2000":	"Construction",
    "3000":	"Manufacturing",
    "3100":	"Durable Goods",
    "3200":	"Nondurable Goods",
    "4000":	"Trade, transportation, and utilities",
    "4142":	"Wholesale trade",
    "4200":	"Retail trade",
    "4300":	"Transportation and warehousing",
    "4422":	"Utilities",
    "5000":	"Information",
    "5500":	"Financial activities",
    "6000":	"Professional and business services",
    "6500":	"Education and health services",
    "7000":	"Leisure and hospitality",
    "8000":	"Other services",
    "9000":	"Government",    
};
let sectorNumber = Object.keys(sectorCode); //console.log(sectorNumber);

// These are colors from chart.js utils
const CHART_COLORS = {
    pink: 'rgb(255, 020, 147)',
    coral: 'rgb(255,127,080)',
    orange: 'rgb(255, 165, 000)',
    yellow: 'rgb(255, 255, 000)',
    green: 'rgb(000, 255, 000)',
    blue: 'rgb(000, 162, 235)',
    purple: 'rgb(160, 032, 240)',
    magenta: 'rgb(255, 000, 255)',
    deepPink: 'rgb(255, 020, 147)',
    gold: 'rgb(255, 215, 000)',
    turquoise: 'rgb(064, 224, 208)',
    skyBlue: 'rgb(000, 191, 255)',
    slateBlue: 'rgb(106, 090, 205)',
    orchid: 'rgb(224, 102, 255)',
    plum: 'rgb(255, 187, 255)',
    raspberry: 'rgb(238, 058, 140)',
    salmon: 'rgb(000, 162, 235)',
    yellowOrange: 'rgb(255, 185, 015)',
    seaGreen: 'rgb(084, 255, 159)',
    cyan: 'rgb(000, 255, 255)',
    violet: 'rgb(238, 130, 238)',
    cornflowerBlue: 'rgb(100, 149, 237)',
  };
//    console.dir(CHART_COLORS);
 let colorNames=Object.keys(CHART_COLORS)

  const CHART_COLORS_50_Percent = {
    pink: 'rgba(255, 020, 147,0.5)',
    coral: 'rgba(255,127,080,0.5)',
    orange: 'rgba(255, 165, 000,0.5)',
    yellow: 'rgba(255, 255, 000,0.5)',
    green: 'rgba(000, 255, 000,0.5)',
    blue: 'rgba(000, 162, 235,0.5)',
    purple: 'rgba(160, 032, 240,0.5)',
    magenta: 'rgba(255, 000, 255,0.5)',
    deepPink: 'rgba(255, 020, 147,0.5)',
    gold: 'rgba(255, 215, 000,0.5)',
    turquoise: 'rgba(064, 224, 208,0.5)',
    skyBlue: 'rgba(000, 191, 255,0.5)',
    slateBlue: 'rgba(106, 090, 205,0.5)',
    orchid: 'rgba(224, 102, 255,0.5)',
    plum: 'rgba(255, 187, 255,0.5)',
    raspberry: 'rgba(238, 058, 140,0.5)',
    salmon: 'rgba(000, 162, 235,0.5)',
    yellowOrange: 'rgba(255, 185, 015,0.5)',
    seaGreen: 'rgba(084, 255, 159,0.5)',
    cyan: 'rgba(000, 255, 255,0.5)',
    violet: 'rgba(238, 130, 238,0.5)',
    cornflowerBlue: 'rgba(100, 149, 237,0.5)',
  };
 let CHART_COLORS_50_Percent_Keys=Object.keys(CHART_COLORS_50_Percent)

  const data = {
    labels:[],
    datasets:[],
    borderColor: "",
    backgroundColor: "",
    hidden:true
  } 
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
          text: 'Number of Employees in Thousands'
        }
      }
    }
  };

function responseReceivedHandler(){
    if(this.status==200){
        console.log(this.response);
        let sectorline = {
            label:[],
            data:[],
            borderColor:"",
            backgroundColor:"",
            hidden:true
        }
      let dataArray = this.response.Results.series[0].data;
      let seriesID = this.response.Results.series[0].seriesID.substring(3,7)
        sectorline.label.push(sectorCode[seriesID])
        sectorline.borderColor= (CHART_COLORS[colorNames[responseCount]])
        sectorline.backgroundColor=(CHART_COLORS_50_Percent[CHART_COLORS_50_Percent_Keys[responseCount]])

    for(let i=dataArray.length-1; i>=0; i--){
      sectorline.data.push(dataArray[i].value)
      if(responseCount ==0){
      data.labels.push(dataArray[i].periodName + " " + dataArray[i].year)}

    }
     data.datasets.push(sectorline)
    responseCount++

        if(responseCount==sectorNumber.length){
            const myChart = new Chart(
            document.getElementById('myChart'),
            config);
        }
    } 
    else{
        console.log('error');
    }
};

//registration key: 085b60a72cc340caad0bec8ae143dafc

for (let i =0; i < sectorNumber.length; i++){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceivedHandler);
    xhr.responseType = "json";
    let start= "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
    let end= "000001?registrationkey="+registrationKey;
    xhr.open("GET", start + sectorNumber[i] + end);
    xhr.send();
}