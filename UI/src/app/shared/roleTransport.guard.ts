import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleTransportGuard implements CanActivate {
    canActivate(
    ) {
        if (this.auth.TransportAccess())
            return true;
        else {
            return false
        }
    }
    constructor(private auth: AuthService, private route: Router) {
    }
}
