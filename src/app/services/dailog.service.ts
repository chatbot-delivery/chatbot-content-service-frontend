import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DailogModel } from '../models/dailog';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DailogService {

  constructor(private api: HttpClient) { }

  public getDailogData(language: string): Observable<DailogModel[]> {
    let params = new HttpParams();
    params = params.append('language', language)
    return this.api.get<DailogModel[]>(`https://chatbot-content-service.azurewebsites.net/dialogs`, { params })
  }

  public getLanguageList(): Observable<string[]> {
    return this.api.get<string[]>('https://chatbot-content-service.azurewebsites.net/dialogs/languages')
  }

  public updateDailog(params: DailogModel) {
    return this.api.post('https://chatbot-content-service.azurewebsites.net/dialogs', params)
  }
}
