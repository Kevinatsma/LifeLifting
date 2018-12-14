import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SpecialistService } from 'src/app/specialists/specialist.service';
import { Observable } from 'rxjs';
import { Specialist } from 'src/app/specialists/specialist.model';

@Component({
  selector: 'app-signup-step-four',
  templateUrl: './signup-step-four.component.html',
  styleUrls: ['./signup-step-four.component.scss', './../signup-step-one/signup-steps.scss']
})
export class SignupStepFourComponent implements OnInit {
  specialists: Observable<Specialist[]>;


  constructor( public auth: AuthService,
               public specialistService: SpecialistService
               ) { }

  ngOnInit() {
    this.specialists = this.specialistService.getSpecialists();
  }

}
