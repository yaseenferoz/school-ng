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
  private tokenKey = 'auth_token';
  private sessionExpirationMinutes = 30;

  constructor(private http: HttpClient) {
    this.loggedInSubject = new BehaviorSubject<boolean>(false);
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/login', { username, password }).pipe(
      tap((response) => {
        const { token } = response;
        this.storeToken(token);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError('Login failed. Please try again.'); // Customize error message as needed
      })
    );
  }
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private isTokenExpired(token: string): boolean {
    const expiration = this.getTokenExpiration(token);
    if (!expiration) {
      return false;
    }
    return Date.now() > expiration;
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      return exp * 1000; // Convert to milliseconds
    } catch (error) {
      return null;
    }
  }

  checkLoginStatus(): Observable<boolean> {
    return this.http.get<boolean>('/api/isLoggedIn').pipe(
      tap((loggedIn: boolean) => {
        this.loggedInSubject.next(loggedIn);
      })
    );
  }
}
