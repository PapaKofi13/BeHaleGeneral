import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCentersComponent } from './health-centers.component';

describe('HealthCentersComponent', () => {
  let component: HealthCentersComponent;
  let fixture: ComponentFixture<HealthCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
