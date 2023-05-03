import {AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {AnnonceService} from '../../service/annonce.service';
import {AuthentificationService} from '../../service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {PassagerService} from '../../service/passager.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {DatePipe} from '@angular/common';
import {style} from '@angular/animations';
import {Browser, Map, map, tileLayer} from 'leaflet';
import {MapsAPILoader} from '@agm/core';
import {MouseEvent as AGMMouseEvent} from '@agm/core';
import {Annoce} from "../../model/annoce";
import Swal from "sweetalert2";

@Component({
  selector: "app-ajoutannonce",
  templateUrl: './ajoutannonce.component.html',
  styleUrls: ["./ajoutannonce.component.css"]

})
export class AjoutannonceComponent implements OnInit, AfterViewInit {
  map!: any;
  lat!: number;
  lng!: number;
  mode!: string;
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  originPlaceId!: any;
  destinationPlaceId!: any;

  @ViewChild('lieu_depart') lieu_depart!: ElementRef;
  @ViewChild('lieu_arrive') lieu_arrive!: ElementRef;
  @ViewChild('formCard') formCard!: ElementRef;

  directionsService!: any;
  directionsDisplay!: any;
  claculdistance!: any;
  conducteur!: any;
  idconducteur!: any;

  submitted = false;
  user = new User();
  date_depart!: string;

  latorgin;
  latdistination;
  lngdistination;
  lngorgin;
  t1 = false;
  t2 = true;
  annonce = new Annoce();
  show = false;
  aller_retour!: false;
  acseptationauto!: boolean;
  regulier: false;
  annonceForm!: FormGroup;
  distInMeters;
  zoom!: number;
  address!: string;
  google: any;


  originPlaceIdpostion;

  constructor(private mapsAPILoader: MapsAPILoader, private zone: NgZone, private datePipe: DatePipe, private formBuilder: FormBuilder, private authsevice: AuthentificationService, private annoncesrvice: AnnonceService, private  router: Router) {
    this.mode = 'DRIVING';
    navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }
    );

  }

  ngOnInit() {

    this.getprofileconducteur();

    this.annonceForm = this.formBuilder.group({
      date_depart: ['', [Validators.required]],

      heurDepart: ['', Validators.required],

      prix: ['', Validators.required],
      nbrplacesdisponible: ['', Validators.compose([Validators.required, Validators.max(4)])],

      aller_retour: ['', Validators.required],
      description: ['', Validators.required],
      regulier: ['', Validators.required]

    });

  }

  ngAfterViewInit() {
    const initialState = {lng: 11, lat: 49, zoom: 4};

    const lefletMap: Map = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    const isRetina = Browser.retina;
    const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
    const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: 'YOUR_API_KEY',
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(lefletMap);
  }

  //
  //
  // dateLessThan(date_depart: string, date_arrivee: string) {
  //   return (annonceForm: FormGroup): {[key: string]: any} => {
  //     let f = annonceForm.controls[date_depart];
  //     let t = annonceForm.controls[date_arrivee];
  //     if (f.value > t.value) {
  //       return {
  //         dates: "La date de retour doit être après la date de départ."
  //       };
  //     }
  //     return {};
  //   }
  // }
  //

  get f() {
    return this.annonceForm.controls;
  }

  getprofileconducteur() {
    this.authsevice.getprofile().subscribe(res => {
      console.log(res);
      this.conducteur = res;
      this.idconducteur = this.conducteur.id;

    });
  }

  addannonce() {
    const data = {

      date_depart: this.annonceForm.value["date_depart"],

      lieu_depart: this.lieu_depart.nativeElement.value,
      lieu_arrive: this.lieu_arrive.nativeElement.value,
      nbrplacesdisponible: this.annonceForm.value["nbrplacesdisponible"],
      prix: this.annonceForm.value["prix"],
      heurDepart: this.annonceForm.value["heurDepart"],

      aller_retour: this.annonceForm.value["aller_retour"],
      description: this.annonceForm.value["description"],
      regulier: this.annonceForm.value["regulier"]

    };
    console.log(data);
    this.submitted = true;
    if (!this.annonceForm.valid) {
      return;
    }

    this.annoncesrvice.addannnce(this.idconducteur, data).subscribe(res => {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Votre trajet publier avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.submitted = false;
      this.annonceForm.reset();
      this.router.navigate(['']);
    });

  }

  toggle() {
    this.show = !this.show;
  }

  c2() {
    this.t1 = true;
    this.t2 = true;

  }

  mapReady(map): void {
    // debugger;
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;

    const lieu_depart = this.lieu_depart.nativeElement;
    const lieu_arrive = this.lieu_arrive.nativeElement;

    this.directionsService = new this.google.maps.DirectionsService();
    this.directionsDisplay = new this.google.maps.DirectionsRenderer();
    this.claculdistance = new this.google.maps.DistanceMatrixService();

    this.directionsDisplay.setMap(map);

    const originAutocomplete = new this.google.maps.places.Autocomplete(
      lieu_depart,
    );
    const destinationAutocomplete = new this.google.maps.places.Autocomplete(
      lieu_arrive,
    );

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    // /**
    //  * Setting form Card on the map
    //  */
    // debugger;
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
    //   // this.formCard.nativeElement
    //   originInput
    // );

  }

  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert('Please select an option from the dropdown list.');
        return;
      }
      if (mode === 'ORIG') {
        this.originPlaceId = place.place_id;

      } else {
        this.destinationPlaceId = place.place_id;
      }
      this.routeFn();

    });
  }

  routeFn(): void {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    this.directionsService.route(
      {
        origin: {placeId: this.originPlaceId},
        destination: {placeId: this.destinationPlaceId},
        travelMode: this.mode,

      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );

  }

  //
  // let mygc = new google.maps.Geocoder();
  // let locationOrigem;
  // let locationDestino;
  // let latOrigem  = 0;
  // let longOrigem = 0;
  // let latDestino  = 0;
  // let longDestino = 0;
  //
  // mygc.geocode(this.lieu_depart.nativeElement, function(results, status){
  //   locationOrigem = results[0].geometry.location;
  //   latOrigem   = results[0].geometry.location.lat();
  //   longOrigem  = results[0].geometry.location.lng();
  //   mygc.geocode(this.lieu_arrive.nativeElement, function(results, status){
  //     locationDestino = results[0].geometry.location;
  //     latDestino  = results[0].geometry.location.lat();
  //     longDestino = results[0].geometry.location.lng();
  //     console.log(locationOrigem);
  //     console.log(locationDestino);
  //     console.log(google.maps.geometry.spherical.computeDistanceBetween(locationOrigem, locationDestino));
  //   });
  // });

}
