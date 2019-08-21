import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPostComponent } from './loading.component';

describe('LoadingPostComponent', () => {
  let component: LoadingPostComponent;
  let fixture: ComponentFixture<LoadingPostComponent>;

  beforeEach(async(() => {
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
