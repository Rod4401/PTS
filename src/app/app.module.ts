import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeAmisComponent } from './components/liste-amis/liste-amis.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { ProfilComponent } from './components/profil/profil.component';
import { HttpClientModule } from '@angular/common/http';
import { TrieurComponent } from './components/trieur/trieur.component';
import { DeconnexionComponent } from './components/deconnexion/deconnexion.component';
import { ConnexionComponent } from './components/connexion/connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeAmisComponent,
    JeuComponent,
    ProfilComponent,
    TrieurComponent,
    DeconnexionComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
