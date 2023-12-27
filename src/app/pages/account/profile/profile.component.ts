import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public modalFormGroup: FormGroup;
  public errors: any[];
  constructor(public activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,) { }

  ngOnInit() {

    
    this.modalFormGroup = this.formBuilder.group({
      UserName: new FormControl('', [Validators.required]),
      Password : new FormControl('', [Validators.required]),
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      MiddleName: new FormControl(''),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Mobile: new FormControl('', [Validators.required]),
      UserType: new FormControl('', [Validators.required]),
      Status: new FormControl('Active', [Validators.required]),
    } );

  }
  get modalForm() {
    return this.modalFormGroup.controls;
  }

}
