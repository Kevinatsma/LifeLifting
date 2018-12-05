import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NutritionistService } from '../nutritionist.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-nutritionist',
  templateUrl: './add-nutritionist.component.html',
  styleUrls: ['./add-nutritionist.component.scss']
})
export class AddNutritionistComponent implements OnInit {
  signUpForm: FormGroup;
  addNutritionistForm: FormGroup;
  hide = true;

  languages: FormArray;
  languageValue = new FormControl('', [Validators.required]);
  languageLevel = new FormControl('', [Validators.required]);
  reviews: FormArray;
  reviewerName = new FormControl('', [Validators.required]);
  reviewText = new FormControl('', [Validators.required]);

  constructor( private nutritionistService: NutritionistService,
               private fb: FormBuilder,
               private auth: AuthService,
               public router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });

    this.addNutritionistForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      description: ['', [Validators.required]],
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

  // Getters
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  get languageForms() {
    return this.addNutritionistForm.get('languages') as FormArray;
  }

  get reviewForms() {
    return this.addNutritionistForm.get('reviews') as FormArray;
  }

    // Create a new Package benefit Mat Card
    createLanguage(): FormGroup {
      return this.fb.group({
        languageValue: '',
        languageLevel:  ''
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
        reviewerName: '',
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

    specialistSignUp() {
      const email = this.email.value;
      const password = this.password.value;
      const data = {
        firstName: this.addNutritionistForm.get('firstName').value,
        lastName: this.addNutritionistForm.get('lastName').value,
        email: this.email.value,
        description: this.addNutritionistForm.get('description').value,
        phoneNumber: this.addNutritionistForm.get('phoneNumber').value,
        position: this.addNutritionistForm.get('position').value,
        timeZone: this.addNutritionistForm.get('timeZone').value,
        yearsOfExperience: this.addNutritionistForm.get('yearsOfExperience').value,
        patientsTotal: this.addNutritionistForm.get('patientsTotal').value,
        city: this.addNutritionistForm.get('city').value,
        country: this.addNutritionistForm.get('country').value,
        languages: this.languageForms.value,
        reviews: this.reviewForms.value,
      };

      // Add user in FireAuth
      return this.nutritionistService.emailSignUp(email, password, data)
      .then(() => {
        // Reset form
        this.signUpForm.reset();
        this.addNutritionistForm.reset();
      })
      .then(() => {
        this.nutritionistService.addNutritionist(data);
      });
    }


}
