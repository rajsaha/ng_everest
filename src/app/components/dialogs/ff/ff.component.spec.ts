import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FfComponent } from './ff.component';

describe('FfComponent', () => {
  let component: FfComponent;
  let fixture: ComponentFixture<FfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
