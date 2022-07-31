import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { About } from 'src/app/model/About';
import { Language } from 'src/app/model/Language';
import { Person } from 'src/app/model/Person';
import { PersonService } from 'src/app/service/person.service';
import { TokenService } from 'src/app/service/token.service';
import { AboutLangService } from 'src/app/service/about-lang.service';

@Component({
  selector: 'app-about-lang',
  templateUrl: './about-lang.component.html',
  styleUrls: ['./about-lang.component.css'],
})
export class AboutLangComponent implements OnInit {
  language: Language[] = [];
  about: About[] = [];

  id: any;
  level: string = '';
  text: string = '';
  languages: string = '';
  modalRef?: BsModalRef;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  errMsj: string = '';

  constructor(
    private aboutlangService: AboutLangService,
    private tokenService: TokenService,
    private modalService: BsModalService,
    private personService: PersonService
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalid(templateid: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateid);
  }
  openModaledid(templateedid: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateedid);
  }
  openModaldelid(templatedelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatedelete);
  }

  ngOnInit(): void {
    this.aboutlangService.getAbout().subscribe((data) => {
      /* console.log(data); */
      this.about = data;
    });

    this.aboutlangService.getLanguage().subscribe((data) => {
      this.language = data;
    });
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.isAdmin = this.tokenService.isAdmin();
  }
  editAbt(about: About) {
    /* console.log('edit ' + about.id); */
    this.id = about.id;
    this.text = about.text;
    this.aboutlangService.editAbout(about).subscribe((about) => {});
    this.modalService.hide();
  }

  deleteLang(language: Language) {
    /* console.log(language.id); */
    this.aboutlangService.deleteLanguage(language).subscribe(() => {
      this.language = this.language.filter((e) => e !== language);
    });
    this.modalService.hide();
  }

  addLang() {
    const { id, languages, level } = this;
    const newIdioma = { id, languages, level };
    this.aboutlangService.addLanguage(newIdioma).subscribe((dato) => {
      /* console.log(dato); */
      this.language.push(dato);
    });
    this.modalService.hide();
  }

  editLang(language: Language) {
    this.id = language.id;
    this.languages = language.languages;
    this.level = language.level;
    this.aboutlangService.editLanguage(language).subscribe((language) => {});
    this.modalService.hide();
  }
}
