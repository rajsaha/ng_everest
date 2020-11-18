import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResourceOptionsComponent } from './resource-options.component';

describe('ResourceOptionsComponent', () => {
  let component: ResourceOptionsComponent;
  let fixture: ComponentFixture<ResourceOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
