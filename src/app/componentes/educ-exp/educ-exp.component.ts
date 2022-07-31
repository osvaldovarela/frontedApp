import { EducExpService } from './../../service/educ-exp.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/model/Education';
import { Experience } from 'src/app/model/Experience';
import { Person } from 'src/app/model/Person';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educ-exp',
  templateUrl: './educ-exp.component.html',
  styleUrls: ['./educ-exp.component.css'],
})
export class EducExpComponent implements OnInit {
  education: Education[] = [];

  experience: Experience[] = [];

  id: any;
  institution: string = '';
  date: string = '';
  link: string = '';
  title: string = '';
  company: string = '';
  position: string = '';
  endTime: string = '';
  startTime: string = '';
  modalRef?: BsModalRef;
  form: UntypedFormGroup = new UntypedFormGroup({
    institution: new UntypedFormControl(''),
    date: new UntypedFormControl(''),
    link: new UntypedFormControl(''),
    title: new UntypedFormControl(''),
    startTime: new UntypedFormControl(''),
    endTime: new UntypedFormControl(''),
    company: new UntypedFormControl(''),
    position: new UntypedFormControl(''),
  });
  isLogged: boolean = false;
  isAdmin: boolean = false;
  errMsj: string = '';

  constructor(
    private educexpService: EducExpService,
    private FormBuilder: UntypedFormBuilder,
    private modalService: BsModalService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1);
  }
  openModal2(templateed: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateed);
  }
  penModaexp(templateexp: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateexp);
  }

  ngOnInit(): void {
    this.educexpService.getEducation().subscribe((education) => {
      this.education = education;
    });

    this.educexpService.getExperience().subscribe((experience) => {
      this.experience = experience;
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.isAdmin = this.tokenService.isAdmin();
  }

  deleteEdu(education: Education) {
    /*  console.log(education.id); */
    this.education = this.education.filter((e) => e !== education);
    this.educexpService.deleteEducation(education).subscribe();
    this.modalService.hide();
  }

  addEdu() {
    const { id, institution, date, link, title } = this;
    const newEdu = { id, institution, date, link, title };
    this.educexpService.addEducation(newEdu).subscribe((dato) => {
      /* console.log(dato); */
      this.education.push(dato);
    });
    this.modalService.hide();
  }

  editEdu(education: Education) {
    this.id = education.id;
    this.institution = education.institution;
    this.date = education.date;
    this.title = education.title;
    this.link = education.link;
    this.educexpService.editEducation(education).subscribe((education) => {});
    this.modalService.hide();
  }

  editarExp(experience: Experience) {
    this.id = experience.id;
    this.company = experience.company;
    this.startTime = experience.startTime;
    this.endTime = experience.endTime;
    this.position = experience.position;
    this.link = experience.link;
    this.educexpService.editExperience(experience).subscribe((exp) => {});
    this.modalService.hide();
  }

  deleteExp(experience: Experience) {
    /* console.log(experience.id); */
    this.experience = this.experience.filter((e) => e !== experience);
    this.educexpService.deleteExperience(experience).subscribe();
    this.modalService.hide();
  }

  addExp() {
    const { id, company, startTime, endTime, link, position } = this;
    const newExp = { id, company, startTime, endTime, link, position };
    this.educexpService.addExperience(newExp).subscribe((dato) => {
      /* console.log(dato); */
      this.experience.push(dato);
    });
    this.modalService.hide();
  }
}
