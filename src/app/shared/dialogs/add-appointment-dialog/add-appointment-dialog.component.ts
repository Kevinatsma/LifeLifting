import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from './../../../booking/booking.service';
import { Appointment } from './../../../booking/appointment.model';
import { User } from './../../../user/user.model';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss']
})
export class AddAppointmentDialogComponent implements OnInit {
  user: User;
  hide = true;
  faceToFace = false;
  onlineAppointment = false;
  appointmentForm: FormGroup;

  standardColorPrimary = '#db9969';
  standardColorSecondary = '#444444';

  whatsApp = false;
  skype = false;
  onlinePhone = false;

  constructor( private fb: FormBuilder,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private bookingService: BookingService
    ) {
      this.user =  data.user;
    }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      eventTitle: ['', Validators.required],
      selectedColorPrimary: [''],
      selectedColorSecondary: [''],
      startTime: ['', Validators.required],
      startHour: ['', Validators.required],
      startMinutes: ['', Validators.required],
      faceToFacePhone: this.fb.group({
        'phoneAreaCode': [''] || null,
        'phoneRest': [''] || null,
      }),
      onlinePhone: this.fb.group({
        'phoneAreaCode': [''] || null,
        'phoneRest': [''] || null,
      }),
      appointmentContext: [''],
      contactMethod: [''],
      location: [''],
      wappNumber: [''],
      skypeName: ['']
    });
  }

  // Toggles

  toggleContext() {
    const formValue = this.appointmentForm.get('appointmentContext').value;

    if (formValue === 'faceToFace') {
      this.onlineAppointment = false;
      this.faceToFace = true;
    } else {
      this.faceToFace = false;
      this.onlineAppointment = true;
    }
  }

  toggleContactMethod() {
    const formValue = this.appointmentForm.get('contactMethod').value;

    if (formValue === 'whatsApp') {
      this.whatsApp = true;
      this.skype = false;
      this.onlinePhone = false;
    } else if (formValue  === 'skype') {
      this.whatsApp = false;
      this.skype = true;
      this.onlinePhone = false;
    } else {
      this.whatsApp = false;
      this.skype = false;
      this.onlinePhone = true;
    }
  }

  // Getters

  get appointmentText() {
    return this.appointmentForm.get('appointmentText');
  }

  // Add Appointment
  addEvent(): void {
    const startNoTime = new Date(this.appointmentForm.get('startTime').value).toString();
    const endNoTime = new Date(this.appointmentForm.get('startTime').value).toString();
    const start = startNoTime
      .replace('00:00:00',
      `${this.appointmentForm.get('startHour').value}` + ':' + `${this.appointmentForm.get('startMinutes').value}` + ':00');
    const end = endNoTime
      .replace('00:00:00',
      `${this.appointmentForm.get('startHour').value + 1}` + ':' + `${this.appointmentForm.get('startMinutes').value}` + ':00');
    const data: Appointment = {
      title: this.appointmentForm.get('eventTitle').value,
      start: start,
      // start: new Date(),
      end: end,
      color: {
        primary: this.appointmentForm.get('selectedColorPrimary').value || '#db9969',
        secondary: this.appointmentForm.get('selectedColorSecondary').value ||  '#d6ad8f',
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      specialistID: this.user.specialist,
      clientID: this.user.uid,
      meetMethod: this.appointmentForm.get('appointmentContext').value,
      faceToFacePhone: this.appointmentForm.controls.faceToFacePhone.value || null,
      location: this.appointmentForm.get('location').value || null,
      whatsappNumber: this.appointmentForm.get('wappNumber').value || null,
      skypeName: this.appointmentForm.get('skypeName').value || null,
      onlineAppointmentPhone: this.appointmentForm.controls.onlinePhone.value || null
    };
    this.bookingService.addEvent(data);
    console.log(data);
  }
}
