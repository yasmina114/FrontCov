import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Annoce} from "../model/annoce";
import {Passager} from "../model/passager";
import {Reservation} from "../model/reservation";
import {AnnonceService} from '../service/annonce.service';
import {Conducteur} from '../model/conducteur';

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
  constructor(private annoncesevice: AnnonceService) { }

  ngOnInit() {  this.all();
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
  all() { this.listannonce = [
    {
        "id": "644e624ccec7d03f646975a5",
        "date_depart": "2023-04-13",
        "lieu_depart": "sousse",
        "lieu_arrive": "mahdia",
        "tabac": null,
        "homme": null,
        "femme": null,
        "climatiseur": null,
        "type_bagage": null,
        "createdAt": "2023-04-30T12:42:52.186+0000",
        "nbrplacesdisponible": 0,
        "prix": "10",
        "heurDepart": "17:15",
        "description": "test",
        "aller_retour": true,
        "regulier": null,
        "canModify": true,
        "chauffeur": {
            "id": "644c699f25e16e461c2345ea",
            "confirmedPassword": "$2a$10$fQjbK0PQphE9WF1k1xin2OSvpNM.GtXKZy23hUdGs7iOhTFmMASTy",
            "email": "uuu@ft.jj",
            "username": "hadhamiChauffeur",
            "password": "$2a$10$9P57OIkqDKazQa7G1rW3wewORf6o9QI/4QuS6JURSddF6J85EaBRa",
            "roleList": [
                {
                    "id": "64470d77d6876457302fe166",
                    "roleName": "CONDUCTEUR"
                }
            ],
            "firstName": "hadhami",
            "createdAt": "2023-04-29T00:49:35.201+0000",
            "lastName": "Chauffeur",
            "tel": "9999999999",
            "genre": "homme",
            "birthdate": "2023-04-26",
            "note": 5,
            "permis": "999999999999",
            "cin": "9999999999",
            "photo": "rides-list-2.jpg",
            "adress": "99999999",
            "phoneVerified": false
        },
        "voiture": null
    },
    {
        "id": "644e63a6cec7d03f646975a7",
        "date_depart": "2023-04-30",
        "lieu_depart": "tunis",
        "lieu_arrive": "mahdia",
        "tabac": null,
        "homme": null,
        "femme": null,
        "climatiseur": null,
        "type_bagage": null,
        "createdAt": "2023-04-30T12:48:38.337+0000",
        "nbrplacesdisponible": 0,
        "prix": "18",
        "heurDepart": "10:15",
        "description": "test description",
        "aller_retour": true,
        "regulier": null,
        "canModify": true,
        "chauffeur": {
            "id": "644c60e425e16e461c2345e9",
            "confirmedPassword": "$2a$10$z2jLJ1c6xNwA.KYPxQef8.3k8u4/2gnYvanYLXYge8uryGMW8Ks4W",
            "email": "ahmed@yahoo.com",
            "username": "Ahmed issamail",
            "password": "$2a$10$oZ2s8J.FdqTmskHMVkSW1esubWM882CmASVfinZA4HTirxhR6vodK",
            "roleList": [
                {
                    "id": "64470d77d6876457302fe166",
                    "roleName": "CONDUCTEUR"
                }
            ],
            "firstName": "Ahmed ",
            "createdAt": "2023-04-29T00:12:20.606+0000",
            "lastName": "issamai",
            "tel": "23659874",
            "genre": "homme",
            "birthdate": "2006-02-07",
            "note": 4,
            "permis": "02365956",
            "cin": "02365895",
            "photo": "team-img3.png",
            "adress": "sousse",
            "phoneVerified": false
        },
        "voiture": null
    },
    {
        "id": "644e680bcec7d03f646975a8",
        "date_depart": "2023-05-01",
        "lieu_depart": "tunis",
        "lieu_arrive": "beja",
        "tabac": null,
        "homme": null,
        "femme": null,
        "climatiseur": null,
        "type_bagage": null,
        "createdAt": "2023-04-30T13:07:23.849+0000",
        "nbrplacesdisponible": 1,
        "prix": "15",
        "heurDepart": "20:15",
        "description": "test description",
        "aller_retour": true,
        "regulier": null,
        "canModify": true,
        "chauffeur": {
            "id": "644c5fdd25e16e464cb0d48a",
            "confirmedPassword": "$2a$10$tvN7Zx6M9pxu4Td.glewiubche4OQeX2Rh9D9ZNzVaKr/Ibdgl1mS",
            "email": "nessrine@gmail.com",
            "username": "nessrine",
            "password": "$2a$10$VbQ6/a9wYLVJGDddDc.xWuVE12r/m2dWkD6PonjM26YQBRg1UMXDK",
            "roleList": [
                {
                    "id": "64470d77d6876457302fe166",
                    "roleName": "CONDUCTEUR"
                }
            ],
            "firstName": "nessrine",
            "createdAt": "2023-04-29T00:07:56.881+0000",
            "lastName": "ben abdallh",
            "tel": "53 091 222",
            "genre": "femme",
            "birthdate": "2023-05-03",
            "note": 3,
            "permis": "87686978",
            "cin": "7688678",
            "photo": "team-img4.png",
            "adress": "sousse",
            "phoneVerified": false
        },
        "voiture": null
    },
    {
        "id": "644e6aa8cec7d03f646975a9",
        "date_depart": "2023-05-03",
        "lieu_depart": "tunis",
        "lieu_arrive": "gafsa",
        "tabac": null,
        "homme": null,
        "femme": null,
        "climatiseur": null,
        "type_bagage": null,
        "createdAt": "2023-04-30T13:18:32.164+0000",
        "nbrplacesdisponible": 2,
        "prix": "30",
        "heurDepart": "18:00",
        "description": "test description",
        "aller_retour": true,
        "regulier": null,
        "canModify": true,
        "chauffeur": {
            "id": "644c5ee525e16e19d4d14138",
            "confirmedPassword": "$2a$10$VVQ50tpNpqN3gSxq2FPAo.oG16V2zUelI0NY.Y3W5YT1J8.RsaQf.",
            "email": "HASSANI@gmail.com",
            "username": "HASSANI ben saleh",
            "password": "$2a$10$gsr7UXLby28WA6/G7GdBEes0a4GT14ogwUtKNmlHO6MS5iWNOJJJ.",
            "roleList": [
                {
                    "id": "64470d77d6876457302fe166",
                    "roleName": "CONDUCTEUR"
                }
            ],
            "firstName": "HASSANI",
            "createdAt": "2023-04-29T00:03:48.768+0000",
            "lastName": "ben saleh",
            "tel": "23698574",
            "genre": "homme",
            "birthdate": "1995-02-16",
            "note": 3,
            "permis": "tn09863355",
            "cin": "06981555",
            "photo": "team-img1.png",
            "adress": "sousse",
            "phoneVerified": false
        },
        "voiture": null
    }
];
  /*   this.annoncesevice.getall().subscribe(res => {
      console.log(res);
      this.listannonce = res;
    }); */

  }
}
