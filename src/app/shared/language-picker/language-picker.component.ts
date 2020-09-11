import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {
  languageForm: FormGroup;
  languages: [
    {value: "en", viewValue: "English"},
    {value: "es", viewValue: "Spanish"}
  ];
  selectedLanguage;
  flagSrc = '../../../assets/img/icons/flags/united-kingdom.svg';

  constructor(private fb: FormBuilder,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initForm();
    this.setSelectedLanguage();
  }

  initForm() {
    this.languageForm = this.fb.group({
      selectedLanguage: ['']
    });
  }

  setSelectedLanguage() {
    const currentLang = this.translate.getDefaultLang();
    this.languageForm.controls.selectedLanguage.patchValue(currentLang);
    this.setFlag(currentLang);
  }

  changeLanguage(newLang: string) {
    this.translate.setDefaultLang(newLang);
    this.setFlag(newLang);
  }

  setFlag(lang: string) {
    let country;
    switch (lang) {
      case 'en': country = 'united-kingdom'; break;
      case 'es': country = 'spain'; break;
      default: country = 'united-kingdom'; break;
    }
    this.flagSrc = `../../../assets/img/icons/flags/${country}.svg`
  }

}
