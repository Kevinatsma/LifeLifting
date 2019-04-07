import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from './../../../../booking/appointment.model';
import { User } from './../../../../user/user.model';
import { Specialist } from './../../../../specialists/specialist.model';
import { BookingService } from './../../../../booking/booking.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserService } from './../../../../user/user.service';
import { SpecialistService } from './../../../../specialists/specialist.service';
import { AuthService } from './../../../../core/auth/auth.service';
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss', './../appointment-detail-dialog.component.scss']
})
export class EditAppointmentComponent implements OnInit {
  @Input() client: User;
  @Input() specialist: Specialist;
  @Input() event: Appointment;
  @Input() start: Object;
  @Input() end: Object;

  clients: User[];
  specialists: Specialist[];

  editAppointmentForm: FormGroup;
  phoneAreaCode = new FormControl({value: '+51', disabled: true});
  selectedContext = '';

  faceToFace = false;
  onlineAppointment = false;
  whatsApp = false;
  skype = false;
  onlinePhone = false;

  constructor( public auth: AuthService,
               private bookingService: BookingService,
               private userService: UserService,
               private specialistService: SpecialistService ,
               private fb: FormBuilder,
               public dialog: MatDialog
              ) {
              }

  ngOnInit() {
    this.editAppointmentForm = this.fb.group ({
      title: [''],
      clientID: [''],
      startDate: ['', Validators.required],
      startHour: ['', Validators.required],
      startMinutes: ['', Validators.required],
      endDate: ['', Validators.required],
      endHour: ['', Validators.required],
      endMinutes: ['', Validators.required],
      specialistID: [''],
      colorPrimary: [''],
      colorSecondary: [''],
      faceToFacePhone: this.fb.group({
        'phoneAreaCode': [''],
        'phoneRest': [''],
      }),
      onlinePhone: this.fb.group({
        phoneAreaCode: [`${this.phoneAreaCode.value}`],
        'phoneRest': [''],
      }),
      appointmentContext: [''],
      contactMethod: [''],
      location: [''],
      wappNumber: [''],
      skypeName: ['']
    });

    // this.editAppointmentForm.controls.onlinePhone.get('phoneAreaCode').disable();

    this.getClients();
    this.getSpecialists();
    this.initialContext();
    this.initialMethod();
  }

  editAppointment() {
    let end: string;
    let start: string;

    if (this.editAppointmentForm.get('startDate').dirty ) {
      const startNoTime = new Date(this.editAppointmentForm.get('startDate').value).toString();
      start = startNoTime
      .replace('00:00:00',
      `${this.editAppointmentForm.get('startHour').value}` + ':' + `${this.editAppointmentForm.get('startMinutes').value}` + ':00');
    }

    if (this.editAppointmentForm.get('endDate').dirty) {
      const endNoTime = new Date(this.editAppointmentForm.get('endDate').value).toString();
      end = endNoTime
      .replace('00:00:00',
      `${this.editAppointmentForm.get('endHour').value}` + ':' + `${this.editAppointmentForm.get('endMinutes').value}` + ':00');
    }

    this.constructAndSend(end, start);
  }

  constructAndSend(end, start) {
    const data: Appointment = {
      title:  this.editAppointmentForm.get('title').value || this.event.title,
      clientID: this.editAppointmentForm.get('clientID').value || this.event.clientID,
      specialistID: this.editAppointmentForm.get('specialistID').value || this.event.specialistID,
      start: start || new Date(this.event.start).toString(),
      end: end || new Date(this.event.end).toString(),
      color: {
        primary: this.editAppointmentForm.get('colorPrimary').value || this.event.color.primary,
        secondary: this.editAppointmentForm.get('colorSecondary').value || this.event.color.secondary,
      },
      meetMethod: this.selectedContext || this.event.meetMethod,
      contactMethod: this.editAppointmentForm.get('contactMethod').value || this.event.contactMethod || null,
      faceToFacePhone: this.editAppointmentForm.controls.faceToFacePhone.value || this.event.faceToFacePhone,
      location: this.editAppointmentForm.get('location').value || this.event.location || null,
      onlineAppointmentPhone: this.editAppointmentForm.controls.onlinePhone.value || this.event.onlineAppointmentPhone || null,
      whatsappNumber: this.editAppointmentForm.get('wappNumber').value || this.event.whatsappNumber || null,
      skypeName: this.editAppointmentForm.get('skypeName').value || this.event.skypeName || null,
    };
    const id = this.event.eventID;

    // Update event
    this.bookingService.updateEvent(id, data);
    this.bookingService.toggleEdit();

    // Close dialog after updating
    setTimeout(() => {
      this.dialog.closeAll();
    }, 500);
  }

  // Getters

  get editShow(): boolean {
    return this.bookingService.editShow;
  }

  getClients() {
    this.userService.getUsers().subscribe(users => this.clients = users);
  }

  getSpecialists() {
    this.specialistService.getSpecialists().subscribe(specialists => this.specialists = specialists);
  }

  // Controls

  initialContext() {
    if (this.event.meetMethod === 'faceToFace') {
      this.onlineAppointment = false;
      this.faceToFace = true;
    } else {
      this.faceToFace = false;
      this.onlineAppointment = true;
    }
  }

  toggleContext() {
    const formValue = this.editAppointmentForm.get('appointmentContext').value;
    if (formValue === 'faceToFace') {
      this.onlineAppointment = false;
      this.faceToFace = true;
    } else {
      this.faceToFace = false;
      this.onlineAppointment = true;
    }
  }

  // TODO
  initialMethod() {
    if (this.event.whatsappNumber !== null) {
      this.whatsApp = true;
      this.skype = false;
      this.onlinePhone = false;
    } else if (this.event.skypeName  !== null) {
      this.whatsApp = false;
      this.skype = true;
      this.onlinePhone = false;
    } else if (this.event.location !==  null) {
      this.whatsApp = false;
      this.skype = false;
      this.onlinePhone = true;
    }
  }

  toggleContactMethod() {
    const formValue = this.editAppointmentForm.get('contactMethod').value;

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

  back() {
    this.bookingService.toggleEdit();
  }

}
