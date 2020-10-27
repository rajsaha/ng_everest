import { TestBed } from '@angular/core/testing';

import { CustomColorSchemeService } from './custom-color-scheme.service';

describe('CustomColorSchemeService', () => {
  let service: CustomColorSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomColorSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
