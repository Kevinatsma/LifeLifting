import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PackageService } from './../../../packages/package.service';
import { Observable } from 'rxjs';
import { Package } from './../../../packages/package.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-signup-step-two',
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss', './../signup-step-one/signup-steps.scss']
})
export class SignupStepTwoComponent implements OnInit {

  // Package import and choice
  packages: Observable<Package[]>;
  packageCol: AngularFirestoreCollection;
  chosenPackage: string;


  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    private afs: AngularFirestore,
    public router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService
  ) {

  }

  ngOnInit() {
    this.packages = this.packageService.getPackages();
    this.chosenPackage = null;
  }

  updateUser(user) {
    const data = {
      packageChoice: this.chosenPackage
    };
    this.auth.setUserData(data, user)
    .then(() => {
      this.router.navigate(['../step-three'], { relativeTo: this.route });
    });
  }

}
