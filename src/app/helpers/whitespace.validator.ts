import { FormGroup } from '@angular/forms';


//Author : Climaco S. Onde Jr.

export function WhiteSpace(controlNames: string[] ) {
  return (formGroup: FormGroup) => {


    controlNames.forEach(function (name) {
      const control = formGroup.controls[name];

      if (control.value.trim() == '') {
        control.setErrors({ empty: true });
      } else {
        control.setErrors(null);
      }
    });
     
    }
}


export function WhiteSpace2(c1: string, c2 : string) {
  return (formGroup: FormGroup) => {

    const control1 = formGroup.controls[c1];
    const control2 = formGroup.controls[c2];


    // set error on matchingControl if validation fails
    if (control1.value.trim() == '') {
      control1.setErrors({ empty: true });
    } else {
      control1.setErrors(null);
    }

    if (control2.value.trim() == '') {
      control2.setErrors({ empty: true });
    } else {
      control2.setErrors(null);
    }
  }
}

