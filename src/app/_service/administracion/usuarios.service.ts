import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
//import { UsuarioService } from '../usuario.service';
import { IEnvironment } from '../../_helpers/interfaces/interfaces';
import { EnvironmentLoaderService } from '../helpers/environment-loader.service';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../../_shared/loader/shared.service';
import { Usuarios } from '../../_model/administracion/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private listaUsuarios = "/usuarios/mostrar";
  /*
  private insertarTipoObligacion = "/administracion/insertar";
  private editarTipoObligaciones = "/administracion/modificar";
  private eliminarTipoObligaciones = "/administracion/eliminar";*/
  envConfig: IEnvironment;
  
  constructor(private user: SharedService,private httpClient : HttpClient, private envService: EnvironmentLoaderService) { 
    this.envConfig = this.envService.getEnvConfig();
  }
  
  private manejarError(error: HttpErrorResponse) {
    return throwError('');
  }
  obtenerUsuarios(): Observable<Usuarios[]> {
    return this.httpClient.get<Usuarios[]>(`${this.user.decryptString(this.envConfig.settings.API_URL)}${this.listaUsuarios}`).pipe(
      catchError(this.manejarError)
    );
  }

  /*
  registrarTipoObligacion(data: TipoObligacion) : Observable<MensajeRetorno>{
    return this.httpClient.post<MensajeRetorno>(this.user.decryptString(this.envConfig.settings.API_URL)+this.insertarTipoObligacion,data).pipe(
      catchError(this.manejarError)
    ); 
  }
  editarTipoObligacion(data: TipoObligacion) : Observable<MensajeRetorno>{
    return this.httpClient.post<MensajeRetorno>(this.user.decryptString(this.envConfig.settings.API_URL)+this.editarTipoObligaciones,data).pipe(
      catchError(this.manejarError)
    ); 
  }
  eliminarTipoObligacion(dato: TipoObligacion): Observable<MensajeRetorno> {
    return this.httpClient.post<MensajeRetorno>(`${this.user.decryptString(this.envConfig.settings.API_URL)}${this.eliminarTipoObligaciones}`,dato).pipe(
      catchError(this.manejarError)
    ); 
  }*/

}