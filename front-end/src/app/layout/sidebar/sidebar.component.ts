import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../service/base.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  regions: any []= [];
  data: any []= [];
  points: any []= [];
  departements: any []= [];
  communes: any []= [];
  com=null;
  depart=null;
  title: any;
  formulaire!: any;
  searchs : boolean = false;
  regionsId:any= 0;
  departementsId:any = 0;
  endPoint="region/tiny";
  operateur: any []=[];
  technologies = [
    {code: "2G"},   
     {code: "3G"},
    {code: "4G"},
    {code: "5G"},

  ]
  @Output() outputEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() signalOutpout: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service:FormService,    private fb: FormBuilder,
    ) {}
  ngOnInit() {
    this.getRegion();
    this.geOperateur()
    this.formulaire = this.fb.group({
      regionId: [],
      departementId: [],
      communeId: [],
      operateurs: [null]
    });

  }

  

  chargeDepartement(data: any) {
    this.regionsId = data.value.id
    this.departements = data.value.departements;
  }
  chargeCommunes(data: any) {
    this.departementsId = data.value.id;

    this.communes = data.value.communes;

  }
  getRegion(){
    this.service.getAll(this.endPoint).subscribe({
      next: value =>              this.regions = value,
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () =>     {} ,

    })
  }


  geOperateur(){
    this.service.getAll("operateur").subscribe({
      next: value =>              this.operateur = value,
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () =>     {} ,

    })
  }


  search(){
    this.formulaire.get("regionId").setValue(this.regionsId)
    this.formulaire.get("departementId").setValue(this.departementsId)

    if((this.formulaire.value.regionId > 0 && this.formulaire.value.regionId != null) || (this.formulaire.value.departementId > 0 && this.formulaire.value.departementId != null) || (this.formulaire.value.communeId > 0  && this.formulaire.value.communeId != null)){

      if((this.formulaire.value.regionId > 0  && this.formulaire.value.regionId != null) && (this.formulaire.value.departementId > 0  && this.formulaire.value.departementId != null) && (this.formulaire.value.communeId > 0 && this.formulaire.value.communeId != null)){
        this.searchs = true;
        if(this.formulaire.value.operateurs == ""){
          this.formulaire.get("operateurs").setValue(null)

        }
        this.service.search("region/search",this.formulaire.value).subscribe({
          next: value =>            {       this.searchs = false;         
            this.points = value.bts;
            this.data = value.data.departements[0].communes[0].geom.coordinates[0][0]
            this.title = value.data.departements[0].communes[0].commune
          },
              
          error: err => console.error('Observable emitted an error: ' + err),
          complete: () =>      { this.sendOutputData({"data": this.data, "color":"blue","type":"1", "points":this.points, "title": this.title});
          this.formulaire.reset(); 
          this.searchs = false;
          this.com = null;
          this.depart =null;
          this.departementsId = null;
          this.regionsId = null;
        } ,
    
        })
      }else if((this.formulaire.value.regionId > 0 && this.formulaire.value.regionId != null) && (this.formulaire.value.departementId > 0 && this.formulaire.value.departementId != null) && (this.formulaire.value.communeId == 0 || this.formulaire.value.communeId == null)){
        this.searchs = true;
        this.formulaire.value.communeId= 0;
        if(this.formulaire.value.operateurs == ""){
          this.formulaire.get("operateurs").setValue(null)

        }
        this.service.search("region/search",this.formulaire.value).subscribe({
          next: value =>            {       this.searchs = false;  
            this.points = value.bts;
            this.data = value.data.departements[0].geom.coordinates[0][0];
            this.title = value.data.departements[0].departement;

          },
            
          error: err => console.error('Observable emitted an error: ' + err),
          complete: () =>      {   this.sendOutputData({"data": this.data, "color":"red","type":"1", "points":this.points, "title": this.title});

            this.searchs = false;
            this.formulaire.reset(); 
            this.com = null;
            this.depart =null;
            this.departementsId = null;
            this.regionsId = null;
        } ,
    
        })

      }else if(this.formulaire.value.regionId > 0 && this.formulaire.value.regionId != null   && ( this.formulaire.value.departementId == 0 || this.formulaire.value.departementId == null) && (this.formulaire.value.communeId == 0 || this.formulaire.value.communeId == null)){
        this.searchs = true;
        this.formulaire.value.departementId = 0;
        this.formulaire.value.communeId= 0;
        if(this.formulaire.value.operateurs == ""){
          this.formulaire.get("operateurs").setValue(null)

        }
        this.service.search("region/search",this.formulaire.value).subscribe({
          next: value =>            {       this.searchs = false;    

            this.points = value.bts;
            this.data = value.data.geom.coordinates[0][0];
            this.title = value.data.region;

          },
          error: err => console.error('Observable emitted an error: ' + err),
          complete: () =>      { this.sendOutputData({"data": this.data, "color":"yellow","type":"1", "points":this.points, "title": this.title });

            this.searchs = false;
            this.formulaire.reset(); 
            this.com = null;
            this.depart =null;
            this.departementsId = null;
            this.regionsId = null;
        } ,
    
        })
      }

    }
    else{
      if(this.formulaire.value.operateurs != "" && this.formulaire.value.operateurs != null){  
          this.searchs = true;
          this.getOperateursData(this.formulaire.value.operateurs)
  
      }
      else{
  
        this.searchs = false;
        this.formulaire.reset(); 
        this.com = null;
        this.depart =null;          this.departementsId = null;
        this.regionsId = null;
      }
  
    }
    

  }

  getOperateursData(code:string){
    this.service.getByCode("bts/search",code).subscribe({
      next: value =>            {                this.data = value},
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () =>      {  this.searchs = false,this.formulaire.reset(); this.searchs = false;
        this.com = null;
        this.depart =null;
        this.departementsId = null;
        this.regionsId = null;
        this.sendOutputData({"data": this.data, "color":"red","type":"2"})} ,

    })
  }


  sendOutputData(data:any): void {
    this.outputEvent.emit(data);
  }
  signal(){
    this.signalOutpout.emit("ok");
  }
}
