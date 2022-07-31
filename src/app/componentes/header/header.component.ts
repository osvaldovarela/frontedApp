import { Component, OnInit, TemplateRef } from '@angular/core';
import { Person } from 'src/app/model/Person';
import { PersonService } from 'src/app/service/person.service';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  person: Person[] = [];

  id: any;
  name: string = '';
  profileImg: string = '';
  texto: string = ';';
  description: string = '';
  backImag: string = '';
  mail: string = '';
  city: string = '';
  country: string = '';
  modalRef?: BsModalRef;
  logged: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    private tokenService: TokenService,
    private modalService: BsModalService
  ) {
    this.personService.getPerson().subscribe((person) => {
      /* console.log(person); */
      this.person = person;
    });
  }

  openModal1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1);
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.logged = true;
    }
    this.isAdmin = this.tokenService.isAdmin();
  }

  signout(): void {
    this.tokenService.logOut();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([this.router.url]);
  }

  editarPersona(person: Person) {
    /* console.log('edit ' + person.id); */
    this.id = person.id;
    this.name = person.name;
    this.description = person.description;
    this.city = person.city;
    this.country = person.country;
    this.personService.editPersona(person).subscribe((person) => {});
    this.modalService.hide();
  }

  print() {
    window.print();
  }
}
