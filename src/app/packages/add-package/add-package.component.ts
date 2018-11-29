import { Component, OnInit } from '@angular/core';
import { Package } from './../package.model';
import { PackageService } from '../package.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
  addPackageForm: FormGroup;

  constructor( private packageService: PackageService,
               private fb: FormBuilder) { }

  ngOnInit() {
    this.addPackageForm = this.fb.group({
      packageID: ['', [Validators.required]],
      packageTitle: ['', [Validators.required]],
      packageDescription: ['', [Validators.required]],
      packagePrice: ['', [Validators.required]],
    });
  }

  sendPackageData() {
    const data = this.addPackageForm.value;
    this.packageService.addPackage(data);
    this.addPackageForm.reset();
  }

}
