import {Component, NgZone, OnInit} from '@angular/core';
import {Conducteur} from '../../model/conducteur';
import {AnnonceService} from '../../service/annonce.service';
import {AuthentificationService, ConducteurserviceService} from '../../service';
import {ResrvationService} from '../../service/resrvation.service';
import {Passager} from '../../model/passager';
import {Annoce} from '../../model/annoce';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reservation} from '../../model/reservation';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

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

  constructor(private zone: NgZone, private formBuilder: FormBuilder, private reesrvationservice: ResrvationService, private annoncesevice: AnnonceService, private conducteurservce: ConducteurserviceService, private authservice: AuthentificationService) {
    this.getprofipassager();
  }

  ngOnInit() {
    this.all();
    this.allconducteurfidel();

    this.reservationForm = this.formBuilder.group({
      nbplaces: ['', Validators.compose([Validators.required, Validators.max(4)])]
    });

  }

  get f() {
    return this.reservationForm.controls;
  }

  compareDate(date) {
    let todayD = new Date();
    let dd = new Date(date);
    let d1 = dd.getDate();
    let d2 = todayD.getDate();
    if (d1 < d2) {
      console.log(d1 < d2);

    } else {
      console.log(d2);
    }
  }

  all() {

    this.annoncesevice.getall().subscribe(res => {

      console.log(res);
      this.listannonce = res;

      if (this.listannonce.date_depart > new Date()) {
        console.log("oui");
      }
    });

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

  getprofipassager() {
    this.authservice.getprofile().subscribe(res => {
      console.log(res);
      this.passager = res;
      localStorage.setItem('nom', res['lastName']);
      localStorage.setItem('prenom', res['firstName']);
      this.idpassager = this.passager.id;
      console.log(this.idpassager);
    });
  }

  allconducteurfidel() {
    this.conducteurservce.getchaufeurfidel().subscribe(res => {
      console.log("listconducteurfidel", res);
      this.listconducteurfidel = res;
    });

  }

  passerreservation() {
    console.log(" this.reservationForm.value[\"nbplaces\"] ", this.reservationForm.value);
    const data = {
      nbplaces: this.reservationForm.value["nbplaces"]
    };
    this.submitted = true;
    this.reesrvationservice.addreservation(this.idpassager, this.idannonce, data).subscribe(res => {
      console.log("passer resrvation ", res);
      this.annonce = res;
      this.all();
    });
    // stop here if form is invalid
    if (this.reservationForm.invalid) {
      return;
    }

    this.reesrvationservice.addreservation(this.idpassager, this.idannonce, data).subscribe(res => {
      console.log("passer resrvation ", res);
      this.annonce = res;

    });

  }

  calculage(date) {
    let todayD = new Date();
    let dd = new Date(date);
    let d1 = dd.getFullYear();
    let d2 = todayD.getFullYear();

    return d2 - d1;

  }

  public addrKeys: string[];
  public addr: object;

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

}
