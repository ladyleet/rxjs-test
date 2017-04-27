import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
  
@Injectable()
export class LedServiceService {
  connectLed() {
    return this.ble.discover$({
      filters: [{ services: [0xBCDE] }]
    })
  .switchMap(gatt => gatt.connect())
  .switchMap(gatt => 
      this.ble.getPrimaryService$(gatt, 0xBCDE))
        .switchMap(service => this.ble.getCharacteristic$(service, 0xABCD))
        .subscribe( characteristic => characteristic.writeValue(
          new Int8Array([0])
        ))
  }
  constructor(public ble: BluetoothCore) { }
}