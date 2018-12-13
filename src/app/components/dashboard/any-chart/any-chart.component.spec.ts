import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyChartComponent } from './any-chart.component';

describe('AnyChartComponent', () => {
  let component: AnyChartComponent;
  let fixture: ComponentFixture<AnyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
