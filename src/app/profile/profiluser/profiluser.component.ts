import {Component, Input, OnInit} from '@angular/core';
import {Marquevoiture} from '../../model/marquevoiture';
import {Voitur} from '../../model/voitur';
import {ActivatedRoute} from '@angular/router';
import {VoitureService} from '../../service/voiture.service';
import {ImageService} from '../../service/image.service';
import {AuthentificationService, ConducteurserviceService} from '../../service';
import {PassagerService} from '../../service/passager.service';
import {ResrvationService} from '../../service/resrvation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiluser',
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  passager;
  conducteur;
  idconducteur;
  photo;

  marque = new Marquevoiture();
  filesToUpload: Array<File>;
  iduser;
  listMarques;
  listmodel;
  added = false;
  myVariable = true;
  test = false;
  voiture = new Voitur();
  idmarque;
  marque1;
  voituree = new Voitur();
  listreservation;
  note;
  conducteurnoter;
  role!: any;
  totalavis!: any;
  listType = [
    {name: '4×4'},
    {name: 'Minivan'},
    {name: 'Familiale'},
    {name: 'Coupé'},
    {name: 'Berline'}
  ];

  constructor(private reservationservice: ResrvationService, private activaterout: ActivatedRoute, private voiturservice: VoitureService, private imsr: ImageService, private conducteurserviceService: ConducteurserviceService, private passagerService: PassagerService, private authenService: AuthentificationService) {
    this.iduser = this.activaterout.params['_value']['iduser'];

  }

  ngOnInit() {
    this.noteattrubier(this.iduser);
    // this.getuserconnecte();
    this.all();
    this.getTotalavis();
    this.getvoiturbyconducteur(this.iduser);
    this.reservationparpassager(this.iduser);
    this.getrole();
  }

  getrole() {
    return this.authenService.isPassager(this.iduser).subscribe((res: any) => {
      console.log("isPassager", res.roleList[0].roleName);
      this.role = res.roleList[0].roleName;
    });
  }

  getTotalavis() {
    return this.conducteurserviceService.getTotalavis(this.iduser).subscribe((res: any) => {

      this.totalavis = res.length;
    });
  }

  recuper(id, nom) {

    this.idmarque = id;
    this.marque.nom = nom;
    console.log(nom);
  }

  getuserconnecte() {
    this.authenService.getprofile().subscribe(res => {
      console.log(res);
      this.conducteur = res;
      this.iduser = this.conducteur.id;
      localStorage.setItem('id', res['id']);

    });
  }

  calculage(date) {
    let todayD = new Date();
    let dd = new Date(date);
    let d1 = dd.getFullYear();
    let d2 = todayD.getFullYear();

    return d2 - d1;

  }

  modifierconducteur() {
    const data = {
      username: this.conducteur.username,
      firstName: this.conducteur.firstName,
      lastName: this.conducteur.lastName,
      email: this.conducteur.email,
      birthdate: this.conducteur.birthdate,
      genre: this.conducteur.genre,
      tel: this.conducteur.tel,
      permis: this.conducteur.permis,
      cin: this.conducteur.cin,
      adress: this.conducteur.adress,
      ville: this.conducteur.ville,

      password: this.conducteur.password,
      confirmedPassword: this.conducteur.confirmedPassword,
      photo: this.photo
    };

    console.log(data);

    this.conducteurserviceService.modif(this.iduser, data).subscribe(res => {
      console.log(res);

      if (this.filesToUpload != undefined) {

        this.imsr.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
          console.log(rest);
        });
      }

      // if (event.type === HttpEventType.UploadProgress) {
      //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   console.log('File is completely uploaded!');
      // }

    });

  }

  modifierpassager() {
    const data = {
      username: this.conducteur.username,
      firstName: this.conducteur.firstName,
      lastName: this.conducteur.lastName,
      email: this.conducteur.email,
      birthdate: this.conducteur.birthdate,
      genre: this.conducteur.genre,
      tel: this.conducteur.tel,
    };

    console.log(data);

    this.passagerService.modifpassager(this.idconducteur, data).subscribe(res => {
      console.log(res);

    });
  }

  show() {

    this.myVariable = !this.myVariable;

  }

  recuperFile(file) {
    this.filesToUpload = <Array<File>> file.target.files;

    this.photo = file.target.files[0]['name'];
  }

  ajoutvoiture() {
    const data = {

      model: this.voiture.model,
      plaque_imatriculation: this.voiture.plaque_imatriculation,
      nbrplacesdisponible: this.voiture.nbrplacesdisponible,
      couleur: this.voiture.couleur,
      date_imatriculation: this.voiture.date_imatriculation,
      type: this.voiture.type,

    };

    console.log(data);

    this.conducteurserviceService.addvoiture(this.iduser, this.idmarque, data).subscribe(res => {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Votre Voiture Bien ajoutée',
        showConfirmButton: false,
        timer: 1500
      });


    });

  }

  all() {
    this.conducteurserviceService.getallMarque().subscribe(res => {
      console.log(res);
      this.listMarques = res;
    });

  }

  getmodelbymarque() {

    console.log(this.idmarque);

    this.conducteurserviceService.getmodelbymarque(this.idmarque).subscribe(data => {
      console.log(data);
      this.listmodel = data;

    });

  }

  getone(idmarque) {

    this.voiturservice.getOnemarque(idmarque).subscribe((data: any) => {
      console.log(data);
      this.marque1 = data;

    });

  }

  getconducteurbyid(id) {
    this.conducteurserviceService.getone(id).subscribe(res => {
      console.log(res);
      this.conducteur = res;

    });
  }

  reservationparpassager(iduser) {
    this.reservationservice.reservationparpassager(iduser).subscribe(res1 => {
      console.log(res1);
      this.listreservation = res1;

    });
  }

  getpassager(id) {
    this.passagerService.getone(id).subscribe(res => {
      console.log(res);
      this.passager = res;

    });

  }

  deleteresrvation(idreservation) {
    this.reservationservice.deleteresrvation(idreservation).subscribe(res => {
      console.log(res);
      // this.getreservationattend(this.iduser);
    });

  }

  getvoiturbyconducteur(iduser) {
    this.voiturservice.getvoiturbychauffeur(iduser).subscribe(res => {

      this.voituree = res;
      console.log(this.voituree);
    });
  }

  noteattrubier(id) {
    this.conducteurserviceService.getavis(this.iduser).subscribe(res1 => {
      console.log(res1);
      this.conducteurnoter = res1;
      this.note = this.conducteurnoter.note;
      console.log(this.note);

    });
  }

}
