import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DcComponent } from './dc.component';

describe('DcComponent', () => {
  let component: DcComponent;
  let fixture: ComponentFixture<DcComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
