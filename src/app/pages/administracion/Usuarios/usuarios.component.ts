import { Component, ApplicationRef, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../../_shared/loader/shared.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from '../../../_shared/loader/loader.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TablaComponent } from '../../../_component/tablas/tabla/tabla.component';
import { forkJoin } from 'rxjs';
import { Usuarios } from '../../../_model/administracion/usuarios';
import { UsuarioService } from '../../../_service/administracion/usuarios.service'; 

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,ButtonModule, 
    ToastModule,TablaComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [MessageService]
})
export class UsuariosComponent {

  constructor(){
  }
  private ngZone = inject(NgZone);
  private appRef = inject(ApplicationRef);
  private spinner = inject(LoaderService);
  //private usuarioIniciado = inject(UsuarioService);
  private messageService = inject(MessageService);
  public sharedLog = inject(SharedService);
  public dialog = inject(MatDialog);
  private usuariosService = inject (UsuarioService)

 // usuarioLoged=this.sharedLog.usuarioLoged;
  ListaUsuarios: Usuarios[]=[];

  ngOnInit(): void {
    this.spinner.show();
    forkJoin([
      this.usuariosService.obtenerUsuarios(),
    ]).subscribe(([usuarios]) => {
      this.ListaUsuarios = usuarios as Usuarios[];

    });
    
    const stableSubscription = this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        this.ngZone.run(() => {this.spinner.hide();});
        stableSubscription.unsubscribe();
      }
    });    
  }
  columns = [
    { field: 'id_usuario', header: 'Id' },
    { field: 'primer_nombre', header: 'Documento/Actividad' },
    { field: 'segundo_nombre', header: 'Descripción' },
    { field: 'primer_apellido', header: 'Estado' }
  ];
  filter = ['primer_nombre','segundo_nombre','primer_apellido'];
  
  showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  showInfo(cad: string) {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: cad });
  }
  showWarn(cad: string) {
    this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: cad});
  }
  showError(cad: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: cad});
  }

  /*
  addObligacion() {
      const dialogRef = this.dialog.open(NuevoObligacionComponent, {
      });
      dialogRef.afterClosed().subscribe(result => {
        this.actualizaTabla();
      });
  }*/
  actualizaTabla(){
    this.usuariosService.obtenerUsuarios().subscribe(data =>{
      this.ListaUsuarios = data;
    })
  }
/*
  abrirEditarObligacion(row: TipoObligacion) {
    const dialogRef = this.dialog.open(ModificarComponent, {
      data: row, 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.actualizaTabla();
    });
  }
  eliminarObligacion(row: TipoObligacion) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, borrarlo.",
      heightAuto: false,
    }).then((result) => {
    if (result.isConfirmed) {
      this.spinner.show();
      this.tipoObligacionService.eliminarTipoObligacion(row).subscribe(dato =>{
        if(dato.cod_retorno==='000'){
          Swal.fire({
            title: "¡Borrado!",
            position: "center",
            showConfirmButton: false,
            heightAuto: false,
            iconColor: '#39B54A',
            text: dato.mensaje,
            icon: "success",
            timer: 1500
          });
          this.actualizaTabla();
        }
        else{
          this.showError(dato.mensaje);
        }
        this.spinner.hide()
      },error => {this.spinner.hide();this.showError('Tenemos algún problema por favor intentar más tarde');});
    }
    });
  }
    */
}
