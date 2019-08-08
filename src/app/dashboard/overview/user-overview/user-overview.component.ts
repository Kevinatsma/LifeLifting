import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../../user/user.model';
import { Subscription } from 'rxjs';
import { Specialist } from './../../../specialists/specialist.model';
import { SpecialistService } from './../../../specialists/specialist.service';
import { GuidelineService } from './../../../guidelines/guideline.service';
import { Guideline } from './../../../guidelines/guideline.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { ChatThreadService } from './../../../chat/chat-thread.service';
import { DashboardService } from '../../dashboard.service';
import { BookingService } from './../../../booking/booking.service';
import { Appointment } from './../../../booking/appointment.model';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, OnDestroy {
  @Input() user: User;
  specialist$: Subscription;
  specialist: Specialist;
  guideline$: Subscription;
  guideline: Guideline;
  idealBMI: number;
  mealplan$: Subscription;
  mealplan: Mealplan;
  mealplans: Mealplan[];
  lastConsultation$: Subscription;
  lastConsultation: Appointment;
  appointments: Appointment[];

  constructor( private router: Router,
               private route: ActivatedRoute,
               private specialistService: SpecialistService,
               private guidelineService: GuidelineService,
               private threadService: ChatThreadService,
               private afs: AngularFirestore,
               private dashboardService: DashboardService,
               private utils: UtilService,
               private bookingService: BookingService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getData();
    });
  }

  ngOnDestroy() {
    this.specialist$.unsubscribe();
    if (this.guideline$ !== undefined) {
      this.guideline$.unsubscribe();
    }
    if (this.lastConsultation$ !== undefined) {
      this.lastConsultation$.unsubscribe();
    }
  }

  // Getters
  getData() {
    // Get specialist
    const specialistID = this.user.specialist;
    this.specialist$ = this.specialistService.getSpecialistData(specialistID).subscribe(specialist => {
      this.specialist = specialist;
    });

    // Get rest of the data
    this.getMealplans();
    this.getAppointments();
  }

  getMealplans() {
    const mealplanCol = this.afs.collection<Mealplan>('mealplans', ref =>
      ref.orderBy('lastEdited', 'desc')
      .orderBy('creationDate', 'desc')
      .limit(3));

    this.mealplan$ = mealplanCol.valueChanges().subscribe(mealplans => {
      this.mealplans = mealplans;

      const myMealplans: Mealplan[] = mealplans.filter(obj =>  obj.clientID === this.user.uid );
      this.mealplan = myMealplans[0];

      if (this.mealplan !== undefined) {
        const gID = this.mealplan.supplementation.guideline;
        this.getGuideline(gID);
        if (this.user.formulas) {
          const weight = this.user.currentWeight;
          const height = this.user.formulas.height;
          this.idealBMI = this.utils.calculateBMI(weight, height);
        }
      }
    });
  }

  getAppointments() {
    const eventCol = this.afs.collection<Mealplan>('appointments', ref =>
      ref.where('clientID', '==', `${this.user.uid}`)
      .orderBy('created', 'desc'));

    this.lastConsultation$ = eventCol.valueChanges().subscribe(appointments => {
      this.appointments = appointments;
      this.lastConsultation = appointments[0];
    });
  }

  getGuideline(gID) {
    this.guideline$ = this.guidelineService.getGuidelineDataById(gID).subscribe(guideline => {
      this.guideline = guideline;
    });
  }

  // Button actions
  linkToMealplan() {
    const mID = this.mealplan.mID;
    const url = `dashboard/mealplans/${mID}`;
    this.router.navigate([url]);
  }

  linkToShoppingList() {
    const mID = this.mealplan.mID;
    const url = `dashboard/shopping-list/${mID}`;
    this.router.navigate([url]);
  }

  chatWithSpecialist() {
    const profileId = this.specialist.uid;
    return this.threadService.createThread(profileId);
  }

  async linkToCalendar() {
    await this.dashboardService.isSignUpCalendar$.next(true);
    this.router.navigate(['../my-calendar-client'], { relativeTo: this.route });
  }


}
