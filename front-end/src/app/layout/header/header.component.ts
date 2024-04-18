import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../service/base.service';
import { AuthentificationService } from '../../service/auth.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as proj4 from 'proj4';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  visible: boolean = false;
  visible1: boolean = false;
  listUsers: boolean = false;
  state: boolean = false;
  deleteState: boolean = false;
  visibleBts: boolean = false;
  deleteUsers: boolean = false;
  formulaire!: any;
  convertFormulaire!: any;
  filter!: any;
  centreFormulaire!: any;
  submitted!: any;
  error!: any;
  users: any;
  user: any = {};
  regions: any;
  bts: any;
  depart = "";
  categories!:any;
  regionMdel = "";
  importDialog: boolean = false;
  imported: boolean = false;
  useState: boolean = false;
  status: boolean = false;
  statusBts: boolean = false;
  load: boolean = false;
  centres!: any;
  addUsers: boolean = false;
  addCategorie: boolean = false;
  categoriesFormulaire:any;
  x:any;
  y:any;
  convert: boolean = false;
  @ViewChild('op') overlayPanel!: OverlayPanel;

  constructor(private sidebarService: SidebarService,
    private service: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authentification: AuthentificationService) { }
  ngOnInit(): void {

    this.authentification._isLoggedIn$.subscribe((value: any) => {
      this.state = value;
    })
    this.formulaire = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],

    });
    this.centreFormulaire = this.fb.group({
      noms: ["", Validators.required],
      CategoriesModelId: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]

    });
    this.categoriesFormulaire = this.fb.group({
      libelle: ["", Validators.required],

    });

    this.convertFormulaire = this.fb.group({
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
    this.getCategories();
  }
  get longitudes() { return this.convertFormulaire.get('longitude'); }
  get latitudes() { return this.convertFormulaire.get('latitude'); }

  get name() { return this.centreFormulaire.get('noms'); }
  get CategoriesModelId() { return this.centreFormulaire.get('CategoriesModelId'); }
  get longitude() { return this.centreFormulaire.get('longitude'); }
  get latitude() { return this.centreFormulaire.get('latitude'); }

 get libelle(){ return this.categoriesFormulaire.get("libelle")}
  get username() { return this.formulaire.get('username'); }
  get password() { return this.formulaire.get('password'); }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  // Open delete Dialog
  delete(val: any) {
    this.deleteUsers = true;
    this.user = { ...val };
  }
  // confirmation delete users
  confirmDelete() {
    this.deleteState = true;
    this.service.delete("users" + "/" + this.user.id).subscribe(
      {
        next: value => { },
        error: err => {
          this.deleteState = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
        },
        complete: () => {
          this.deleteUsers = false;
          this.deleteState = false;

          this.getCategories();
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: "Utilisateur Supprimé avec succés", life: 3000 });
        }
      }

    )
  }


  addCentreInteret() {
    this.visible1 = true;
    this.getAllcentre();
  }
  addCategories() {
    this.addCategorie = true;

  }


  addCentreDialog() {
    this.addUsers = true;
  }

  async onFileChange($event: any) {


  }
  listCategroreisData() {
    this.listUsers = true;
    this.getCategories();
  }
  getCategories() {
    this.status = true;
    this.service.getAll("categories").subscribe({
      next: value => this.categories = value,
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => this.status = false,

    })
  }


  closeBts() {
    this.visible1 = false;
  }
  listCentre() {
    this.visibleBts = true;
    this.getAllcentre();

  }


  Convert() {
    this.imported = false;
    this.importDialog = true;
  }

  login() {
    if (this.formulaire.invalid) {
      // Marquez tous les champs comme touchés pour afficher les erreurs
      this.formulaire.markAllAsTouched();
    } else {
      this.submitted = true;
      this.authentification.login(this.formulaire.value).subscribe((result) => {
        this.submitted = false;
        this.visible = false;
      },
        (error) => {
          this.submitted = false;
          this.error = error.message
        }
      )

    }


  }
  logout() {
    this.overlayPanel.hide();

    this.authentification.logout()
  }
  addCentres() {
    
    if (this.centreFormulaire.invalid) {
      // Marquez tous les champs comme touchés pour afficher les erreurs
      this.centreFormulaire.markAllAsTouched();
    } else {
      this.useState = true
      this.service.create("centreinteret", this.centreFormulaire.value).subscribe({
        next: value => { },
        error: err => {
          console.error('Observable emitted an error: ' + err);
          this.useState = false;
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.message, life: 3000 });

        },
        complete: () => {
          this.useState = false;
          this.addUsers = false;
          this.centreFormulaire.reset();
          this.getAllcentre();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur enregistré avec success', life: 3000 });
        },

      });
    }
  }
  SaveCatgerories(){
    if (this.categoriesFormulaire.invalid) {
      // Marquez tous les champs comme touchés pour afficher les erreurs
      this.categoriesFormulaire.markAllAsTouched();
    } else {
      this.useState = true
      this.service.create("categories", this.categoriesFormulaire.value).subscribe({
        next: value => { },
        error: err => {
          console.error('Observable emitted an error: ' + err);
          this.useState = false;
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.message, life: 3000 });

        },
        complete: () => {
          this.useState = false;
          this.addCategorie = false;
          this.categoriesFormulaire.reset();
          this.getCategories();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'categories enregistré avec success', life: 3000 });
        },

      });
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
 
 getAllcentre(){
  this.status = true;
    this.service.getAll("centreinteret").subscribe({
      next: value => this.centres = value,
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => this.status = false,

    })
 }
 converts(){
  if (this.convertFormulaire.invalid) {
    this.convertFormulaire.markAllAsTouched();
  } else {

    const source = '+proj=longlat +datum=WGS84 +no_defs';

    const target = '+proj=utm +zone=30 +datum=WGS84 +units=m +no_defs'; 

    const coordonneesConverties = proj4(source, target, [parseInt(this.convertFormulaire.value.longitude), parseInt(this.convertFormulaire.value.latitude)]);

    this.x = coordonneesConverties[0];
    this.y =  coordonneesConverties[1]
  }

  }

}
