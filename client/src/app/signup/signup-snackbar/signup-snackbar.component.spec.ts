import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSnackbarComponent } from './signup-snackbar.component';

describe('SignupSnackbarComponent', () => {
  let component: SignupSnackbarComponent;
  let fixture: ComponentFixture<SignupSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
