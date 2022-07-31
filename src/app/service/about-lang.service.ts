import { Language } from './../model/Language';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { About } from '../model/About';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AboutLangService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLanguage(): Observable<Language[]> {
    return this.http.get<Language[]>(this.apiUrl + '/language/');
  }
  getLanguagebyId(id: number): Observable<Language> {
    const url = `${this.apiUrl + '/language/'}${id}`;
    return this.http.get<Language>(url);
  }
  addLanguage(language: Language): Observable<Language> {
    return this.http.post<Language>(this.apiUrl + '/language/new', language);
  }
  editLanguage(language: Language | number): Observable<Language> {
    const id = typeof language === 'number' ? language : language.id;
    return this.http.put<any>(
      `${this.apiUrl + '/language/edit'}/${id}`,
      language,
      httpOptions
    );
  }
  deleteLanguage(language: Language | number): Observable<Language> {
    const id = typeof language === 'number' ? language : language.id;
    const url = `${this.apiUrl + '/language/delete'}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  getAbout(): Observable<any[]> {
    return this.http.get<About[]>(this.apiUrl + '/about/');
  }
  getAboutid(id: number): Observable<About> {
    const url = `${this.apiUrl + '/about/'}${id}`;
    return this.http.get<About>(url);
  }
  addAbout(about: About): Observable<About> {
    return this.http.post<About>(this.apiUrl + '/about/new', about);
  }

  editAbout(about: About): Observable<any> {
    const id = typeof about === 'number' ? about : about.id;
    return this.http.put<any>(
      `${this.apiUrl + '/about/edit'}/${id}`,
      about,
      httpOptions
    );
  }

  deleteAbout(about: About | number): Observable<About> {
    const id = typeof about === 'number' ? about : about.id;
    const url = `${this.apiUrl + '/about/delete'}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }
}
