import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SpecialistService } from './../../../specialists/specialist.service';
import { Observable } from 'rxjs';
import { DataService } from './../../../shared/data/data.service';
import { Timezone } from './../../../shared/data/models/timezone.model';
import languages from './../../data/JSON/languages.json';
import { Language } from '../../data/models/language.model';

@Component({
  selector: 'app-add-specialist-dialog',
  templateUrl: './add-specialist-dialog.component.html',
  styleUrls: ['./add-specialist-dialog.component.scss']
})
export class AddSpecialistDialogComponent implements OnInit {
  // FormGroups
  signUpForm: FormGroup;
  personalForm: FormGroup;
  aboutForm: FormGroup;
  experienceForm: FormGroup;
  locationForm: FormGroup;
  extrasForm: FormGroup;

  addSpecialistForm: FormGroup;
  hide = true;

  downloadURL: string | null;
  languages: Language[] = languages.languages;
  timezones: Observable<Timezone[]>;
  selectedTimezone: string;
  languageArr: FormArray;
  languageValue = new FormControl('', [Validators.required]);
  languageLevel = new FormControl('', [Validators.required]);
  reviews: FormArray;
  reviewerName = new FormControl('', [Validators.required]);
  reviewText = new FormControl('', [Validators.required]);

  languageLevels = [
    {
      value: 'proficient',
      viewValue: 'Fluent - pretty much mother tongue'
    },
    {
      value: 'advanced',
      viewValue: 'Advanced - comfortable in most situations'
    },
    {
      value: 'intermediate',
      viewValue: 'Intermediate - able to have a conversation'
    },
    {
      value: 'beginner',
      viewValue: 'Beginner - a few words and sentences'
    },
  ]; selectedLevel: string;

  constructor( private fb: FormBuilder,
               private dataService: DataService,
               private specialistService: SpecialistService) {}

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

    this.personalForm = this.fb.group({
      specialistID: ['',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(8),
        ]
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });

    this.aboutForm = this.fb.group({
      description: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });

    this.experienceForm = this.fb.group({
      position: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      yearsOfExperience: ['', [Validators.required]],
      patientsTotal: ['', [Validators.required]],
    });

    this.locationForm = this.fb.group({
      timeZone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });

    this.extrasForm = this.fb.group({
      languageArr: this.fb.array([ this.createLanguage() ]),
      reviews: this.fb.array([ this.createReview() ]),
    });
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }


  // Getters
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  get languageForms() {
    return this.extrasForm.get('languageArr') as FormArray;
  }

  get reviewForms() {
    return this.extrasForm.get('reviews') as FormArray;
  }

    // Create a new Language Mat Card
    createLanguage(): FormGroup {
      return this.fb.group({
        languageValue: '',
        languageLevel:  ''
      });
    }

    addLanguage(): void {
      this.languageArr = this.extrasForm.get('languageArr') as FormArray;
      this.languageArr.push(this.createLanguage());
    }

    deleteLanguage(i) {
      (this.extrasForm.get('languageArr') as FormArray).removeAt(i);
    }

    // Create a new Package benefit Mat Card
    createReview(): FormGroup {
      return this.fb.group({
        reviewerName: '',
        reviewText: '',
      });
    }

    addReview(): void {
      this.reviews = this.extrasForm.get('reviews') as FormArray;
      this.reviews.push(this.createReview());
    }

    deleteReview(i) {
      (this.extrasForm.get('reviews') as FormArray).removeAt(i);
    }

    specialistSignUp() {
      const email = this.email.value;
      const password = this.password.value;
      const data = {
        specialistID: this.personalForm.get('specialistID').value,
        firstName: this.personalForm.get('firstName').value,
        lastName: this.personalForm.get('lastName').value,
        photoURL: this.downloadURL,
        email: email,
        description: this.aboutForm.get('description').value,
        isClient: false,
        isSpecialist: true,
        phoneNumber: this.aboutForm.get('phoneNumber').value,
        position: this.experienceForm.get('position').value,
        timeZone: this.locationForm.get('timeZone').value,
        yearsOfExperience: this.experienceForm.get('yearsOfExperience').value,
        patientsTotal: this.experienceForm.get('patientsTotal').value,
        speciality: this.experienceForm.get('speciality').value,
        city: this.locationForm.get('city').value,
        country: this.locationForm.get('country').value,
        languages: this.languageForms.value,
        reviews: this.reviewForms.value,
      };

      // Add user in FireAuth
      return this.specialistService.emailSignUp(email, password, data)
      .then(() => {
        // Reset form
        this.signUpForm.reset();
        this.personalForm.reset();
        this.aboutForm.reset();
        this.experienceForm.reset();
        this.locationForm.reset();
        // this.addSpecialistForm.reset();
      });
    }
}
