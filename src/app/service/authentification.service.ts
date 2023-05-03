import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {Passager} from "../model/passager";
import {User} from "../model/user";

@Injectable({
  providedIn: "root",
})
export class AuthentificationService {
  public basurl = "http://localhost:9001";
  public jwt: string;
  public username: string;
  public roles: String[];

  private var;

  constructor(private http: HttpClient) {

  }

  public login(data) {

    return this.http.post(this.basurl + "/login", data, {observe: "response"});

  }

  public register(data) {

    return this.http.post(this.basurl + "/admin/add", data);

  }

  public getprofile(): Observable<Passager> {

    return this.http.get<Passager>(this.basurl + "/user/byiduser/644e8fc6ff85ad6e741e3323");
  }

  public parseJWT() {

    const jwtHelper = new JwtHelperService();
    const objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
  }

  public saveToken(jwt: string) {
    sessionStorage.setItem("token", jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  public isAdmin() {
    return this.roles.indexOf("ADMIN") >= 0;
  }

  public isConducteur() {
    return this.roles.indexOf("CONDUCTEUR") >= 0;

  }

  public isPassager(iduser) {
    return this.http.get<Passager>(this.basurl + "/user/byiduser/" + iduser);

  }



  public loadToken() {
    this.jwt = sessionStorage.getItem("token");
    this.parseJWT();
  }

  public logout() {
    sessionStorage.removeItem("token");
    this.initParams();

  }

  public initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }

}
