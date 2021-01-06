import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShareResourceComponent } from './share-resource.component';

describe('ShareResourceComponent', () => {
  let component: ShareResourceComponent;
  let fixture: ComponentFixture<ShareResourceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
