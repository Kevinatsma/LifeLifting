import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../food.service';
import { Specialist } from './../../specialists/specialist.model';
import { SpecialistService } from './../../specialists/specialist.service';
import { Food } from '../food.model';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss', './../food-list-item/food-list-item.component.scss']
})
export class FoodDetailComponent implements OnInit, OnDestroy {
  user: User;
  user$: Subscription;
  food: Food;
  food$: Subscription;
  prevFood$: Subscription;
  nextFood$: Subscription;
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;

  constructor( public auth: AuthService,
               private userService: UserService,
               private cdr: ChangeDetectorRef,
               public router: Router,
               public route: ActivatedRoute,
               public foodService: FoodService,
               public specialistService: SpecialistService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getFood();
    this.getUser();
  }

  ngOnDestroy() {
    if (this.user$ !== null) { this.user$.unsubscribe(); }
    if (this.food$ !== null) { this.food$.unsubscribe(); }
    if (this.prevFood$ !== null && this.prevFood$ !== undefined) { this.prevFood$.unsubscribe(); }
    if (this.nextFood$ !== null && this.nextFood$ !== undefined) { this.nextFood$.unsubscribe(); }
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
  }

  getFood() {
    const id = this.route.snapshot.paramMap.get('id');
    this.food$ = this.foodService.getFoodData(id).subscribe(food => (this.food = food));
  }

  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.foodService.editShow;
  }

  toggleEdit() {
    this.foodService.toggleEdit();
  }

  // Control buttons
  linkToPrevious(food) {
    const productID = food.productID - 1;
    const url = `dashboard/foods/${productID}`;
    this.router.navigate([url]);
    this.prevFood$ = this.foodService.getFoodData(productID).subscribe(a => (this.food = a));
  }

  linkToNext(food) {
    const productID = food.productID + 1;
    const url = `dashboard/foods/${productID}`;
    this.router.navigate([url]);
    this.nextFood$ = this.foodService.getFoodData(productID).subscribe(a => (this.food = a));
  }

  goBack() {
    this.location.back();
  }
}
