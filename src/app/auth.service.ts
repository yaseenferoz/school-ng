// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.loggedInSubject = new BehaviorSubject<boolean>(false);
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('https://school-backend-fs0m.onrender.com/api/login', { username, password }).pipe(
      tap(() => {
        this.loggedInSubject.next(true);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError('Login failed. Please try again.'); // Customize error message as needed
      })
    );
  }

  logout(): void {
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  checkLoginStatus(): Observable<boolean> {
    return this.http.get<boolean>('/api/isLoggedIn').pipe(
      tap((loggedIn: boolean) => {
        this.loggedInSubject.next(loggedIn);
      })
    );
  }
}
