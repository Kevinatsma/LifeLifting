import { Component, OnInit, Input } from '@angular/core';
import { Specialist } from '../specialist.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecialistService } from '../specialist.service';

@Component({
  selector: 'app-edit-specialist',
  templateUrl: './edit-specialist.component.html',
  styleUrls: ['./edit-specialist.component.scss']
})
export class EditSpecialistComponent implements OnInit {
  @Input() specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;
  editSpecialistForm: FormGroup;
  selectedTimeZone = '';

  // Form

  constructor( private fb: FormBuilder,
               private specialistService: SpecialistService) {

               }

  ngOnInit() {
    this.editSpecialistForm = this.fb.group({
      firstName: '' || this.specialist.firstName,
      lastName: '' || this.specialist.lastName,
      speciality: '' || this.specialist.speciality,
      timeZone: '' || this.specialist.timeZone,
      patientsTotal: '' || this.specialist.patientsTotal,
      yearsOfExperience: '' || this.specialist.yearsOfExperience,
      description:  '' || this.specialist.description,
      email:  '' || this.specialist.email,
      phoneNumber:  '' || this.specialist.phoneNumber,
    });
  }

}
