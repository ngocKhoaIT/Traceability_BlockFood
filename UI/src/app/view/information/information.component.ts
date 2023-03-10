import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { Ndef, NFC } from '@ionic-native/nfc/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  constructor(public platform: Platform,
    private nfc: NFC,
    private ndef: Ndef) {

    }

  ngOnInit(): void {
  }

  photoPath = environment.photoUrl

  item1 : string = this.photoPath + 'nongtrai.jfif'
  item2 : string = this.photoPath + 'nhamay.jfif'
  item3 : string = this.photoPath + 'cuahang.jfif'

  addListenNFC() {
    this.platform
    console.log('entra a addListenNFC');

    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    });

  }
}
