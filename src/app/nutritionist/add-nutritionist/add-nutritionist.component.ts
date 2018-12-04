import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NutritionistService } from '../nutritionist.service';

@Component({
  selector: 'app-add-nutritionist',
  templateUrl: './add-nutritionist.component.html',
  styleUrls: ['./add-nutritionist.component.scss']
})
export class AddNutritionistComponent implements OnInit {
  addNutritionistForm: FormGroup;
  languages: FormArray;
  languageValue = new FormControl('', [Validators.required]);
  reviews: FormArray;
  reviewText = new FormControl('', [Validators.required]);

  constructor( private nutritionistService: NutritionistService,
               private fb: FormBuilder) { }

  ngOnInit() {
    this.addNutritionistForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      position: ['', [Validators.required]],
      timeZone: ['', [Validators.required]],
      yearsOfExperience: ['', [Validators.required]],
      patientsTotal: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      languages: this.fb.array([ this.createLanguage() ]),
      reviews: this.fb.array([ this.createReview() ]),
    });
  }

  get languageForms() {
    return this.addNutritionistForm.get('languages') as FormArray;
  }

  get reviewForms() {
    return this.addNutritionistForm.get('reviews') as FormArray;
  }

  sendNutritionistData() {
    const data = this.addNutritionistForm.value;
    this.nutritionistService.addNutritionist(data);
    this.addNutritionistForm.reset();
  }

    // Create a new Package benefit Mat Card
    createLanguage(): FormGroup {
      return this.fb.group({
        languageValue: '',
      });
    }

    addLanguage(): void {
      this.languages = this.addNutritionistForm.get('languages') as FormArray;
      this.languages.push(this.createLanguage());
    }

    deleteLanguage(i) {
      (this.addNutritionistForm.get('languages') as FormArray).removeAt(i);
    }

    // Create a new Package benefit Mat Card
    createReview(): FormGroup {
      return this.fb.group({
        reviewText: '',
      });
    }

    addReview(): void {
      this.reviews = this.addNutritionistForm.get('reviews') as FormArray;
      this.reviews.push(this.createReview());
    }

    deleteReview(i) {
      (this.addNutritionistForm.get('reviews') as FormArray).removeAt(i);
    }

}
