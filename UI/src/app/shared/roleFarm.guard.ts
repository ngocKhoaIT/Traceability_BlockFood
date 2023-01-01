import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleFarmGuard implements CanActivate {
  canActivate(
  ){
    if(this.auth.FarmAccess())
    return true;
    else {
      return false
    }
  }
  constructor(private auth: AuthService, private route: Router){
  }
}
