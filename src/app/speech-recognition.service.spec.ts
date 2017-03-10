import { TestBed, inject } from '@angular/core/testing';

import { SpeechRecognitionService } from './speech-recognition.service';

describe('SpeechRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeechRecognitionService]
    });
  });

  it('should ...', inject([SpeechRecognitionService], (service: SpeechRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
