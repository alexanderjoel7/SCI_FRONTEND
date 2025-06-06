import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
//import { UsuarioService } from '../usuario.service';
import { IEnvironment } from '../../_helpers/interfaces/interfaces';
import { EnvironmentLoaderService } from '../helpers/environment-loader.service';
import { catchError } from 'rxjs/operators';
import { TipoObligacion } from '../../_model/administracion/tipo-obligacion';
import { MensajeRetorno } from '../../_model/general/mensaje-retorno';
import { SharedService } from '../../_shared/loader/shared.service';


@Injectable({
  providedIn: 'root'
})
export class TipoObligacionService {
  private listaTipoObligacion = "/administracion/mostrar";
  private insertarTipoObligacion = "/administracion/insertar";
  private editarTipoObligaciones = "/administracion/modificar";
  private eliminarTipoObligaciones = "/administracion/eliminar";
  envConfig: IEnvironment;
  
  constructor(private user: SharedService,private httpClient : HttpClient, private envService: EnvironmentLoaderService) { 
    this.envConfig = this.envService.getEnvConfig();
  }
  
  private manejarError(error: HttpErrorResponse) {
    return throwError('');
  }
  obtenerTipoObligaciones(): Observable<TipoObligacion[]> {
    return this.httpClient.get<TipoObligacion[]>(`${this.user.decryptString(this.envConfig.settings.API_URL)}${this.listaTipoObligacion}`).pipe(
      catchError(this.manejarError)
    );
  }
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
  }
}