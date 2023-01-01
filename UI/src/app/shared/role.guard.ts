import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(
  ){
    if(this.auth.HaveAccess())
    return true;
    else {
      return false
    }
  }
  constructor(private auth: AuthService, private route: Router){
  }
}
