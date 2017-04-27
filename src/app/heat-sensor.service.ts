import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Injectable()
export class HeatSensorService {
  constructor(public ble: BluetoothCore) { }

  getTemperature() {
    return this.ble.discover$({
      filters: [{ services: ['environmental_sensing'] }]
    })
    .switchMap(gatt => gatt.connect())
    .switchMap(gatt => 
      this.ble.getPrimaryService$(gatt, 'environmental_sensing')
        .switchMap(service => this.ble.getCharacteristic$(service, 'temperature'))
        .switchMap(char => this.ble.observeValue$(char))
        .map(value => value.getUint16(0, true) / 100.)
    );
  }
}
