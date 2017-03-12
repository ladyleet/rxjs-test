import { TestBed, inject } from '@angular/core/testing';

import { GoogleVisionService } from './google-vision.service';

describe('GoogleVisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleVisionService]
    });
  });

  it('should ...', inject([GoogleVisionService], (service: GoogleVisionService) => {
    expect(service).toBeTruthy();
  }));
});
