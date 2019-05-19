import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-to-face-appointment',
  templateUrl: './face-to-face-appointment.component.html',
  styleUrls: ['./face-to-face-appointment.component.scss']
})
export class FaceToFaceAppointmentComponent implements OnInit {

  faceToFaceForm: FormGroup;

  constructor( private fb: FormBuilder,
               private bookingService: BookingService,
               public router: Router
    ) {

  }

  ngOnInit() {
    this.faceToFaceForm = this.fb.group({
      faceToFacePhone: this.fb.group({
        'phoneAreaCode': [''] || null,
        'phoneRest': [''] || null,
      }),
      location: ['']
    });
  }

  addFaceToFace() {
    const data = {
      faceToFace: true,
      onlineAppointment: false,
      faceToFacePhone: this.faceToFaceForm.controls.faceToFacePhone.value,
      location: this.faceToFaceForm.get('location').value
    };
    this.bookingService.addEvent(data, null);
    this.router.navigate(['../step-five']);
  }

}
