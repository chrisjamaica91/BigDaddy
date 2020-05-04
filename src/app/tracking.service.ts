import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addTrackingData() {
    return this.http.post(`${this.baseURL}`, {});

  }

  getTrackingData() {
    return this.http.get<Array<any>>(`${this.baseURL}`);
  }
}
