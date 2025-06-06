import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  animations: [
    trigger("fadeIn", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(300)]),
      transition(":leave", animate(200, style({ opacity: 0 }))),
    ]),
  ],
})
export class LoaderComponent {

}