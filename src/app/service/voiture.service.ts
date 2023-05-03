import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';
import {Voitur} from '../model/voitur';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  basurl = "http://localhost:9001";

  constructor(private http: HttpClient, private authService:AuthentificationService) {
  }

  getall() {



    return this.http.get(this.basurl + '/marque/all');

  }

  delete(id) {



    return this.http.delete(this.basurl + '/marque/delete/'+id);



  }

  addmarque(data) {

    return this.http.post( this.basurl + '/marque/add',data);


  }
  modifmarque(id,c) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.put(this.basurl + '/marque/edit/'+id,c,{headers: headers});

  }
  getOnemarque(id) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.basurl + '/marque/one/'+id, {headers: headers});

  }





  getallmodel() {



    return this.http.get(this.basurl + '/model/all');

  }
  deletemodel(id) {



    return this.http.delete(this.basurl + '/model/delete/'+id);


  }

  addmodel(idG) {

    return this.http.post( this.basurl + '/model/add',idG);


  }
  modifmodel(id, idG) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.put(this.basurl + '/model/update/'+id,idG,{headers: headers});

  }
  getOnemodel(id) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.basurl + '/model/one/'+id, {headers: headers});

  }



  getvoiturbychauffeur(iduser): Observable<Voitur> {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get<Voitur>(this.basurl + '/voitur/voiturcond/'+iduser, {headers: headers});
  }
}
