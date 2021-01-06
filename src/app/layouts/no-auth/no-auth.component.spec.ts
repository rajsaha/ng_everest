import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoAuthComponent } from './no-auth.component';

describe('NoAuthComponent', () => {
  let component: NoAuthComponent;
  let fixture: ComponentFixture<NoAuthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
