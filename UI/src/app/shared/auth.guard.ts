import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate()
    {
      if (this.auth.IsLoggedIn()) {
        return true;
      }
      else {
        this.route.navigateByUrl('login')
        return false
      }
  }

  constructor(private auth: AuthService, private route: Router){

  }
  
}
