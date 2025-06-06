import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IEnvironment } from '../../_helpers/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentLoaderService {
  private envConfig!: IEnvironment;

  constructor(private readonly http: HttpClient) {}

  async loadEnvConfig(configPath: string): Promise<void> {
    this.envConfig = await lastValueFrom(this.http.get<IEnvironment>(configPath));
  }
  getEnvConfig(): IEnvironment {
    return this.envConfig;
  }
  
}