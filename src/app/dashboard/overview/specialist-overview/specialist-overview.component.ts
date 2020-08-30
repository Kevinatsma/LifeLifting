import { Component, OnInit, Input } from '@angular/core';
import { User } from './../../../user/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Appointment } from './../../../booking/appointment.model';
import { AppointmentDetailDialogComponent } from './../../../shared/dialogs/appointment-detail-dialog/appointment-detail-dialog.component';
import { MatDialog } from '@angular/material';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-specialist-overview',
  templateUrl: './specialist-overview.component.html',
  styleUrls: ['./specialist-overview.component.scss']
})
export class SpecialistOverviewComponent implements OnInit {
  @Input() user: User;
  myClients$: Subscription;
  clients: User[];
  consultations$: Subscription;
  pastAppointments: Appointment[];
  futureAppointments: Appointment[];
  unacceptedAppointments: Appointment[];

  constructor( private router: Router,
               private afs: AngularFirestore,
               private route: ActivatedRoute,
               public dialog: MatDialog,
               private utils: UtilService,
               private dashboardService: DashboardService) {
                 setTimeout(() => {
                  this.getData();
                 });
                }

  ngOnInit() {
  }

  getData() {
    this.getAppointments();
    this.getClients();
  }

  getAppointments() {
    const eventCol = this.afs.collection<Appointment>('appointments', ref =>
      ref.where('members', 'array-contains', `${this.user.uid}`)
      .orderBy('created', 'desc'));

    this.consultations$ = eventCol.valueChanges().subscribe(appointments => {
      const pastAppointments = appointments.filter(obj => new Date(obj.start).getTime() <= new Date().getTime());
      const futureAppointments = appointments.filter(obj => new Date(obj.start).getTime() > new Date().getTime());
      const futureAppointmentsSliced: Appointment[] = futureAppointments.slice(0, 3);

      this.futureAppointments = futureAppointmentsSliced.sort(this.utils.dynamicSort('start', 1));
      this.pastAppointments = pastAppointments.slice(0, 3);
      this.unacceptedAppointments = appointments.filter(obj => obj.accepted = false);
    });
  }

  getClients() {
      const specialistID = 'specialist'  + this.user.sID;
      const myClientsCol = this.afs.collection<User>('users', ref => ref.where('specialist', '==', `${specialistID}`).limit(4));
      const myClients = myClientsCol.valueChanges();
      this.myClients$ = myClients.subscribe(clients =>   {
        this.clients = clients;
      });
  }

  getString(input) {
    return input.match(/([A-Z]?[^A-Z]*)/g).join(' ');
  }

  linkToChat() {
    this.router.navigate(['../chat']);
  }

  openEventDetailDialog(event) {
    this.dialog.open(AppointmentDetailDialogComponent, {
      data: {
        event: event,
      },
      panelClass: 'event-detail-dialog'
    });
  }

  async linkToCalendar() {
    await this.dashboardService.isSignUpCalendar$.next(false);
    this.router.navigate(['../my-calendar'], { relativeTo: this.route });
  }

}
