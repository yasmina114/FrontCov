import {Passager} from './passager';

export class Reservation {
  id: string;
  Nbplaces: Number;
  heure:Date;
  etat:string;
  valide:boolean;
  datevu:Date;
  passeger:Passager
}
