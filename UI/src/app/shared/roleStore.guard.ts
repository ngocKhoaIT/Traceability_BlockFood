import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleStoreGuard implements CanActivate {
    canActivate(
    ) {
        if (this.auth.StoreAccess())
            return true;
        else {
            return false
        }
    }
    constructor(private auth: AuthService, private route: Router) {
    }
}
