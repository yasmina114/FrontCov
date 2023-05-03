import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {Annoce} from "../model/annoce";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: "root",
})
export class AnnonceService {
  public basurl = "http://localhost:9001";

  constructor(private http: HttpClient, private authService: AuthentificationService) {
  }

  public getall(): Observable<Annoce> {

    return this.http.get<Annoce>(this.basurl + "/annonce/all");

  }
  public addannnce(idchaufeur, data) {

    return this.http.post( "http://localhost:9001/annonce/add/" + idchaufeur, data);

  }
  public getone(id) {

    return this.http.get( "http://localhost:9001/annonce/one/" + id);
  }

  // recherchannonce(depar,arriv,date){
  //   let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
  //
  //   return this.http.get( 'http://localhost:9001/annonce/get/recherchannonce',depar,arriv,date, {headers:headers});
  // }
}
