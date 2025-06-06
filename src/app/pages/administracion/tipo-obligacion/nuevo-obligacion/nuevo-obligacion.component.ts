import { inject } from '@angular/core';
import { ApplicationRef, Component, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
import { TipoObligacion } from '../../../../_model/administracion/tipo-obligacion';

@Component({
  selector: 'app-nuevo-obligacion',
  standalone: true,
  imports: [ToastModule,ButtonModule,MatDialogModule,ReactiveFormsModule,CommonModule],
  templateUrl: './nuevo-obligacion.component.html',
  styleUrl: './nuevo-obligacion.component.css',
  providers: [MessageService]
})
export class NuevoObligacionComponent {

  datosNuevoObligacion = new FormGroup({
    documento: new FormControl('', [Validators.required,Validators.maxLength(200),noEspaciosEnBlancoValidator()]),
    descripcion: new FormControl('', [Validators.required,Validators.maxLength(500),noEspaciosEnBlancoValidator()]),
  });

  obligacionNuevo : TipoObligacion = new TipoObligacion();
 
  constructor(){

  }
  readonly ngZone = inject(NgZone);
  readonly appRef = inject(ApplicationRef);
  readonly spinner = inject(LoaderService);
  readonly dialogRef = inject(MatDialogRef<NuevoObligacionComponent>);
  readonly messageService = inject(MessageService);
  readonly sharedLog = inject(SharedService);
  private tipoObligacionService = inject(TipoObligacionService);
  clicEnviar: boolean = false;

  
  ngOnInit() {
    this.spinner.show();
    const stableSubscription = this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        this.ngZone.run(() => {this.spinner.hide();});
        stableSubscription.unsubscribe();
      }
    });
  }
  asignarValores(){
    this.obligacionNuevo.documento=''+this.datosNuevoObligacion.get('documento')?.value?.trim();
    this.obligacionNuevo.descripcion=''+this.datosNuevoObligacion.get('descripcion')?.value?.trim();
  }

  cerrarDialog(){
    this.dialogRef.close();
  }
  nuevo(){
    if(this.datosNuevoObligacion.invalid){
      this.clicEnviar=true;
      this.showError('Faltan llenar campos obligatorios.');
    }
    else{
        this.spinner.show();
        this.asignarValores();
        const datosTipoObligacionFormat = this.obligacionNuevo.toAddFormat();
        this.tipoObligacionService.registrarTipoObligacion(datosTipoObligacionFormat).subscribe(dato =>{
          if(dato.cod_retorno ==='000'){
            this.confirmaCreacion(dato.mensaje+'');
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
  
  confirmaCreacion(mensaje: string){
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
      this.sharedLog.validateInputNumber(event,cad,this.datosNuevoObligacion);
  }
  validateInputCelular(event: any,cad: string) {
    this.sharedLog.validateInputCelular(event,cad,this.datosNuevoObligacion);
  }
  validateInputCi(event: any,cad: string) {
    this.sharedLog.validateInputCi(event,cad,this.datosNuevoObligacion);
  }
  validateInputText(event: any,cad: string) {
    this.sharedLog.validateInputText(event,cad,this.datosNuevoObligacion);
  }
  validateInputTNL(event: any,cad: string) {
    this.sharedLog.validateInputTNL(event,cad,this.datosNuevoObligacion);
  }
  validateInputTN(event: any,cad: string) {
    this.sharedLog.validateInputTN(event,cad,this.datosNuevoObligacion);
  }
  validateInputUrls(event: any,cad: string) {
    this.sharedLog.validateInputUrls(event,cad,this.datosNuevoObligacion);
  }
  validateInputFecha(event: any,cad: string) {
    this.sharedLog.validateInputFecha(event,cad,this.datosNuevoObligacion);
  }
  
}






