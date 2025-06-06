import { Component,inject,OnInit  } from '@angular/core';
import { SharedService } from '../../../_shared/loader/shared.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
//import { UsuarioService } from '../../../_service/usuario.service';
//import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { ContenidoComponent } from '../contenido/contenido.component';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';


import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule,MatDividerModule,
    MatMenuModule,ContenidoComponent, MatListModule,MatToolbarModule, MatButtonModule, 
    MatIconModule, MatExpansionModule,RouterLink,
    MatGridListModule, RouterLinkActive, CommonModule,DrawerModule, ButtonModule, AvatarModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent implements OnInit{

  private sharedService = inject(SharedService);
  //private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private appcomponent = inject(AppComponent);
  private breakpointObserver = inject(BreakpointObserver);

  @ViewChild('drawer') drawer: MatDrawer;
  isSmallScreen: boolean = false;

  menuAdministracionAbierto: boolean = false;
  menuOperacionesAbierto: boolean = false;
  isRutaAdministracionActiva(): boolean {
    return this.router.url.includes('/panel/usuarios') || this.router.url.includes('/panel/');
  }
  isRutaOperacionesActiva(): boolean {
    return this.router.url.includes('/panel/obligaciones');
  }
  
  
  recarga: boolean = false;
  usuarioLoged: string;
  nodatosllenos: boolean=true;
  version: string = this.appcomponent.version;
  mostrarBotonMenu: boolean = false;

  constructor(){
    this.sharedService.mostrarLogin=false;
    //this.usuarioLoged=this.usuarioService.getUserEmail()+'';
    this.usuarioLoged=this.sharedService.usuarioLoged;
    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.Handset])
    .subscribe(result => {
      this.isSmallScreen = result.matches;
      if (this.isSmallScreen) {
        this.mostrarBotonMenu = true;
      }
    });
  }
  toggleMenu(): void {
    this.drawer.toggle();
    this.mostrarBotonMenu = !this.mostrarBotonMenu;
    if(this.isSmallScreen){
      this.mostrarBotonMenu=true;
    }
  }
  
  ngOnInit() {
      
  }
  closeDrawer() {
    if (this.isSmallScreen) {
      this.drawer.close();
    }
  }
  logout() {
      //this.usuarioService.logout();
      window.location.href = '/';
  }

  
  navegarConRecarga() {
    const currentUrl = this.router.url;  
    this.router.navigateByUrl('asdf', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
    });
  }
}