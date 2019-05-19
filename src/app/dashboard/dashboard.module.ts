import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardTopNavComponent } from './dashboard-top-nav/dashboard-top-nav.component';
import { SpecialistsComponent } from '../specialists/specialists/specialists.component';
import { SpecialistModule } from '../specialists/specialist.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UserModule } from '../user/user.module';
import { UsersComponent } from '../user/users/users.component';
import { ClientsModule } from './../clients/clients.module';
import { ClientsComponent } from '../clients/clients.component';
import { UserRequestComponent } from '../requests/user-request/user-request.component';
import { RequestModule } from '../requests/request.module';
import { PackagesComponent } from '../packages/packages.component';
import { PackageDetailComponent } from '../packages/package-detail/package-detail.component';
import { AdminMenuComponent } from './dashboard-menu/admin-menu/admin-menu.component';
import { SpecialistMenuComponent } from './dashboard-menu/specialist-menu/specialist-menu.component';
import { ClientMenuComponent } from './dashboard-menu/client-menu/client-menu.component';
import { MiscMenuComponent } from './dashboard-menu/misc-menu/misc-menu.component';
import { SpecialistDetailComponent } from '../specialists/specialist-detail/specialist-detail.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailComponent } from '../user/users/user-detail/user-detail.component';
import { ClientDetailComponent } from '../clients/client-detail/client-detail.component';
import { FoodsModule } from './../foods/foods.module';
import { FoodsComponent } from './../foods/foods.component';
import { FoodDetailComponent } from './../foods/food-detail/food-detail.component';
import { AuthGuard } from '../core/auth/guards/auth.guard';
import { ExercisesComponent } from '../exercises/exercises.component';
import { ExerciseDetailComponent } from '../exercises/exercise-detail/exercise-detail.component';
import { ExercisesModule } from '../exercises/exercises.module';
import { MySpecialistComponent } from './client-dashboard/my-specialist/my-specialist.component';
import { MyClientsComponent } from './specialist-dashboard/my-clients/my-clients.component';
import { MyClientDetailComponent } from './specialist-dashboard/my-clients/my-client-detail/my-client-detail.component';
import { MyClientListComponent } from './specialist-dashboard/my-clients/my-client-list/my-client-list.component';
import { MyClientListItemComponent } from './specialist-dashboard/my-clients/my-client-list-item/my-client-list-item.component';
import { MyReviewsComponent } from './specialist-dashboard/my-reviews/my-reviews.component';
import { MyReviewListComponent } from './specialist-dashboard/my-reviews/my-review-list/my-review-list.component';
import { GuidelinesModule } from './../guidelines/guidelines.module';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { GuidelineDetailComponent } from '../guidelines/guideline-detail/guideline-detail.component';
import { MealplansComponent } from '../mealplans/mealplans.component';
import { MealplanDetailComponent } from '../mealplans/mealplan-detail/mealplan-detail.component';
import { MealplansModule } from '../mealplans/mealplans.module';
import { SharedModule } from '../shared/shared.module';
import { MyMealplanListComponent } from './client-dashboard/my-mealplan-list/my-mealplan-list.component';
import { MyGuidelineListComponent } from './client-dashboard/my-guideline-list/my-guideline-list.component';
import { BookingComponent } from './../booking/booking/booking.component';
import { MyCalendarComponent } from './specialist-dashboard/my-calendar/my-calendar.component';
import { MyCalendarClientComponent } from './client-dashboard/my-calendar-client/my-calendar-client.component';
import { DashboardService } from './dashboard.service';
import { ShoppingListDetailComponent } from '../shopping-list/shopping-list-detail.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: DashboardHomeComponent, data: {state: 'home'}},
      {path: 'users', component: UsersComponent, data: {state: 'users'}, canActivate: [AuthGuard]},
      {path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
      {path: 'specialists', component: SpecialistsComponent, data: {state: 'specialist'}, canActivate: [AuthGuard]},
      {path: 'specialists/:id', component: SpecialistDetailComponent, canActivate: [AuthGuard]},
      {path: 'clients', component: ClientsComponent, data: {state: 'clients'}, canActivate: [AuthGuard]},
      {path: 'clients/:id', component: ClientDetailComponent, canActivate: [AuthGuard]},
      {path: 'booking', component: BookingComponent, data: {state: 'booking'}, canActivate: [AuthGuard]},
      {path: 'my-specialist', component: MySpecialistComponent, data: {state: 'my-specialist'}, canActivate: [AuthGuard]},
      {path: 'my-clients', component: MyClientsComponent, data: {state: 'my-clients'}, canActivate: [AuthGuard]},
      {path: 'my-clients/:id', component: MyClientDetailComponent, canActivate: [AuthGuard]},
      {path: 'shopping-list/:id', component: ShoppingListDetailComponent, data: {state: 'shopping-list'}, canActivate: [AuthGuard]},
      {path: 'my-calendar', component: MyCalendarComponent, data: {state: 'my-calendar'}, canActivate: [AuthGuard]},
      {path: 'my-reviews', component: MyReviewsComponent, data: {state: 'reviews'}, canActivate: [AuthGuard]},
      {path: 'guidelines', component: GuidelinesComponent, data: {state: 'guidelines'}, canActivate: [AuthGuard]},
      {path: 'guidelines/:id', component: GuidelineDetailComponent, canActivate: [AuthGuard]},
      {path: 'mealplans', component: MealplansComponent, data: {state: 'mealplans'}, canActivate: [AuthGuard]},
      {path: 'mealplans/:id', component: MealplanDetailComponent, canActivate: [AuthGuard]},
      {path: 'my-guidelines', component: MyGuidelineListComponent, data: {state: 'my-guidelines'}, canActivate: [AuthGuard]},
      {path: 'my-mealplans', component: MyMealplanListComponent, data: {state: 'my-mealplans'}, canActivate: [AuthGuard]},
      {path: 'my-calendar-client', component: MyCalendarClientComponent, data: {state: 'my-calendar-client'}, canActivate: [AuthGuard]},
      // {path: 'my-mealplans/:id', component: MyMealplanDetailComponent, canActivate: [AuthGuard]},
      {path: 'user-requests', component: UserRequestComponent, data: {state: 'user-request'}, canActivate: [AuthGuard]},
      {path: 'packages', component: PackagesComponent, data: {state: 'packages'}, canActivate: [AuthGuard]},
      {path: 'packages/:id', component: PackageDetailComponent, canActivate: [AuthGuard]},
      {path: 'foods', component: FoodsComponent, data: {state: 'foods'}, canActivate: [AuthGuard]},
      {path: 'foods/:id', component: FoodDetailComponent, canActivate: [AuthGuard]},
      {path: 'exercises', component: ExercisesComponent, data: {state: 'exercises'}, canActivate: [AuthGuard]},
      {path: 'exercises/:id', component: ExerciseDetailComponent, canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardMenuComponent,
    DashboardTopNavComponent,
    AdminMenuComponent,
    SpecialistMenuComponent,
    MyReviewsComponent,
    MyReviewListComponent,
    MySpecialistComponent,
    MyClientsComponent,
    MyClientListComponent,
    MyClientListItemComponent,
    MyClientDetailComponent,
    MyMealplanListComponent,
    MyGuidelineListComponent,
    ClientMenuComponent,
    MyCalendarComponent,
    MyCalendarClientComponent,
    MiscMenuComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule,
    UserModule,
    SpecialistModule,
    ClientsModule,
    FoodsModule,
    ExercisesModule,
    RequestModule,
    GuidelinesModule,
    MealplansModule,
    MaterialModule
  ],
  exports: [
    RouterModule,
    MySpecialistComponent,
    MyCalendarComponent
  ],
  providers: [
    DashboardService,
  ]
})
export class DashboardModule { }
