import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SendComponent } from '../base/send/send.component';
import { APIservicesService } from '../services/apiservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  photoPath: string = environment.photoUrl 
  logo: string = this.photoPath + "logo.png"
  farm: string = this.photoPath + "smart-farm.png"
  factory: string = this.photoPath + "factory.png"
  transport: string = this.photoPath + "transportation.png"
  merchant: string = this.photoPath + "merchant.png"
  store: string = this.photoPath + "shops.png"
  chart: string = this.photoPath + "pie-chart.png"
  user: string = this.photoPath + "user.png"
  login: string = this.photoPath + "farmer.png"
  notifications: string = this.photoPath + "bell.png"
  sended: string = this.photoPath + "mail.png"
  sending: string = this.photoPath + "send.png"
  checkout: string = this.photoPath + "check-out.png"
  infor: string = this.photoPath + "info.png"
  type: string = this.photoPath + "type_product.png"

  hidden = false;

  co = 0
  toggleBadgeVisibility() {
    this._router.navigateByUrl('/home/'+this.adminId+'/notice-receive/' + this.adminId)
  }

  openBottomSheet(id: string): void {
    const a = this._bottomSheet.open(SendComponent, {
      data: id
    });
  }

  constructor(private _router: Router, private route:ActivatedRoute,
    private apiService: APIservicesService, private _bottomSheet: MatBottomSheet) {
    this.adminName = ''
  }
  panelOpenState = false;

  adminName: string
  adminId: string = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.apiService.getIdUser(id)
          .subscribe({
            next: (re) => {
              this.adminId = id
              this.apiService.getIdPerson(re.represent)
              .subscribe({
                next: (re2) => {
                  this.adminName = re2.lastName + ' ' + re2.firstName
                  this.login = this.photoPath + re2.imagePerson
                  this.apiService.getAllReceiveIdRequest(id,'Đã gửi')
                  .subscribe({
                    next: (t) => {
                      if(t.length == 0){
                        this.hidden = true;
                      } 
                      this.co = t.length
                    }
                  });
                }
              });
            }
          })
        }
      },
    })
  }

  open = true
  changeOpen(){
    this.open = !this.open
  }

  toPage(page: string){
    this._router.navigateByUrl(page)
  }
}
