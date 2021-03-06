import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  title = 'angular-gmap';

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  lat = -0.1905014;
  lng = -78.4859012;
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15,
  };


   ngAfterViewInit(): void {
    this.mapInitializer();
    google.maps.event.addListener(this.map, 'click', ($event) => {
      this.getLatLng($event);
    });
   }

  mapInitializer() {
    this.map = new google.maps.Map(
    this.gmap.nativeElement, 
    this.mapOptions
    );
    
   }

  //  Envio de datos a app.component
   @Output() Latitudenv = new EventEmitter<{Latitud}>();
   @Output() Longitudenv = new EventEmitter<{Longitud}>();
   @Output() Areaenv = new EventEmitter<{Area}>();

  //  Encontrar Latitudes y Longitudes


  contador=0;
  latf;
  lngf;
  route=[];
  route1=[];
  Area;
  Distance;
  Area1;
  // markers = new Array();
  
   getLatLng($event){
    // console.log($event);
    // console.log($event.latLng.lng());
    var markerl= $event.latLng;
    this.contador=this.contador+1;
    this.latf=$event.latLng.lat();
    this.lngf=$event.latLng.lng();
    // console.log($event);
    
    
    
    //  Marcador 

    var marker = new google.maps.Marker({
      position: $event.latLng,
      map: this.map,
      icon: 'assets/img/Map-Marker-Ball-Azure-32.png',
    });
    
    // Automatic Array
    this.route1[this.contador-1] = $event.latLng;
    
    var Polilinea = new google.maps.Polyline({
      path: this.route1,
      map:this.map,
      strokeColor: "#ff0000",   
      strokeWeight: 5,   
      strokeOpacity: 0.6
      });

      
      //Area

      this.Area = google.maps.geometry.spherical.computeArea(this.route1);
      // console.log(this.route1);

      
      
   }

   closePath(){
     this.route1[this.contador]=this.route1[0];
    //  console.log(this.route1);
     var Polilinea = new google.maps.Polyline({
      path: this.route1,
      map:this.map,
      strokeColor: "#ff0000",   
      strokeWeight: 5,   
      strokeOpacity: 0.6
      });
      this.cal=true;
   }
   cal=false;

   calcularA(){
    this.Area1=this.Area.toFixed(2);
    this.Latitudenv.emit(this.latf);
    this.Longitudenv.emit(this.lngf);
    this.Areaenv.emit(this.Area1);

   }

   reload(){
     this.cal=false;  
    this.map = new google.maps.Map(
      this.gmap.nativeElement, 
      this.mapOptions
      );

      google.maps.event.addListener(this.map, 'click', ($event) => {
        this.getLatLng($event);
      });

      this.contador=0;
      this.latf=0;
      this.lngf=0;
      this.route=[];
      this.route1=[];
      this.Area=0;
      this.Distance;
      this.Area1=0;
      
   }
   
 
  

  // Cambiar pagina a cc

  @Output() featureSelected = new EventEmitter<string>();
  
  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }


}

