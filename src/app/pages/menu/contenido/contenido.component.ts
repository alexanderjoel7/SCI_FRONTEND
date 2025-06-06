import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent {
  constructor(){
  }
}
export function noEspaciosEnBlancoValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const esEspacioEnBlanco = (control.value || '').trim().length === 0;
    return esEspacioEnBlanco ? { 'espacioEnBlanco': true } : null;
  };
}