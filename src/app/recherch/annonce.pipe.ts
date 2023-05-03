import {Pipe, PipeTransform} from '@angular/core';
import {Conducteur} from '../model/conducteur';

export interface Annonce {
  lieu_depart: string;
  lieu_arrive: string;
  date_depart: string;

  acseptationauto: boolean;
  nbrplacesdisponible: string;
  prix: string;
  heurDepart: string;

  aller_retour: boolean;
  description: string;
  regulier: boolean;
  chauffeur: Conducteur;

}

@Pipe({
  name: 'annonce'
})
export class AnnoncePipe implements PipeTransform {

  transform(
    annonce: Annonce[],
    lieu_departSearch?: string,
    lieu_arriveSearch?: string,
    date_departSearch?: string,
  ): Annonce[] {

    if (!annonce) {
      return [];
    }
    if (!lieu_departSearch && !lieu_arriveSearch) {
      return annonce;
    } else {
      lieu_departSearch = lieu_departSearch.toLocaleLowerCase();
      lieu_arriveSearch = lieu_arriveSearch.toLocaleLowerCase();
      annonce = [...annonce.filter(annonce => annonce.lieu_depart.toLocaleLowerCase().includes(lieu_departSearch))];

      annonce = [...annonce.filter(annonce => annonce.lieu_arrive.toLocaleLowerCase().includes(lieu_arriveSearch))];
    }
    if (!date_departSearch) {
      return annonce;
    }

    annonce = [...annonce.filter(annonce => annonce.date_depart.includes(date_departSearch))];

    return annonce;
  }

}
