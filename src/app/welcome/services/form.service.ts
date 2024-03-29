// form.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://localhost:3000/api/forms'; // Assuming your backend server is running on the same domain

  constructor(private http: HttpClient) {}

  addForm(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  editForm(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteForm(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getForms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
