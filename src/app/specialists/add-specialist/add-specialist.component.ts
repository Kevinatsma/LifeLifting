import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SpecialistService } from '../specialist.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { DataService } from 'src/app/shared/data/data.service';
import { Timezone } from 'src/app/shared/data/models/timezone.model';

@Component({
  selector: 'app-add-specialist',
  templateUrl: './add-specialist.component.html',
  styleUrls: ['./add-specialist.component.scss']
})

export class AddSpecialistComponent implements OnInit {
  signUpForm: FormGroup;
  addSpecialistForm: FormGroup;
  hide = true;

  downloadURL: string | null;
  timezones: Observable<Timezone[]>;
  selectedTimezone: string;
  languages: FormArray;
  languageValue = new FormControl('', [Validators.required]);
  languageLevel = new FormControl('', [Validators.required]);
  reviews: FormArray;
  reviewerName = new FormControl('', [Validators.required]);
  reviewText = new FormControl('', [Validators.required]);

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

  constructor( private specialistService: SpecialistService,
               private fb: FormBuilder,
               private dataService: DataService,
               private auth: AuthService,
               public router: Router) { }

  ngOnInit() {
    this.timezones = this.dataService.getTimezones();

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

    this.addSpecialistForm = this.fb.group({
      specialistID: ['',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(8),
        ]
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      position: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
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
    return this.addSpecialistForm.get('languages') as FormArray;
  }

  get reviewForms() {
    return this.addSpecialistForm.get('reviews') as FormArray;
  }

    // Create a new Language
    createLanguage(): FormGroup {
      return this.fb.group({
        languageValue: '',
        languageLevel:  ''
      });
    }

    addLanguage(): void {
      this.languages = this.addSpecialistForm.get('languages') as FormArray;
      this.languages.push(this.createLanguage());
    }

    deleteLanguage(i) {
      (this.addSpecialistForm.get('languages') as FormArray).removeAt(i);
    }

    // Create a new review
    createReview(): FormGroup {
      return this.fb.group({
        reviewerName: '',
        reviewText: '',
      });
    }

    addReview(): void {
      this.reviews = this.addSpecialistForm.get('reviews') as FormArray;
      this.reviews.push(this.createReview());
    }

    deleteReview(i) {
      (this.addSpecialistForm.get('reviews') as FormArray).removeAt(i);
    }

    specialistSignUp() {
      const email = this.email.value;
      const password = this.password.value;
      const data = {
        specialistID: this.addSpecialistForm.get('specialistID').value,
        firstName: this.addSpecialistForm.get('firstName').value,
        lastName: this.addSpecialistForm.get('lastName').value,
        photoURL: this.downloadURL,
        email: email,
        description: this.addSpecialistForm.get('description').value,
        phoneNumber: this.addSpecialistForm.get('phoneNumber').value,
        position: this.addSpecialistForm.get('position').value,
        timeZone: this.addSpecialistForm.get('timeZone').value,
        yearsOfExperience: this.addSpecialistForm.get('yearsOfExperience').value,
        patientsTotal: this.addSpecialistForm.get('patientsTotal').value,
        city: this.addSpecialistForm.get('city').value,
        country: this.addSpecialistForm.get('country').value,
        languages: this.languageForms.value,
        reviews: this.reviewForms.value,
      };

      // Add user in FireAuth
      return this.specialistService.emailSignUp(email, password, data)
      .then(() => {
        // Reset form
        this.signUpForm.reset();
        this.addSpecialistForm.reset();
      })
      .then(() => {
        this.specialistService.addSpecialist(data);
      });
    }


}
