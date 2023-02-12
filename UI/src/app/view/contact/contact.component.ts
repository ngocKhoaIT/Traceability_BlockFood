import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  constructor(){

  }

  ngOnInit(): void {
    
  }

  cards : {icon: string, link: string}[] = [{icon: "https://cdn-icons-png.flaticon.com/128/1384/1384005.png", link : ""},
                                            {icon: "https://cdn-icons-png.flaticon.com/128/1384/1384012.png", link : ""},
                                            {icon: "https://cdn-icons-png.flaticon.com/128/25/25657.png", link : ""},
                                            {icon: "https://cdn-icons-png.flaticon.com/128/1384/1384015.png", link : ""},]

  facebook = "https://cdn-icons-png.flaticon.com/128/1384/1384005.png"
  youtube = "https://cdn-icons-png.flaticon.com/128/1384/1384012.png"
  github = "https://cdn-icons-png.flaticon.com/128/25/25657.png"
  instagram = "https://cdn-icons-png.flaticon.com/128/1384/1384015.png"
  // display : any
  // center: google.maps.LatLngLiteral = {lat: 24, lng:12}
  // center: google.maps.LatLngLiteral = {lat: 10.801494, lng:106.634774}
  // zoom =  4

  tenLH = ""
  hovalotLH = ""
  email = ""
  sdt = ""
  noidung = ""
}
