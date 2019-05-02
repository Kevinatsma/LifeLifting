import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  replaceCalendarHeaderDates() {
    // tslint:disable-next-line:max-line-length
    const isMobile: any = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(window.navigator.userAgent);
    if (isMobile) {
      setTimeout(() => {
        const dateContainers = document.querySelectorAll('.cal-header');

        // Display only first letter of days
        dateContainers.forEach(date => {
          const dateString = date.firstChild.textContent;
          const convertedStr = dateString.charAt(0);
          date.firstChild.textContent = convertedStr;
        });

        // Display only date numbers
        dateContainers.forEach(date => {
          const dateString = date.lastChild.textContent;
          const convertedStr = dateString.replace(/\D/g, "");
          date.lastChild.textContent = convertedStr;
        });
      }, 1000);
    }
  }
}
