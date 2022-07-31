import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../model/Project';
import { Skill } from '../model/Skill';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProjSkillService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProybyId(id: number): Observable<Project> {
    const url = `${this.apiUrl + '/project/'}${id}`;
    return this.http.get<Project>(url);
  }
  getSkillbyId(id: number): Observable<Skill> {
    const url = `${this.apiUrl + '/skill/'}${id}`;
    return this.http.get<Skill>(url);
  }
  getProject(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + '/project/');
  }
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl + '/project/new', project);
  }
  editProject(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    return this.http.put<any>(
      `${this.apiUrl + '/project/edit'}/${id}`,
      project,
      httpOptions
    );
  }

  deleteProject(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.apiUrl + '/project/delete'}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl + '/skill/');
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl + '/skill/new', skill);
  }

  deleteSkills(skill: Skill | number): Observable<Skill> {
    const id = typeof skill === 'number' ? skill : skill.id;
    const url = `${this.apiUrl + '/skill/delete'}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  editSkill(skill: Skill | number): Observable<Skill> {
    const id = typeof skill === 'number' ? skill : skill.id;
    return this.http.put<any>(
      `${this.apiUrl + '/skill/edit'}/${id}`,
      skill,
      httpOptions
    );
  }
}
