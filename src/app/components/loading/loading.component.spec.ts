import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingPostComponent } from './loading.component';

describe('LoadingPostComponent', () => {
  let component: LoadingPostComponent;
  let fixture: ComponentFixture<LoadingPostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
