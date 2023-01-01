import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-static-transport',
  templateUrl: './static-transport.component.html',
  styleUrls: ['./static-transport.component.scss']
})
export class StaticTransportComponent implements OnInit {

  constructor(public loadService: LoaderService) { }

  ngOnInit(): void {
  }

}
