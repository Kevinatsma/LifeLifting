import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  checkIfMobile() {
    // tslint:disable-next-line:max-line-length
    const isMobile: any = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(window.navigator.userAgent);
    return isMobile;
  }

  replaceCalendarHeaderDates() {
    const isMobile = this.checkIfMobile();
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
          const convertedStr = dateString.replace(/\D/g, '');
          date.lastChild.textContent = convertedStr;
        });
      }, 1000);
    }
  }


  dateAdd(date, interval, units) {
    let ret = new Date(date);
    const checkRollover = function() {
      if (ret.getDate() !== date.getDate()) {
        ret.setDate(0);
      }
    };

    switch (interval.toLowerCase()) {
      case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
      case 'quarter':  ret.setMonth(ret.getMonth() + 3 * units); checkRollover();  break;
      case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
      case 'week'   :  ret.setDate(ret.getDate() + 7 * units);  break;
      case 'day'    :  ret.setDate(ret.getDate() + units);  break;
      case 'hour'   :  ret.setTime(ret.getTime() + units * 3600000);  break;
      case 'minute' :  ret.setTime(ret.getTime() + units * 60000);  break;
      case 'second' :  ret.setTime(ret.getTime() + units * 1000);  break;
      default       :  ret = undefined;  break;
    }
    return ret;
  }

  /**
   * Function to sort alphabetically an array of objects by some specific key.
   *
   * @param {String} property Key of the object to sort.
   */
  dynamicSort(property, order) {
    let sortOrder = order;

    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder = -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    };
  }
}
