import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MiniCollectionComponent } from './mini-collection.component';

describe('MiniCollectionComponent', () => {
  let component: MiniCollectionComponent;
  let fixture: ComponentFixture<MiniCollectionComponent>;

  beforeEach(waitForAsync(() => {
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
