import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Education } from '../model/Education';
import { Experience } from '../model/Experience';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EducExpService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEducation(): Observable<any[]> {
    return this.http.get<Education[]>(this.apiUrl + '/education/');
  }
  getEdubyId(id: number): Observable<Education> {
    const url = `${this.apiUrl + '/education/'}${id}`;
    return this.http.get<Education>(url);
  }

  getExpbyId(id: number): Observable<Experience> {
    const url = `${this.apiUrl + '/experience/'}${id}`;
    return this.http.get<Experience>(url);
  }

  getExperience(): Observable<any[]> {
    return this.http.get<Experience[]>(this.apiUrl + '/experience/');
  }

  addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.apiUrl + '/education/new', education);
  }

  editEducation(education: Education | number): Observable<Education> {
    const id = typeof education === 'number' ? education : education.id;
    return this.http.put<any>(
      `${this.apiUrl + '/education/edit'}/${id}`,
      education,
      httpOptions
    );
  }

  deleteEducation(education: Education | number): Observable<Education> {
    const id = typeof education === 'number' ? education : education.id;
    const url = `${this.apiUrl + '/education/delete'}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  deleteExperience(experience: Experience | number): Observable<any> {
    const id = typeof experience === 'number' ? experience : experience.id;

    const url = `${this.apiUrl + '/experience/delete'}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  addExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(
      this.apiUrl + '/experience/new',
      experience
    );
  }
  editExperience(experience: Experience | number): Observable<Experience> {
    const id = typeof experience === 'number' ? experience : experience.id;
    return this.http.put<any>(
      `${this.apiUrl + '/experience/edit'}/${id}`,
      experience,
      httpOptions
    );
  }
}
