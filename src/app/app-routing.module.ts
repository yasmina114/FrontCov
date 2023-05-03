import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ContainerComponent} from "./home/container/container.component";
import {HomeComponent} from "./home/home.component";

import {ConducteurComponent} from "./profile/conducteur/conducteur.component";

import {AjoutannonceComponent} from "./annonce/ajoutannonce/ajoutannonce.component";
import {AnnonceComponent} from "./annonce/annonce.component";
import {Erreur404Component} from "./erreur404/erreur404.component";
import {AuthGuard} from "./guard/auth.guard";
// import {NotificationComponent} from './home/nav-bar/notification/notification.component';
// import {NotficationpassagerComponent} from "./home/nav-bar/notficationpassager/notficationpassager.component";
import {ProfiluserComponent} from "./profile/profiluser/profiluser.component";
import {ReclamationComponent} from "./reclamation/reclamation.component";
import {RegisterComponent} from "./register/register.component";
import {RegisterconducteurComponent} from "./register/registerconducteur/registerconducteur.component";
import {RegisterpassagerComponent} from "./register/registerpassager/registerpassager.component";

const routes: Routes = [

  { path: "", component: HomeComponent , children:
      [{path: "" , component : ContainerComponent},
        {path: "register", component: RegisterComponent},
        {path: "registerconducteur", component: RegisterconducteurComponent},
        {path: "registerpassager", component: RegisterpassagerComponent},
        {path: "conducteur/:id" , component : ConducteurComponent},
        {path: "profiluser/:iduser" , component : ProfiluserComponent},
        {path: "listannonce" , component : AnnonceComponent},
        {path: "reclamation" , component : ReclamationComponent},
        // {path: 'notification' , component : NotificationComponent},
        // {path: "notificationpassager" , component : NotficationpassagerComponent},
        {path: "ajoutannonce" , component : AjoutannonceComponent},

      ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
