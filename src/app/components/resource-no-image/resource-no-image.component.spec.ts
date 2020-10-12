import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceNoImageComponent } from './resource-no-image.component';

describe('ResourceNoImageComponent', () => {
  let component: ResourceNoImageComponent;
  let fixture: ComponentFixture<ResourceNoImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceNoImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceNoImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
