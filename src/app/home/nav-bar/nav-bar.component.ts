import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService, ConducteurserviceService} from '../../service';
import {ResrvationService} from '../../service/resrvation.service';
import {Reservation} from '../../model/reservation';
import Swal from "sweetalert2";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
iduser;
 listidres;
  message: string;
  user = new User;
  loginForm: FormGroup;
  submitted = false;
ison=false;
isoff=false;
nom;

prenom;
  listreservationatendvalid;
  listreservationpassager;
  listreservationatend;
  listreseatetster;
  constructor(private reservationservice:ResrvationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenService: AuthentificationService,
    private conducteurservice: ConducteurserviceService
    ) {
    this.nom= localStorage.getItem('nom')
    this.prenom = localStorage.getItem('prenom')
    if(localStorage.getItem('connecte') == "true"){
      this.ison=true
    }


  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

this.getprofile();


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }


  onlogin() {

    this.submitted = true;
    const data = {
      username: this.loginForm.value["username"],

      password: this.loginForm.value["password"],
    }

    this.authenService.login(data).subscribe(res => {

        this.ison = true
        localStorage.setItem('connecte','true')
        console.log(res);

        // const jwt = res.headers.get('Authorization')
        // this.authenService.saveToken(jwt);


        this.router.navigate(['']);


        this.refresh()


      }
      ,error2 => {


        Swal.fire(
          'OPPs',
          'Vérifier vos coordonnées:)',
          'error'
        );
      }
      );

    if (this.loginForm.invalid) {
      return;
    }

}
  refresh(): void {
    window.location.reload();
  }

  deconecter() {

    localStorage.clear();
    sessionStorage.clear();
this.isoff= false;

window.location.reload();
   this.router.navigate(['']);

  }

getprofile(){
  this.conducteurservice.getprofile().subscribe(res=>{
    this.iduser=res['id'];
localStorage.setItem('iduser',res['id']);
    console.log(this.iduser);
    this.reservationservice.reservationparpassager(this.iduser).subscribe(res=>{
      console.log(res);
      this.listreservationpassager=res;


  });
    this.reservationservice.reservattend(this.iduser).subscribe(res1=>{
      console.log(res1);
      this.listreservationatend=res1;


    })

  });



}


  accepetreservation(idreservation){
    this.reservationservice.accpterreservation(idreservation).subscribe(res1=>{
      console.log(res1);

    })
  }
  deleteresrvation(idreservation){
    this.reservationservice.deleteresrvation(idreservation).subscribe(res=>{
      console.log(res);

    })

  }
  deleteresrvationnovalid(){
    this.reservationservice.deleteresrvationnovalid().subscribe(res=>{
this.listreservationatend=res;
    })

  }

}
