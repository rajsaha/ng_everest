import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewResourceComponent } from './view-resource.component';

describe('ViewResourceComponent', () => {
  let component: ViewResourceComponent;
  let fixture: ComponentFixture<ViewResourceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
