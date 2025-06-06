import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoObligacion } from '../../../../_model/administracion/tipo-obligacion';
import { ApplicationRef, NgZone } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedService } from '../../../../_shared/loader/shared.service';
import { MessageService } from 'primeng/api';
import { noEspaciosEnBlancoValidator } from '../../../menu/contenido/contenido.component';
import { LoaderService } from '../../../../_shared/loader/loader.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoObligacionService } from '../../../../_service/administracion/tipo-obligacion.service';


@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [ToastModule,ButtonModule,MatDialogModule,ReactiveFormsModule,CommonModule],
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.css',
  providers: [MessageService]
})
export class ModificarComponent {

  public dialogRef = inject(MatDialogRef<ModificarComponent>);
  public datosObligacion = inject(MAT_DIALOG_DATA) as TipoObligacion;
  readonly ngZone = inject(NgZone);
  readonly appRef = inject(ApplicationRef);
  readonly spinner = inject(LoaderService);
  readonly messageService = inject(MessageService);
  readonly sharedLog = inject(SharedService);
  private tipoObligacionService = inject(TipoObligacionService);
  clicEnviar: boolean = false;
  addTipoObligacion: TipoObligacion= new TipoObligacion();

  constructor(){

  }
  datosEditarObligacion = new FormGroup({
    documento: new FormControl('', [Validators.required,Validators.maxLength(200),noEspaciosEnBlancoValidator()]),
    descripcion: new FormControl('', [Validators.required,Validators.maxLength(500),noEspaciosEnBlancoValidator()]),
  });

  ngOnInit() {
    this.spinner.show();
    this.asignarValoresRev(this.datosObligacion);
    const stableSubscription = this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        this.ngZone.run(() => {this.spinner.hide();});
        stableSubscription.unsubscribe();
      }
    });
  }
  asignarValoresRev(datos: TipoObligacion) {
    this.datosEditarObligacion.patchValue({
      documento: datos.documento.trim(),
      descripcion: datos.descripcion.trim(),
    });
  }

  asignarValores(){
    this.addTipoObligacion.sec_tipo_obligacion=this.datosObligacion.sec_tipo_obligacion;
    this.addTipoObligacion.documento=''+this.datosEditarObligacion.get('documento')?.value?.trim();
    this.addTipoObligacion.descripcion=''+this.datosEditarObligacion.get('descripcion')?.value?.trim();
  }
  cerrarDialog(){
    this.dialogRef.close();
  }
  guardarCambios(){ 
    if(this.datosEditarObligacion.invalid){
      this.clicEnviar=true;
      this.showError('Faltan llenar campos obligatorios.');
    }
    else{
      this.spinner.show();
      this.asignarValores();
      const datosEditarTipoObligacion = this.addTipoObligacion.toEditFormat();
      this.tipoObligacionService.editarTipoObligacion(datosEditarTipoObligacion).subscribe(dato =>{
        if(dato.cod_retorno==='000'){
          this.confirmaEditar(dato.mensaje);
          this.cerrarDialog();
        }
        else{
          this.showError(dato.mensaje);
        }
        this.spinner.hide();
      },error => {this.spinner.hide();this.showError('Tenemos algún problema por favor intentar más tarde');});
      this.cerrarDialog();
    }
  }
  showWarn(cad: string) {
    this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: cad});
  }
  showError(cad: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: cad});
  }
  
  confirmaEditar(mensaje: string){
    Swal.fire({
      position: "center",
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      heightAuto: false,
      iconColor: '#39B54A',
      timer: 1600
    });
  }
  
//Seguridad en INPUT 
  validateInputNumber(event: any,cad: string) {
      this.sharedLog.validateInputNumber(event,cad,this.datosEditarObligacion);
  }
  validateInputCelular(event: any,cad: string) {
    this.sharedLog.validateInputCelular(event,cad,this.datosEditarObligacion);
  }
  validateInputCi(event: any,cad: string) {
    this.sharedLog.validateInputCi(event,cad,this.datosEditarObligacion);
  }
  validateInputText(event: any,cad: string) {
    this.sharedLog.validateInputText(event,cad,this.datosEditarObligacion);
  }
  validateInputTNL(event: any,cad: string) {
    this.sharedLog.validateInputTNL(event,cad,this.datosEditarObligacion);
  }
  validateInputTN(event: any,cad: string) {
    this.sharedLog.validateInputTN(event,cad,this.datosEditarObligacion);
  }
  validateInputUrls(event: any,cad: string) {
    this.sharedLog.validateInputUrls(event,cad,this.datosEditarObligacion);
  }
  validateInputFecha(event: any,cad: string) {
    this.sharedLog.validateInputFecha(event,cad,this.datosEditarObligacion);
  }

}
