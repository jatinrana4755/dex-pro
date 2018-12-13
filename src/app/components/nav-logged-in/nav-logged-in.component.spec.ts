import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLoggedInComponent } from './nav-logged-in.component';

describe('NavBarComponent', () => {
  let component: NavLoggedInComponent;
  let fixture: ComponentFixture<NavLoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
