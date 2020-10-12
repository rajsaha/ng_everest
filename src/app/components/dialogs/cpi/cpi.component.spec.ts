import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpiComponent } from './cpi.component';

describe('CpiComponent', () => {
  let component: CpiComponent;
  let fixture: ComponentFixture<CpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
