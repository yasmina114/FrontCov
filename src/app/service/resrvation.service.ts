import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Reservation} from "../model/reservation";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: "root",
})
export class ResrvationService {
  public basurl = "http://localhost:9001";

  constructor(private http: HttpClient, private authService: AuthentificationService) {
  }

  public getall() {

    return this.http.get(this.basurl + "/res/reservations");

  }

  public deleteresrvation(id) {
    return this.http.delete(this.basurl + "/res/deleteresrvation/" + id);

  }

  public deleteresrvationnovalid() {

    return this.http.delete(this.basurl + "/res/supp/");

  }

  public addreservation(idannonce, idpassager, data) {

    return this.http.post(this.basurl + "/res/limitreservation/" + idannonce + "/" + idpassager, data);

  }

  public getone(id) {

    return this.http.get(this.basurl + "/res/reservations/" + id);

  }

  public refuserres(id) {

    return this.http.get(this.basurl + "/res/refusereservation/" + id);

  }

  public getresrefuser(idpassager) {

    return this.http.get(this.basurl + "/res/reservationrefuser/" + idpassager);

  }

  public reservattend(idconducteur): Observable<Reservation> {

    return this.http.get<Reservation>(this.basurl + "/res/reservationenattend/" + idconducteur);

  }

  public reservaccpter() {

    return this.http.get(this.basurl + "/res/resrvationaccepter");

  }

  public accpterreservation(idreservation) {

    return this.http.get(this.basurl + "/res/validerreservation/" + idreservation);

  }

  public reservationparpassager(idpassager) {

    return this.http.get(this.basurl + "/res/resrvationpassager/" + idpassager);

  }

  public reservationaccepter(idpassager) {

    return this.http.get(this.basurl + "/res/resrvationaccepter/" + idpassager);

  }

  public reservationrefuser(idpassager) {

    return this.http.get(this.basurl + "/res/reservationrefuser/" + idpassager);

  }

}
