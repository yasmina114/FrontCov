import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Marquevoiture} from "../../model/marquevoiture";
import {Voitur} from "../../model/voitur";
import {AuthentificationService, ConducteurserviceService} from "../../service";
import {ImageService} from "../../service/image.service";
import {PassagerService} from "../../service/passager.service";
import {VoitureService} from "../../service/voiture.service";

@Component({
  selector: "app-conducteur",
  templateUrl: "./conducteur.component.html",
  styleUrls: ["./conducteur.component.css"],
})
export class ConducteurComponent implements OnInit {
  public conducteur;
  public idconducteur;
  public conducteurnoter;
  public listnote: number[] = [];
  public note;

  public photo;
  public value: Observable<number>;
  public marque = new Marquevoiture();
  public filesToUpload: File[];
  public id;
  public raiting;
  public idchaufeur;
  public listMarques;
  public listmodel;
  public added = false;
  public myVariable = true;
  public test = false;
  public voiture = new Voitur();
  public idmarque;

  public marque1!: any;
  public form: FormGroup;

  constructor(private activaterout: ActivatedRoute, private voiturservice: VoitureService, private imsr: ImageService, private conducteurserviceService: ConducteurserviceService, private passagerService: PassagerService, private authenService: AuthentificationService) {
    this.id = this.activaterout['params']['_value'].id;

  }

  public ngOnInit() {
    this.form = new FormGroup({
      raiting: new FormControl(""),
    });
    this.value = this.form.controls.raiting.valueChanges;
    this.getconducteurbyid(this.id);
    this.getuserconnecte();
    this.all();
    this.noteattrubier(this.id);
  }

  public submit() {
    console.log(this.form.value);
  }

  public isPassager() {
    // return this.authenService.isPassager();
  }

  public isConducteur() {
    return this.authenService.isConducteur();
  }

  public addavis() {
    console.log(this.form.value);
    this.conducteurserviceService.addavis(this.id, this.form.value).subscribe((res) => {
      console.log(res);
    });
  }

  public getuserconnecte() {
    this.authenService.getprofile().subscribe((res) => {
      console.log(res);
      this.conducteur = res;
      this.idconducteur = this.conducteur.id;
      console.log(this.idconducteur);
    });
  }

  public calculage(date) {
    const todayD = new Date();
    const dd = new Date(date);
    const d1 = dd.getFullYear();
    const d2 = todayD.getFullYear();

    return d2 - d1;

  }

  public modifierpassager() {
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

    this.passagerService.modifpassager(this.idconducteur, data).subscribe((res) => {
      console.log(res);

    });
  }

  public show() {

    this.myVariable = !this.myVariable;

  }

  public recuperFile(file) {
    this.filesToUpload = file.target.files as File[];

    this.photo = file.target.files[0].name;
  }

  public ajoutvoiture() {
    const data = {

      model: this.voiture.model,
      plaque_imatriculation: this.voiture.plaque_imatriculation,
      nbrplacesdisponible: this.voiture.nbrplacesdisponible,
      couleur: this.voiture.couleur,
      date_imatriculation: this.voiture.date_imatriculation,
      type: this.voiture.type,

    };

    console.log(data);

    this.conducteurserviceService.addvoiture(this.idconducteur, this.idmarque, data).subscribe((res) => {
      console.log(res);

    });

  }

  public all() {
    this.conducteurserviceService.getallMarque().subscribe((res) => {
      console.log(res);
      this.listMarques = res;
    });

  }

  public getmodelbymarque() {

    console.log(this.idmarque);

    this.conducteurserviceService.getmodelbymarque(this.idmarque).subscribe((data) => {
      console.log(data);
      this.listmodel = data;

    });

  }

  public getone(idmarque) {

    this.voiturservice.getOnemarque(idmarque).subscribe((data: any) => {
      console.log(data);
      this.marque1 = data;

    });

  }

  public getconducteurbyid(id) {
    this.conducteurserviceService.getone(id).subscribe((res) => {
      console.log(res);
      this.conducteur = res;

    });

  }

  public noteattrubier(id) {
    this.conducteurserviceService.getavis(this.id).subscribe((res1) => {
      console.log(res1);
      this.conducteurnoter = res1;
      this.note = this.conducteurnoter.note;
      console.log(this.note);
      for (let j = 0; j <= this.note.length; j++) {
        this.listnote.push(j);
        console.log(this.listnote);
      }
    });
  }
}
