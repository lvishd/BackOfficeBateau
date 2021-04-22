import { Component, OnInit } from '@angular/core';
import {ChartType, ChartDataSets, ChartOptions} from 'chart.js';
import { Color, Label, } from 'ng2-charts';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {


  data
  annees
  mois 
  sommeVenteMois=[]
  sommeVenteJour=[]

  constructor(public productsService: ProductsService) { }


  ngOnInit(
    ) 
    
    {
      this.getSales()
      console.log(this.data)
    }
  
  getSales(){
    this.productsService.getSales().subscribe(res => {
      console.log(res)
      console.log(res[0].date[0].annee)

      this.data=res;
    },
      (err) => {
        alert('failed loading json data');
      });
  }

  parseDataYears(){

  }

  





  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        id: 'Oil',
        type: 'linear',
        ticks: {
          min: 0,
          max: 130,
        },
        scaleLabel: {
          display: true,
          labelString: 'Bénéfice',
        },
        // annotation: {
        //   annotations: [
            // {
            //   type: 'line',
            //   mode: 'horizontal',
            //   scaleID: 'Oil',
            //   value: '122',
            //   borderColor: 'orange',
            //   borderWidth: 50,
            //   label: {
            //     enabled: true,
            //     fontColor: 'orange',
            //     content: 'Caution - 122\u00b0F'
            //   }
            // },
            // {
            //   type: 'line',
            //   mode: 'horizontal',
            //   scaleID: 'Oil',
            //   value: '131',
            //   yAxisID: 'Oil',
            //   borderColor: 'red',
            //   borderWidth: 2,
            //   label: {
            //     enabled: true,
            //     fontColor: 'red',
            //     content: 'Warning - 131\u00b0F'
            //   }
            // },
            // {
            //   type: 'box',
            //   yScaleID: 'Oil',
            //   yMin: 104,
            //   yMax: 120.2,
            //   backgroundColor: 'rgba(0,255,0,0.15)',
            //   borderColor: 'rgba(0,255,0,0.05)',
            //   borderWidth: 0,
            // },
            // {
            //   type: 'box',
            //   yScaleID: 'Water',
            //   yMin: 9,
            //   yMax: 12,
            //   backgroundColor: 'rgba(70,70,255,0.15)',
            //   borderColor: 'rgba(70,70,255,0.05)',
            //   borderWidth: 0,
            // },
        //   ]
        // }
      }]
    },
  };
  lineChartColors: Color[] = [
    {
      // borderColor: 'black',
      backgroundColor: 'rgba(255,150,100,0.70)',
    },
  ];
  public barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55], label: 'Poissons',  fontColor: 'blue'  },
    {data: [28, 48, 40, 19, 86, 27,65, 40, 19, 86, 27,65], label: 'Crustacés'}
  ];


}



  // const labels = ["boop"]
//  data = {
//   labels: ["boop"],
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(255, 159, 64, 0.2)',
//       'rgba(255, 205, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(201, 203, 207, 0.2)'
//     ],
//     borderColor: [
//       'rgb(255, 99, 132)',
//       'rgb(255, 159, 64)',
//       'rgb(255, 205, 86)',
//       'rgb(75, 192, 192)',
//       'rgb(54, 162, 235)',
//       'rgb(153, 102, 255)',
//       'rgb(201, 203, 207)'
//     ],
//     borderWidth: 1
//   }]
// };

// }







//   barChartOptions: ChartOptions = {
//     responsive: true,
//   };
//   barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
//   barChartType: ChartType = 'bar';
//   barChartLegend = true;
//   barChartPlugins = [];
 
//   barChartData: ChartDataSets[] = [
//     { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
//   ];
 
// }

//   canvas:any; ctx:any; canvas2:any; ctx2:any; canvas3:any; ctx3:any;
// ...
// ngOnInit(){
// ...
// this.canvas = document.getElementById('myChart');
// this.canvas2 = document.getElementById('myChart2');
// this.canvas3 = document.getElementById('myChart3');
// this.ctx = this.canvas.getContext('2d');
// this.ctx2 = this.canvas2.getContext('2d');
//   this.ctx3 = this.canvas3.getContext('2d');

//     let myChart = new Chart(this.ctx, {
//       type: 'bar',
//       data: {
//           labels: ["Angular 11", "Angular 10", "Angular 9"],
//           datasets: [{
//               label: 'Active Angular Vesrions',
//               data: [85, 100, 60],
//               backgroundColor: ["red","blue", "orange"],
//               borderWidth: 1
//           }]
//       },
//       options: {
//     legend: {
//         display: true
//     },
//         responsive: true,
//         display:true,
//     scales: {
//         yAxes: [{
//             ticks: {
//                 beginAtZero: true
//             }
//         }]
//     }
//       }
//     });
  
//   let myChart2 = new Chart(this.ctx2, {
//       type: 'pie',
//       data: {
//           labels: ["Angular 11", "Angular 10", "Angular 9"],
//           datasets: [{
//               label: 'Active Angular Vesrions',
//               data: [85, 100, 60],
//               backgroundColor: ["red","blue", "orange"],
//               borderWidth: 1
//           }]
//       },
//       options: {
//     legend: {
//         display: true
//     },
//         responsive: true,
//         display:true,
//     scales: {
//         yAxes: [{
//             ticks: {
//                 beginAtZero: true
//             }
//         }]
//     }
//       }
//     });
  
//   let myChart3 = new Chart(this.ctx3, {
//       type: 'line',
//       data: {
//           labels: ["Angular 11", "Angular 10", "Angular 9"],
//           datasets: [{
//               label: 'Active Angular Vesrions',
//               data: [85, 100, 60],
//               backgroundColor: ["red","blue", "orange"],
//               borderWidth: 1
//           }]
//       },
//       options: {
//     legend: {
//         display: true
//     },
//         responsive: true,
//         display:true,
//     scales: {
//         yAxes: [{
//             ticks: {
//                 beginAtZero: true
//             }
//         }]
//     }
//       }
//     });
// }
// }
//   title = 'angular8chartjs';
//   canvas: any;
//   ctx: any;
//   ngAfterViewInit() {


//     const boop = {
//       labels: ["J","F","M"],
//       datasets: [{
//         label: 'profits mois',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 205, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(201, 203, 207, 0.2)'
//         ],
//         borderColor: [
//           'rgb(255, 99, 132)',
//           'rgb(255, 159, 64)',
//           'rgb(255, 205, 86)',
//           'rgb(75, 192, 192)',
//           'rgb(54, 162, 235)',
//           'rgb(153, 102, 255)',
//           'rgb(201, 203, 207)'
//         ],
//         borderWidth: 1
//       }]
//     };

//     const config = {
//       type: 'bar',
//       data: boop,
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       },
//     };

    
//     this.canvas = document.getElementById('myChart');
//     this.ctx = this.canvas.getContext('2d');
//     let myChart = new Chart(this.ctx, {
//       type: 'bar',
//       data: boop,
//       options: {
//         responsive: false,
        
//       }
      
//     });
//   }
// }