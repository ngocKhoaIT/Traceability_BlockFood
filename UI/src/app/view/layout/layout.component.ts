import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagelayout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutPageComponent implements OnInit {
  photoPath: string = environment.photoUrl
  logo: string = this.photoPath + "logo.png"
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    var hamburger = this.elRef.nativeElement.querySelector('.header .nav-bar .nav-list .hamburger');
    var menubar = this.elRef.nativeElement.querySelector('.header .nav-bar .nav-list ul');
    var menuitem = this.elRef.nativeElement.querySelector('.header .nav-bar .nav-list ul a')
    var header = this.elRef.nativeElement.querySelector('.header .container');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menubar.classList.toggle('active');
    });

    // document.addEventListener('scroll', () => {
    //   var scroll_position = window.screenY;
    //   if (scroll_position > 250) {
    //     header.style.backgroundColor = "#7cf01d";
    //   } else {
    //     header.style.backgroundColor = "transparent";
    //   }
    // })

    menuitem.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menubar.classList.toggle('active');
      })
  }
}
