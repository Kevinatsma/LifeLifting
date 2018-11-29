import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PackageService } from 'src/app/packages/package.service';
import { Observable } from 'rxjs';
import { Package } from 'src/app/packages/package.model';

@Component({
  selector: 'app-signup-step-two',
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss', './../signup-step-one/signup-steps.scss']
})
export class SignupStepTwoComponent implements OnInit {

  // Gender options
  packages: Observable<Package[]>;
  chosenPackage: string;


  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService
  ) {

  }

  ngOnInit() {
    this.packageService.getPackages();
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
