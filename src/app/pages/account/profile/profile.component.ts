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
  public user: any = {};
  constructor(public activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user').toString())
    console.log( this.user)
    this.modalFormGroup = this.formBuilder.group({
      Id :new FormControl(this.user._id),
      UserName: new FormControl(this.user.UserName, [Validators.required]),
      Password : new FormControl(this.user.Password, [Validators.required]),
      FirstName: new FormControl(this.user.FirstName, [Validators.required]),
      LastName: new FormControl(this.user.LastName, [Validators.required]),
      MiddleName: new FormControl(this.user.MiddleName),
      Email: new FormControl(this.user.Email, [Validators.required, Validators.email]),
      Mobile: new FormControl(this.user.Mobile, [Validators.required]),
      UserType: new FormControl(this.user.UserType, [Validators.required]),
      Status: new FormControl(this.user.Status, [Validators.required]),
    } );

  }
  get modalForm() {
    return this.modalFormGroup.controls;
  }

}
