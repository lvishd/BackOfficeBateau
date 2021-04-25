import { Component, OnInit } from "@angular/core";
import { ChartType, ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { ChartsModule, ThemeService } from "ng2-charts";

import { UserService } from "../_services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  data;
  annees;
  mois;
  sommeVenteMois = [];
  sommeVenteJour = [];
  labels = [];
  bool;

  constructor(public productsService: UserService) {
    this.bool = false;
  }

  ngOnInit() {
    this.getSales();
  }

  changeGraphAnnee() {
    this.bool = true;
  }

  changeGraphSemaine() {
    this.bool = false;
  }

  getSales() {
    this.productsService.getSales().subscribe(
      (res) => {
        console.log(res);

        this.data = res;

        this.parseDataWeek();
        this.parseDataYear();
      },
      (err) => {
        alert("failed loading json data");
      }
    );
  }

  parseDataYear() {
    for (let i = 0; i < 12; i++) {
      this.sommeVenteMois[i] = 0;
    }
    for (let i = 0; i < this.data.length; i++) {
      this.sommeVenteMois[this.data[i].mois - 1] += this.data[i].price;
    }
    for (let i = 0; i < this.sommeVenteMois.length; i++) {
      console.log("somme vente pour mois", i + 1, " ", this.sommeVenteMois[i]);
    }
  }

  parseDataWeek() {
    for (let i = 0; i < 7; i++) {
      this.sommeVenteJour[i] = 0;
    }

    for (let i = 0; i < this.data.length; i++) {
      this.sommeVenteJour[this.data[i].dow - 1] += this.data[i].price;
    }
    for (let i = 0; i < this.sommeVenteJour.length; i++) {
      console.log("somme vente pour jour", i + 1, " ", this.sommeVenteJour[i]);
    }
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          id: "Oil",
          type: "linear",
          ticks: {
            min: 0,
            max: 130,
          },
          scaleLabel: {
            display: true,
            labelString: "Euros",
          },
        },
      ],
    },
  };
  lineChartColors: Color[] = [
    {
      backgroundColor: "#1a93ad",
    },
  ];
  public barChartLabelsYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  public barChartLabelsWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  public barChartType = "bar";
  public barChartLegend = true;

  public barChartDataYear = [
    {
      data: this.sommeVenteMois,
      label: "Bénéfices de Vente Année",
    },
  ];
  public barChartDataWeek = [
    {
      data: this.sommeVenteJour,
      label: "Bénéfices de Vente Semaine",
    },
  ];
}
