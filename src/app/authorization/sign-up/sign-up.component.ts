import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ISignUpInterface} from "../interface/sign-up.interface";
import {ICities} from "../interface/cities.interface";
import {ISchoolInterface} from "../interface/school.interface";
import {ModalService} from "../../shared/modal/modal.service";
import {SignUpSuccessComponent} from "../../shared/modal/sign-up-success/sign-up-success.component";
import {ValidationService} from "../../shared/validation/service/validation.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public form!: FormGroup;
  public cities: ICities[] = [
    {value: '', city: 'Выберите из списка...'},
    {value: "petersburg", city: "Санкт-Петербург"},
    {value: "samara", city: "Самара"},
    {value: "perm", city: "Пермь"}
  ];

  public schools: ISchoolInterface[] = [
    {value: '', school: 'Выберите из списка...'},
    {value: "petersburg", school: "11"},
    {value: "samara", school: "22"},
    {value: "perm", school: "33"}
  ];
  public classRooms: ISchoolInterface[] = [
    {value: '', school: ''},
    {value: "1", school: "1"},
    {value: "2", school: "2"},
    {value: "3", school: "3"}
  ]


  constructor(
    private readonly modalService: ModalService,
    private  validationService: ValidationService) { }

  ngOnInit(): void {


    this.form = new FormGroup({
      surname: new FormControl(null, [
        Validators.required,
        this.validationService.usernameSpecialSymbols
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.min(3),
        Validators.max(20)
      ]),
      patronymic: new FormControl(null, [
        Validators.required,
        Validators.min(3),
        Validators.max(20)
      ]),
      city: new FormControl('', [

      ]),
      school: new FormControl('', [

      ]),
      classRoom: new FormControl('', [

      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.min(3),
        Validators.max(20),
        Validators.email
      ]),
      password: new FormGroup({
        passwordCtrl: new FormControl(null, [
          Validators.required,
          Validators.min(8)
        ]),
        cpassword: new FormControl(null, [
          Validators.required,
          Validators.min(8),
        ])
      }, [this.validationService.equalValidator, this.validationService.passwordSpecialSymbols]),

      checkbox: new FormControl('', [

      ]),
    })
  }


  public submit(): void {

    const formSubmit: ISignUpInterface = {
      surname: this.form.controls['surname'].value,
      name: this.form.controls['name'].value,
      patronymic: this.form.controls['patronymic'].value,
      email: this.form.controls['email'].value,
      city: this.form.controls['city'].value,
      school: this.form.controls['school'].value,
      classRoom: this.form.controls['classRoom'].value,
      password: this.form.controls['password'].value['passwordCtrl'],
      checkbox: this.form.controls['checkbox'].value,
    }

    console.log(formSubmit);

    this.modalService.open({
      component: SignUpSuccessComponent,
      context: formSubmit
    })
  }

  public showError(): boolean {
    return this.form.controls['email']?.errors
      && this.form.controls['email'].touched && this.form.controls['email']?.value.length > 0;
  }
}
