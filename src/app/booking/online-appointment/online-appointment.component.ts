import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { BookingService } from '../booking.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-online-appointment',
  templateUrl: './online-appointment.component.html',
  styleUrls: ['./online-appointment.component.scss']
})
export class OnlineAppointmentComponent implements OnInit {
  @Input() user: User;
  onlineAppointmentForm: FormGroup;
  phoneNumber: FormGroup;
  whatsappNumber: FormGroup;

  // Gender options
  callMethods = [
    {value: 'skype', viewValue: 'Skype'},
    {value: 'whatsapp', viewValue: 'Whatsapp'},
    {value: 'phonecall', viewValue: 'Phone call (Peru only)'}
  ]; selectedCallMethod: string;

  // FormControl
  phoneAreaCode = new FormControl('+51', [Validators.required, Validators.maxLength(3)]);
  phoneRest = new FormControl('', [Validators.required, Validators.minLength(8)]);
  wappAreaCode = new FormControl('', Validators.required);
  wappRest = new FormControl('', [Validators.required, Validators.minLength(8)]);
  skypeName = new FormControl('');

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public bookingService: BookingService,
    public router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.onlineAppointmentForm = this.fb.group({
      'callMethod': [''],
      'contactInfo': [''],
      phoneNumber: this.fb.group({
        'phoneAreaCode': [{value: '+51', disabled: true}],
        'phoneRest': [''],
      }),
      whatsappNumber: this.fb.group({
        'wappAreaCode': [''],
        'wappRest': [''],
      }),
      'skypeName': ['']
    });
  }

  pickForm(selectedCallMethod: string) {
    if (selectedCallMethod === 'skype') {
      this.onlineAppointmentForm['controls'].skypeName.reset();
    } else if (selectedCallMethod === 'whatsapp') {
        this.onlineAppointmentForm['controls'].whatsappNumber.reset();
    } else if (selectedCallMethod === 'phonecall') {
        this.onlineAppointmentForm['controls'].phoneNumber.reset();
    }
  }

  addAppointment() {
    const user =  this.user;
    const whatsappNumber = this.onlineAppointmentForm['controls'].whatsappNumber.get('wappAreaCode').value +
    this.onlineAppointmentForm['controls'].whatsappNumber.get('wappRest').value;

    const data = {
        callMethod: this.selectedCallMethod,
        contactDetails: this.onlineAppointmentForm['controls'].phoneNumber.get('phoneRest').value ||
                        whatsappNumber ||
                        this.onlineAppointmentForm.get('skypeName').value,
        date: '12-12-2018'
    };
    const appointmentCheck = {
      appointment: true
    };
    const path = `users/${this.auth.currentUserId}/appointments`;
    this.bookingService.addAppointment(data, path, user);
    this.auth.updateUser(appointmentCheck, user);
    this.router.navigate(['../step-four'], { relativeTo: this.route });
  }
}
