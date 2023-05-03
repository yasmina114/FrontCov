import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Mail} from '../model/mail';
import {Reclamation} from '../model/reclamation';
import {ReclamationService} from '../service/reclamation.service';
import {AuthentificationService} from '../service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  to;
  term;
  iduser;
  etat = false;
  registerForm: FormGroup;
  submitted = false;

  mail = new Mail();
  reclamtion = new Reclamation();
  user;

  constructor(private formBuilder: FormBuilder, private authenService: AuthentificationService, private router: Router,
              private reclamtionservice: ReclamationService) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      sujet: ["", Validators.required],
      titre: ['', Validators.required]
    });
    this.getuserconnecte();
  }

  get f() {
    return this.registerForm.controls;
  }

  getuserconnecte() {
    this.authenService.getprofile().subscribe(res => {
      console.log(res);
      this.user = res;
      this.iduser = this.user.id;

    });
  }

  addreclamation() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    const message = {
      sujet: this.registerForm.value["sujet"],
      titre: this.registerForm.value["titre"],
    };
this.reclamtionservice.addreclamation(this.iduser, message).subscribe(res => {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Votre reclamtion envoyer  avec succès',
        showConfirmButton: false,
        timer: 1500
      });
    });
    this.router.navigate([""]);
  }

}
