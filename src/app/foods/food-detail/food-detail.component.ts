import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../food.service';
import { Specialist } from './../../specialists/specialist.model';
import { SpecialistService } from './../../specialists/specialist.service';
import { Food } from '../food.model';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss', './../food-list-item/food-list-item.component.scss']
})
export class FoodDetailComponent implements OnInit {
  food: Food;
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;


  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               public router: Router,
               public route: ActivatedRoute,
               public foodService: FoodService,
               public specialistService: SpecialistService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getFood();
  }

  getFood() {
    const id = this.route.snapshot.paramMap.get('id');
    this.foodService.getFoodData(id).subscribe(food => (this.food = food));
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
    this.foodService.getFoodData(productID).subscribe(a => (this.food = a));
  }

  linkToNext(food) {
    const productID = food.productID + 1;
    const url = `dashboard/foods/${productID}`;
    this.router.navigate([url]);
    this.foodService.getFoodData(productID).subscribe(a => (this.food = a));
  }
}
