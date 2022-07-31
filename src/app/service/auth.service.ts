import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginUser } from 'src/app/model/LoginUser';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../model/Jwt-Dto';

import { NewUser } from '../model/New-User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public new(newUser: NewUser): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/auth/new', newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.apiUrl + '/auth/login', loginUser);
  }

  public refresh(dto: JwtDto): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.apiUrl + '/auth/refresh', dto);
  }
}
