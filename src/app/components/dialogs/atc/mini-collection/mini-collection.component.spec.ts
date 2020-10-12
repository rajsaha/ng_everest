import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCollectionComponent } from './mini-collection.component';

describe('MiniCollectionComponent', () => {
  let component: MiniCollectionComponent;
  let fixture: ComponentFixture<MiniCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
