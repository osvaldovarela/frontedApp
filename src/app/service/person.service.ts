import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../model/Person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getPerson(): Observable<any[]> {
    return this.http.get<Person[]>(this.apiUrl + '/person/');
  }
  getPersonbyId(id: number): Observable<Person> {
    const url = `${this.apiUrl + '/person/'}${id}`;
    return this.http.get<Person>(url);
  }
  addPersona(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl + '/person/new', person);
  }

  editPersona(person: Person): Observable<any> {
    const id = typeof person === 'number' ? person : person.id;

    return this.http.put<any>(
      `${this.apiUrl + '/person/edit'}/${id}`,
      person,
      httpOptions
    );
  }

  deletePersona(person: Person | number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.apiUrl + '/person/delete'}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }
}
