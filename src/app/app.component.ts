import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './_shared/loader/loader.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SharedService } from './_shared/loader/shared.service';
import { LoaderComponent } from './_shared/loader/loader/loader.component';
import { CommonModule } from '@angular/common'; 
import { NavMenuComponent } from './pages/menu/nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoaderComponent,NavMenuComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(0px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ])
    ]),
    trigger("fadeIn", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(0)]),
      transition(":leave", animate(200, style({ opacity: 0 }))),
    ]),
  ],
})
export class AppComponent {
  title = 'Kinder Santa Ana';
  nombreBanco = 'Kinder Santa Ana';
  siglaBanco = 'Kinder Santa Ana';
  version='Versión 1.0.0';
  constructor(public sharedService: SharedService,public spinner:LoaderService/*,private cookieService:CookieService*/){
    //this.cookieService.delete("sessionToken", '/');
  }
}
