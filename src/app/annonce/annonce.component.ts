import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Annoce} from "../model/annoce";
import {Passager} from "../model/passager";
import {Reservation} from "../model/reservation";
import {AnnonceService} from '../service/annonce.service';
import {Conducteur} from '../model/conducteur';
import { ResrvationService } from '../service/resrvation.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  idannonce;
  listannonce;
  listconducteurfidel;
  idpassager;
  lieu_departSearch = "";
  nbrplacedispo: number;
  submitted = false;
  lieu_arriveSearch = "";
  date_departSearch;
  annonce;
  reservationForm!: FormGroup;
  ann = new Annoce();
  resrvation = new Reservation;
  passager = new Passager();
  nbplaces!: any;
  // idchauf;
  chauffeur = new Conducteur();
  constructor(private annoncesevice: AnnonceService , private reesrvationservice:ResrvationService, private formBuilder :FormBuilder) { }

  ngOnInit() {  this.all();
    this.reservationForm = this.formBuilder.group({
        nbplaces: ['', Validators.compose([Validators.required, Validators.max(4)])]
      });
  }

  get f() {
    return this.reservationForm.controls;
  }
  getoneannonce(id) {
    this.annoncesevice.getone(id).subscribe(rs => {
      console.log(rs);
      this.annonce = rs;
      this.idannonce = this.annonce.id;
      this.nbrplacedispo = this.annonce.nbrplacesdisponible;
      console.log(this.idannonce);
    });
  }
  all() { 
    this.annoncesevice.getall().subscribe(res => {
      console.log(res);
      this.listannonce = res;
    }); 

  }


  passerreservation() {
    console.log(" this.reservationForm.value[\"nbplaces\"] ", this.reservationForm.value);
    const data = {
      nbplaces: this.reservationForm.value["nbplaces"]
    };
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.reservationForm.invalid) {
      return;
    }
     
    this.reesrvationservice.addreservation(this.idpassager, this.idannonce, data).subscribe(res => {
      console.log("passer resrvation ", res);
      this.annonce = res;
      this.all();
    });

  }

}
