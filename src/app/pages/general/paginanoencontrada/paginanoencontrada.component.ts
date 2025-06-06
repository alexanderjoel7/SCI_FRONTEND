import { Component } from '@angular/core';

@Component({
  selector: 'app-paginanoencontrada',
  imports: [],
  templateUrl: './paginanoencontrada.component.html',
  styleUrl: './paginanoencontrada.component.css'
})
export class PaginanoencontradaComponent {
  goBack(): void {
    window.history.back();
  }
}
