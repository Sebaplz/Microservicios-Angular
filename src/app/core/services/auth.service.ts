import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, UserCredentials, JwtPayload } from '../interfaces/auth.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly API_URL = environment.apiUrl;
  private userEmail = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          this.userEmail.next(decodedToken.email);
        } else {
          this.logout();
        }
      } catch {
        this.logout();
      }
    }
  }

  login(credentials: UserCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        const decodedToken = jwtDecode<JwtPayload>(response.token);
        this.userEmail.next(decodedToken.email);
      }),
      catchError(error => {
        // Puedes personalizar el mensaje aquí si es necesario
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  register(credentials: UserCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, credentials);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userEmail.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
