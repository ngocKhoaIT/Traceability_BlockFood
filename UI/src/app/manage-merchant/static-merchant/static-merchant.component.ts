import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-static-merchant',
  templateUrl: './static-merchant.component.html',
  styleUrls: ['./static-merchant.component.scss']
})
export class StaticMerchantComponent implements OnInit {

  constructor(public loadService: LoaderService) { }

  ngOnInit(): void {
  }

}
