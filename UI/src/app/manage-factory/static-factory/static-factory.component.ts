import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-static-factory',
  templateUrl: './static-factory.component.html',
  styleUrls: ['./static-factory.component.scss']
})
export class StaticFactoryComponent implements OnInit {

  constructor(public loadService: LoaderService) { }

  ngOnInit(): void {
  }

}
