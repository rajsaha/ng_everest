import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfComponent } from './ff.component';

describe('FfComponent', () => {
  let component: FfComponent;
  let fixture: ComponentFixture<FfComponent>;

  beforeEach(async(() => {
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
