import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'anychart';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AnyChartService {
  constructor(private http: Http) { }
  private dataSetChangeSource = new Subject<string>();

  // Observable string stream
  dataSetChanged$ = this.dataSetChangeSource.asObservable();

  private data_: Array<Object> = [
    {customName: 'Name1', customValue1: 10, customValue2: 12, customValue3: 7},
    {customName: 'Name2', customValue1: 14, customValue2: 10, customValue3: 17},
    {customName: 'Name3', customValue1: 21, customValue2: 4, customValue3: 15},
  ];

  private dataSet_: anychart.data.Set = anychart.data.set(this.data_);

  private mappings_: { [key: string]: anychart.data.View } = {
    'data1': this.dataSet_.mapAs({x: ['customName'], value: ['customValue1']}),
    'data2': this.dataSet_.mapAs({x: ['customName'], value: ['customValue2']}),
    'data3': this.dataSet_.mapAs({x: ['customName'], value: ['customValue3']})
  };


  public getDataList(){
    let res: Array<string> = [];
    for (let key in this.mappings_) {
      res.push(key);
    }
    return res;
  }

  public getData(key: string = 'data1') {
    return this.mappings_[key];
  }


  public setCurrentDataSet(key: string = 'data1') {
    this.dataSetChangeSource.next(key);
  }

      getAnyCharts(){
        return this.http.get(`http://104.237.156.106:8000/anychart?resolution=30`).pipe(
            map(res => res.json())
        );
    }
}