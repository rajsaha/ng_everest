import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResourceFromCollectionComponent } from './delete-resource-from-collection.component';

describe('DeleteResourceFromCollectionComponent', () => {
  let component: DeleteResourceFromCollectionComponent;
  let fixture: ComponentFixture<DeleteResourceFromCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteResourceFromCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteResourceFromCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
