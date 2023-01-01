import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-static-farm',
  templateUrl: './static-farm.component.html',
  styleUrls: ['./static-farm.component.scss']
})
export class StaticFarmComponent implements OnInit {

  constructor(public loadService: LoaderService) { }

  ngOnInit(): void {
  }

}
