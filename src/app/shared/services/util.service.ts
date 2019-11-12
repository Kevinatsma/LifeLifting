import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  checkIfMobile() {
    let check = false;
    (function(a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { check = true; }
    })(navigator.userAgent || navigator.vendor);

    if (window.innerWidth < 800) {
      check = true;
    }

    return check;
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
        m = data.gender === 'Feminine' ? 0.0678 : 0.0630;
    } else if (19 < data.age && data.age < 29) {
        c = data.gender === 'Feminine' ? 1.1599 : 1.1631;
        m = data.gender === 'Feminine' ? 0.0717 : 0.0632;
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

    const sum = B + T + S + SP;
    const logX =  Math.log10(sum);

    const D = c - (m * logX);
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
