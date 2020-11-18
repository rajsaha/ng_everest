import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PoComponent } from './po.component';

describe('PoComponent', () => {
  let component: PoComponent;
  let fixture: ComponentFixture<PoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
