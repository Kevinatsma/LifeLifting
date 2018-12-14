import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SpecialistService } from 'src/app/specialists/specialist.service';
import { Observable } from 'rxjs';
import { Specialist } from 'src/app/specialists/specialist.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-step-four',
  templateUrl: './signup-step-four.component.html',
  styleUrls: [
    './signup-step-four.component.scss',
    './../signup-step-two/signup-step-two.component.scss',
    './../signup-step-one/signup-steps.scss']
})
export class SignupStepFourComponent implements OnInit {
  specialists: Observable<Specialist[]>;
  chosenSpecialist: string;
  backButton = false;


  constructor( public auth: AuthService,
               public specialistService: SpecialistService,
               public router: Router,
               private route: ActivatedRoute,
               ) { }

  ngOnInit() {
    this.specialists = this.specialistService.getSpecialists();
    this.chosenSpecialist = null;
  }

  updateUser(user) {
    const data = {
      packageChoice: this.chosenSpecialist
    };
    this.auth.setUserData(data, user)
    .then(() => {
      this.router.navigate(['../step-three'], { relativeTo: this.route });
    });
  }

  nextSpecialist() {
    if (this.backButton === false) {
      this.backButton = true;
    }
  }

}
