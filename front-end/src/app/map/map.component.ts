import { Component, Input, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { FormService } from '../service/base.service';
import { OutputService } from '../service/outPutData.service';
import 'leaflet.heat';
import 'leaflet-bing-layer';
import 'leaflet-ruler';
import 'leaflet-mouse-position';

declare module 'leaflet' {
  namespace control {
    function mousePosition(options?: any): any;
  }
}
declare module 'leaflet' {
  namespace tileLayer {
    function bing(options: any): any;
  }
}
declare module 'leaflet' {
  namespace control {
    function ruler(options?: any): any;
  }
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  latitude = 3.87005;
  longitude = 11.52371;
  zomeLevel = 7;
  tiles: any;
  wMaps: any;
  chaleurs: any[] = [];
  values: any[] = [];
  usgslayer: any;
  esrilayer: any;
  baseurl: any;
  markers: any;
  bounds: any;
  polygon: any;
  polyline: any;
  svgLayer: any;
  rectangulerLayer: any;
  circleLayer: any[] = [];
  polygons: any[] = [];
  circle: any;
  endPoint = "centreinteret";
  centre: any;
  circles: any[] = [];
  data: any;
  points: any;
  map!: L.Map;
  baseMaps: any = {};
  overlays: any = {};
  circlesLayerGroup!: L.LayerGroup;
  circlesLayerGroups!: L.LayerGroup;
  circlesGroup!: L.LayerGroup;
  operatorGroup!: L.LayerGroup;
  existingLayersControl!: L.Control.Layers;
  leafletCircle: any;
  heatmapLayer: any;
  coordonnees: any;
  private layerPolygons: any;
  heatmapLayerChecked: boolean = true;
  MyBingMapsKey = 'AiNE85E3zuRsGH8anlYXhNW9B83_Wm2X8NhHDVKl1cLJKyHf-4360gbcVml3JMNa'

  @Input() inputData: any[] = [];


  constructor(private service: FormService, private outputService: OutputService) {

  }
  async ngOnInit() {
    this.initMap(this.latitude, this.longitude, this.zomeLevel),
      this.getAllCentre();

  }

  private async initMap(latitude: number, longitude: number, zomeLevel: number) {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });




    this.map = L.map('map').setView([latitude, longitude], zomeLevel);


    this.wMaps = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: "OTM"
    }).addTo(this.map);

  }





  async getAllCentre() {
    this.service.getAll(this.endPoint).subscribe({
      next: value => this.centre = value,
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => {

        this.centre.forEach((item: any) => {
    
          const marker = L.marker([item.latitude, item.longitude]);
          var popupContent = " <strong>Noms:</strong> " +
            item.noms +
            " <br /> " +
            " <strong>Categories:</strong> " +
            item.CategoriesModel.libelle +
            " <br />" ;
          marker.bindPopup(popupContent);
        const data =  marker.addTo(this.map);
        })

      }
    })
  }



}
