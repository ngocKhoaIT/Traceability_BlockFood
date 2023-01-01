import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-static-store',
  templateUrl: './static-store.component.html',
  styleUrls: ['./static-store.component.scss']
})
export class StaticStoreComponent implements OnInit {

  constructor(public loadService: LoaderService) { }

  ngOnInit(): void {
  }

}
