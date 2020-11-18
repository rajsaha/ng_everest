import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AtcComponent } from './atc.component';

describe('AtcComponent', () => {
  let component: AtcComponent;
  let fixture: ComponentFixture<AtcComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
