import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageResourcesComponent } from './manage-resources.component';

describe('ManageResourcesComponent', () => {
  let component: ManageResourcesComponent;
  let fixture: ComponentFixture<ManageResourcesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
