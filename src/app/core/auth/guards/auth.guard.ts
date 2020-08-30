import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from './../../../user/user.model';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userDoc: AngularFirestoreDocument<User>;
  user: User;

  constructor( private auth: AuthService,
               private router: Router,
               private snackBar: MatSnackBar,
              ) {
              }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('can activate', this.auth);
      if (!this.auth.authenticated) {
        console.log(`⛔ Access denied`);
        this.router.navigate(['/signup']);
        return false;
      }
    return true;
  }
}
