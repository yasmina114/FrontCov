import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';
import {Mail} from '../model/mail';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {


  basurl = "http://localhost:9001/reclamation";

  constructor(private http: HttpClient, private authService:AuthentificationService) {
  }

  getall() {



    return this.http.get(this.basurl + '/all');

  }
  delete(id) {



    return this.http.delete(this.basurl + '/delete/'+id);


  }
  sendmail(mail){



    return this.http.post(this.basurl + '/sendMail',mail);
  }
  reponse(id){



    return this.http.get(this.basurl + '/reponse/'+id);
  }

  addreclamation(idU,data) {
    return this.http.post( this.basurl + '/add/'+idU,data);


  }
  modif(id, idU) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.put(this.basurl + '/update/'+id,idU, {headers: headers});

}
  getOne(id) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.basurl + '/one/'+id, {headers: headers});

  }



}
