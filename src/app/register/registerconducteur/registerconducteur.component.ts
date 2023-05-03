import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {AuthentificationService, ConducteurserviceService} from '../../service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {ImageService} from '../../service/image.service';

@Component({
  selector: 'app-registerconducteur',
  templateUrl: './registerconducteur.component.html',
  styleUrls: ['./registerconducteur.component.css']
})
export class RegisterconducteurComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  user = new User();
  photo;
  filesToUpload: Array<File>;

  public minDate: Date = new Date ("05/07/1990");
  public maxDate: Date = new Date ("05/27/2005");
  public value: Date = new Date ();
  constructor(private formBuilder: FormBuilder,private conducteurservice: ConducteurserviceService, private  router: Router,private imsr:ImageService) {
  }


  ngOnInit() {


    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      genre: ['', Validators.required],
      tel: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      permis: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmedPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmedPassword')
    });
    return of(null);
  }
  get f() {
    return this.registerForm.controls;
  }

  inscrit() {
    const data = {
      username: this.registerForm.value["username"],
      firstName: this.registerForm.value["firstName"],
      lastName: this.registerForm.value["lastName"],
      genre: this.registerForm.value["genre"],
      email: this.registerForm.value["email"],
      tel: this.registerForm.value["tel"],
      birthdate: this.registerForm.value["birthdate"],

      photo: this.filesToUpload[0].name,
      permis: this.registerForm.value["permis"],
      cin: this.registerForm.value["cin"],
      adress: this.registerForm.value["adress"],
      password: this.registerForm.value["password"],
      confirmedPassword: this.registerForm.value["confirmedPassword"]
    }
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.conducteurservice.addconducteur(data).subscribe(res => {
      console.log(res);

      this.imsr.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest)
        // if (event.type === HttpEventType.UploadProgress) {
        //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
        // } else if (event instanceof HttpResponse) {
        //   console.log('File is completely uploaded!');
        // }
      });

      this.registerForm.reset()
    });

  }

  recuperFile(file){
    this.filesToUpload = <Array<File>>file.target.files;

    this.photo = file.target.files[0]['name'];
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }



}
