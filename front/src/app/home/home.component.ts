import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data;
  annees;
  mois;
  sommeVenteMois = [];
  sommeVenteJour = [];
  labels=[];
  bool

  constructor(public productsService: ProductsService) {
    this.bool=false
  }

  ngOnInit() {
    this.getSales();
    console.log(this.data);
    // this.parseDataYears();
  }

  changeGraphAnnee(){
    this.bool=true
    // console.log(this.bool)
  }

  changeGraphSemaine(){
    this.bool=false
    // console.log(this.bool)
  }

  getSales() {
    this.productsService.getSales().subscribe(
      (res) => {
        console.log(res);
        console.log(res[0].date[0].annee);

        this.data = res;

        this.parseDataWeek();
        this.parseDataYear();


        
      },
      (err) => {
        alert('failed loading json data');
      }
    );
  }

  parseDataYear() {
    for(let i = 0; i < 12; i++) {
      this.sommeVenteMois[i]=0
      // console.log(this.data[i])
      // console.log("this.sommeVenteMois: ",i+1,"  " ,this.sommeVenteMois[i])

    }
    for(let i = 0; i < this.data.length; i++) {
      // if(this.data[i].date[0].mois == i+1){
      this.sommeVenteMois[this.data[i].date[0].mois-1]+=this.data[i].prix
      // console.log("dans if")
      // console.log(this.data[i])
      // console.log(this.sommeVenteMois[i])
      // }

    }
    for(let i = 0; i < this.sommeVenteMois.length; i++) {
      console.log("somme vente pour mois",i+1," " , this.sommeVenteMois[i])
    }
  }

  parseDataWeek() {
    for(let i = 0; i < 7; i++) {
      this.sommeVenteJour[i]=0
      // console.log(this.data[i])
      // console.log("this.sommeVenteSemaine: ",i+1,"  " ,this.sommeVenteJour[i])


    }
    // console.log("boop",this.data[i].dow[0])

    for(let i = 0; i < this.data.length; i++) {
      // if(this.data[i].date[0].mois == i+1){
      this.sommeVenteJour[this.data[i].date[0].dow-1]+=this.data[i].prix
      // console.log("dans if")
      // console.log(this.data[i])
      // console.log(this.sommeVenteJour[i])
      // console.log(this.sommeVenteJour[i])
      // }

    }
    for(let i = 0; i < this.sommeVenteJour.length; i++) {
      console.log("somme vente pour jour",i+1," " , this.sommeVenteJour[i])
    }
  }

  





  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'Oil',
          type: 'linear',
          ticks: {
            min: 0,
            max: 130,
          },
          scaleLabel: {
            display: true,
            labelString: 'Euros',
          },
    
        },
      ],
    },
  };
  lineChartColors: Color[] = [
    {
      // borderColor: 'black',
      backgroundColor: '#1a93ad',
    },
  ];
  public barChartLabelsYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public barChartLabelsWeek = [
    'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
  ];
  public barChartType = 'bar';
  public barChartLegend = true;


  public barChartDataYear = [
    {
      data: this.sommeVenteMois,
      label: 'Bénéfices de Vente Année',
      // fontColor: 'blue',
    },

    // {
    //   data: [28, 48, 40, 19, 86, 27, 65, 40, 19, 86, 27, 65],
    //   label: 'Crustacés',
    // },
  ];
  public barChartDataWeek = [
    {
      data: this.sommeVenteJour,
      label: 'Bénéfices de Vente Semaine',
      // fontColor: 'blue',
    },

    // {
    //   data: [28, 48, 40, 19, 86, 27, 65, 40, 19, 86, 27, 65],
    //   label: 'Crustacés',
    // },
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
