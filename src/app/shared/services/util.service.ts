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

  getAge(date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
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

  // Formulas

  calculateMaxCalories( weightInKg: number, heightInMeters: number, ageInYears: number, gender: string) {
    let result: number;
    const w = weightInKg;
    const h  = heightInMeters * 100;
    const a = ageInYears;

    if (gender.toLowerCase() === 'feminine') {
      result = 655.0955 + (9.5634 * w) + (1.8449 * h) - (4.6756 * a);
    } else {
      result = 66.4730 + (13.7516 * w) + (5.0033 * h) - (6.7550 * a);
    }

    return result;
  }

  calculateFatPercentageRegular(data) {
    let c;
    let m;

    if ( data.age < 19 ) {
        c = data.gender === 'Feminine' ? 1.549 : 1.1620;
        m = data.gender === 'Feminine' ? 1.549 : 1.1620;
    } else if (19 < data.age && data.age < 29) {
        c = data.gender === 'Feminine' ? 1.1599 : 1.1631;
        m = data.gender === 'Feminine' ? 1.1599 : 1.1631;
    } else if (29 < data.age && data.age < 39) {
        c = data.gender === 'Feminine' ? 1.1423 : 1.1422;
        m = data.gender === 'Feminine' ? 0.0632 : 0.0544;
    } else if (39 < data.age && data.age < 49) {
        c = data.gender === 'Feminine' ? 1.1333 : 1.1620;
        m = data.gender === 'Feminine' ? 0.0612 : 0.0700;
    } else if (data.age > 50) {
        c = data.gender === 'Feminine' ? 1.1339 : 1.1715;
        m = data.gender === 'Feminine' ? 0.0645 : 0.0779;
    }

    const B = data.biceps;
    const T = data.triceps;
    const S = data.subescapular;
    const SP = data.crestaIliaca;

    const logX =  B + T + S + SP;

    const D = c - (m * Math.log(logX));
    const fatPercentage = ((4.95 / D) - 4.50) * 100;

    return fatPercentage;
  }

  calculateFatPercentageAthlete(data) {
    const c = data.gender === 'Feminine' ? 0.1548 : 0.1051;
    const m = data.gender === 'Feminine' ? 3.580 : 2.2585;
    const T = data.triceps;
    const S = data.subescapular;
    const CI = data.crestaIliaca;
    const A = data.abdominal;
    const FT = data.frontalThigh;
    const C = data.calf;

    const sum =  T + S + CI + A + FT + C;
    const fatPercentage = c * sum * m;

    return fatPercentage;
  }

  calculateBMI(weightInKg: number, heightInMeters: number) {
    const w = weightInKg;
    const h = heightInMeters;

    const result = w / (h * h);

    return result;
  }
}
