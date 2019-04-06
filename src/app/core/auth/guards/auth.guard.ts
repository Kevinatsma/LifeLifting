import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from './../../../user/user.model';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserService } from './../../../user/user.service';
// import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userDoc: AngularFirestoreDocument<User>;
  user: User;

  constructor( private auth: AuthService,
               private router: Router,
              //  private snackBar: MatSnackBar
               private userService: UserService
              ) {
              }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.auth.authenticated) {
        console.log(`⛔ Access denied`);
        this.router.navigate(['/login']);
        // Show snackbar
        // this.snackBar.open('Woops.. Try again', 'Close', {
        //   duration: 3000,
        //   panelClass: ['success-snackbar']
        // });
        return false;
      }
      // } else if (this.user.basicData) {
      //   console.log('Missing Basic Data');
      //   this.router.navigate(['/signup/step-one']);
      //   // Show snackbar
      //   // this.snackBar.open('Woops.. Try again', 'Close', {
      //   //   duration: 3000,
      //   //   panelClass: ['success-snackbar']
      //   // });
      //   return false;
      // } else if (this.user.packageChoice) {
      //   console.log('Missing Package Choice');
      //   this.router.navigate(['/signup/step-two']);
      //   // Show snackbar
      //   // this.snackBar.open('Woops.. Try again', 'Close', {
      //   //   duration: 3000,
      //   //   panelClass: ['success-snackbar']
      //   // });
      //   return false;
      // }
    return true;
  }
}
