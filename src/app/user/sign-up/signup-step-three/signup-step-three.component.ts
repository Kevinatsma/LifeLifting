import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { SpecialistService } from '../../../specialists/specialist.service';
import { Observable } from 'rxjs';
import { Specialist } from '../../../specialists/specialist.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: [
    './signup-step-three.component.scss',
    './../signup-step-two/signup-step-two.component.scss',
    './../signup-step-one/signup-steps.scss']
})
export class SignupStepThreeComponent implements OnInit {
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
      specialist: this.chosenSpecialist,
      isClient: true,
      isSpecialist: false,
    };
    this.auth.updateUser(data, user)
    .then(() => {
      const clientID = {
        clients: [
          user.uid
        ]
      };
      this.specialistService.updateSpecialist(this.chosenSpecialist, clientID);
    })
    .then(() => {
      this.router.navigate(['../step-four'], { relativeTo: this.route });
    });
  }

  nextSpecialist() {
    if (this.backButton === false) {
      this.backButton = true;
    }
  }

}
