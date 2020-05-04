import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingTableComponent } from './tracking-table.component';

describe('TrackingTableComponent', () => {
  let component: TrackingTableComponent;
  let fixture: ComponentFixture<TrackingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
