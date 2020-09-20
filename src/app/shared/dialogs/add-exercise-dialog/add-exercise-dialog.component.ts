import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ExerciseService } from '../../../exercises/exercise.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-exercise-dialog',
  templateUrl: './add-exercise-dialog.component.html',
  styleUrls: ['./add-exercise-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddExerciseDialogComponent implements OnInit {

  hide = true;
  // FormGroups
  addExerciseForm: FormGroup;
  infoForm: FormGroup;
  categoryForm: FormGroup;
  locationForm: FormGroup;
  // portionForm: FormGroup;

  downloadURL: string | null;
  locationArr: FormArray;
  locationValue = new FormControl('', [Validators.required]);
  categoryArr: FormArray;
  categoryValue = new FormControl('', [Validators.required]);


  categories = [
    {
      categoryValue: '15 mins',
    },
    {
      categoryValue: '30 min - 1 hour',
    },
    {
      categoryValue: '1 - 2 hours',
    },
    {
      categoryValue: 'Very long',
    },
    {
      categoryValue: 'Light',
    },
    {
      categoryValue: 'Medium difficulty',
    },
    {
      categoryValue: 'Heavy',
    }
  ];
  locations = [
    {
      locationValue: 'Outside (everywhere)',
    },
    {
      locationValue: 'Outside (forest/park)',
    },
    {
      locationValue: 'Outside (sea/lake)',
    },
    {
      locationValue: 'Outside (mountain)',
    },
    {
      locationValue: 'Outside (beach)',
    },
    {
      locationValue: 'Gym',
    },
    {
      locationValue: 'In the office',
    },
    {
      locationValue: 'Living room',
    },
    {
      locationValue: 'Olympic Swimming pool',
    },
    {
      locationValue: 'Basically everywhere',
    }
  ];

  constructor( private fb: FormBuilder,
               private exerciseService: ExerciseService,
               private dialog: MatDialog) {}

  ngOnInit() {
    this.infoForm = this.fb.group({
      exerciseName: ['', [Validators.required]],
      metsValue: ['', [Validators.required]],
    });

    this.categoryForm = this.fb.group({
      categoryArr: this.fb.array([ this.createCategory() ]),
    });

    this.locationForm = this.fb.group({
      locationArr: this.fb.array([ this.createLocation() ]),
    });

    // this.portionForm = this.fb.group({
    //   amount: ['', [Validators.required]],
    //   unit: ['', [Validators.required]],
    // });
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

  // Getters
  get locationForms() {
    return this.locationForm.get('locationArr') as FormArray;
  }

  get categoryForms() {
    return this.categoryForm.get('categoryArr') as FormArray;
  }

  // Create a new Category item
  createCategory(): FormGroup {
    return this.fb.group({
      categoryValue: ''
    });
  }

  addCategory(): void {
    this.categoryArr = this.categoryForm.get('categoryArr') as FormArray;
    this.categoryArr.push(this.createCategory());
  }

  deleteCategory(i) {
    (this.categoryForm.get('categoryArr') as FormArray).removeAt(i);
  }

  // Create a new location item
  createLocation(): FormGroup {
    return this.fb.group({
      locationValue: ''
    });
  }

  addLocation(): void {
    this.locationArr = this.locationForm.get('locationArr') as FormArray;
    this.locationArr.push(this.createLocation());
  }

  deleteLocation(i) {
    (this.locationForm.get('locationArr') as FormArray).removeAt(i);
  }

  addExercise() {
    const data = {
      exerciseName: this.infoForm.get('exerciseName').value,
      metsValue: this.infoForm.get('metsValue').value,
      exercisePhoto: this.downloadURL,
      categories: this.categoryForms.value,
      locations: this.locationForms.value,
    };
    this.exerciseService.addExercise(data);
  }


  closeDialog() {
    if (confirm('Are you sure you want to stop adding this exercise?')) {
      this.dialog.closeAll();
    }
  }
}
