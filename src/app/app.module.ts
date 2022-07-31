import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AboutLangComponent } from './componentes/about-lang/about-lang.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { LoginComponent } from './componentes/login/login.component';
import { PersonService } from './service/person.service';
import { TokenService } from './service/token.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AboutLangService } from './service/about-lang.service';
import { AuthService } from './service/auth.service';
import { EducExpService } from './service/educ-exp.service';
import { HeaderComponent } from './componentes/header/header.component';
import { EducExpComponent } from './componentes/educ-exp/educ-exp.component';
import { ProjSkillComponent } from './componentes/proj-skill/proj-skill.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProjSkillService } from './service/proj-skill.service';
import { NewuserComponent } from './componentes/newuser/newuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { GuardsService } from './service/guards.service';
import { InterceptorService } from './service/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutLangComponent,
    PortfolioComponent,
    LoginComponent,
    NewuserComponent,
    HeaderComponent,
    EducExpComponent,
    ProjSkillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 34,
      outerStrokeWidth: 9,
      innerStrokeWidth: 9,
      showBackground: false,
      startFromZero: false,
      showTitle: true,
      space: -11.5,
      showSubtitle: true,
      subtitleFontSize: '12',
      subtitleColor: '#2f535e',
      titleFontSize: '10',
      lazy: false,
      backgroundStroke: 'transparent',
      backgroundGradientStopColor: 'transparent',
    }),
  ],
  providers: [
    PersonService,
    TokenService,
    BsModalService,
    BsModalRef,
    AuthService,
    ProjSkillService,
    EducExpService,
    AboutLangService,
    GuardsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
