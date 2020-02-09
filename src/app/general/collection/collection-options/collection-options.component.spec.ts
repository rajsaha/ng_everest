import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionOptionsComponent } from './collection-options.component';

describe('CollectionOptionsComponent', () => {
  let component: CollectionOptionsComponent;
  let fixture: ComponentFixture<CollectionOptionsComponent>;

  beforeEach(async(() => {
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
