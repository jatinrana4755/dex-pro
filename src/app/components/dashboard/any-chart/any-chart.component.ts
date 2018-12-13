import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnyChartService } from '../../../providers/any-chart.service';
import { Subscription } from 'rxjs/Subscription';
import 'anychart';

@Component({
  selector: 'app-any-chart',
  templateUrl: './any-chart.component.html',
  styleUrls: ['./any-chart.component.css']
})
export class AnyChartComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  constructor(private dataService_: AnyChartService) {
    // this.subscription = this.dataService_.dataSetChanged$.subscribe(
    //   dataSet => this.chart.data(this.dataService_.getData(dataSet))
    // );
  }

  @ViewChild('chartContainer') container;

  chart: any;
  arr = [];
  mainArr = [];
  chartdata: any;
  table: any;
  mapping: any;
  series: any;
  ngOnInit() {
    // Default data set mapping, hardcoded here.
    this.getData();

    // this.chart = anychart.financial(this.dataService_.getData('data1'));
    // this.chart.interactivity('by-x');
    // this.chart.candlestick(data);
    //  this.chart.xAxis().title('Date');
    // this.chart.yAxis().title('Price, $');
  }
  getData() {
    this.dataService_.getAnyCharts().subscribe((res: any) => {
      this.chartdata = res;
      this.table = anychart.data.table('x');
      this.table.addData(this.chartdata);

      // map the data
      this.mapping = this.table.mapAs({ 'open': 'o', 'high': 'h', 'low': 'l', 'close': 'c' });
      this.chart = anychart.stock();

      // set the series
      this.series = this.chart.plot(0).candlestick(this.mapping);
      // this.series.name('ACME Corp. stock prices');
      // this.chart.title('Stock Candlestick Demo: ACME Corp. Stock prices \n(Object data notation)');
      this.chart.container(this.container.nativeElement);
      this.chart.draw();
    });
  }

  ngAfterViewInit() {

  }

}
