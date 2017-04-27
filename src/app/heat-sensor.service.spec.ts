import { TestBed, inject } from '@angular/core/testing';

import { HeatSensorService } from './heat-sensor.service';

describe('HeatSensorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeatSensorService]
    });
  });

  it('should ...', inject([HeatSensorService], (service: HeatSensorService) => {
    expect(service).toBeTruthy();
  }));
});
