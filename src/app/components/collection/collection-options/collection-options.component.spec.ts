import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollectionOptionsComponent } from './collection-options.component';

describe('CollectionOptionsComponent', () => {
  let component: CollectionOptionsComponent;
  let fixture: ComponentFixture<CollectionOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
