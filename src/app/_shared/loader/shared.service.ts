import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
//import { UsuarioServicioService } from './usuario-servicio.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  mostrarLogin: boolean = false;
  usuarioLoged: string = 'acallet';
  constructor(/*private user: UsuarioServicioService*/) {
    //this.usuarioLoged = this.user.getUserEmail() + '';
    //this.mostrarLogin = this.user.getMostrarLogin();
    //this.admin = this.user.getMostrarAdmin();
  }
  //Seguridad en INPUT 
  validateInputNumber(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d/]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
  }
  validateInputText(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ -]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
  }
  validateInputTN(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ1234567890():@#. -]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
  }
  validateInputOnlyTN(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z1234567890]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
  }
  validateInputFecha(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d/]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
    const maxLength = 7; 
    if (inputValue.length > maxLength) {
      formGroup.get(cad)?.setValue(inputValue.slice(0, maxLength));
    }
  }
  validateInputTNL(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-ZñÑáéíóú 1234567()890@.\s-]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
  }
  validateInputEspecial(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-ZñÑáéíóú 1234567:/_()890@.\s-]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
  }
  validateInputCelular(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
    const maxLength = 10; 
    if (inputValue.length > maxLength) {
      formGroup.get(cad)?.setValue(inputValue.slice(0, maxLength));
    }
  }
  validateSalario(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
    const maxLength = 5; 
    if (inputValue.length > maxLength) {
      formGroup.get(cad)?.setValue(inputValue.slice(0, maxLength));
    }
  }
  validateInputCi(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
    const maxLength = 15; 
    if (inputValue.length > maxLength) {
      formGroup.get(cad)?.setValue(inputValue.slice(0, maxLength));
    }
  }
  validateInputUrls(event: any, cad: string, formGroup: FormGroup) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ1234567890:/!?_=@#%*~()'. -]/g, '');
    formGroup.get(cad)?.setValue(sanitizedValue);
  }
  
  encryptString(str: string): string {
    return btoa(str);
  }
  decryptString(encodedStr: string): string {
    return atob(encodedStr);
  }
}
