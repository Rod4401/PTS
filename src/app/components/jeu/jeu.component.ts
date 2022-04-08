import { AfterContentInit, Component,ViewChild, ElementRef, Input } from '@angular/core';
import { Jeu, RecentGames, ResponseGames } from './class';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-jeu',
  templateUrl: `./jeu.component.html`,
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent {
  listJeu: Jeu[] = [];
  listJeuPrincipal: Jeu[] = [];
  listJeuPlus: Jeu[] = [];

  debordement: boolean = false;
  nbColonnes: string = "";
  customHtml: string ="";

  posPlus : string[] = [];

  //Pour l'affichage d'une carte de jeu
  jeuSelected : Jeu = null;
  affichageCarte : boolean = false;

  @Input() steamId = "";

  constructor(private http: HttpClient) { }

  afficherCarteJeu(jeu : Jeu){
    //Si on affiche déjà un jeu on ne fait rien
    if(this.affichageCarte)return;

    this.jeuSelected = jeu;
    this.affichageCarte = true;
  }

  masquerCarteJeu(){
    this.affichageCarte = false;
    this.jeuSelected = null;
  }


  getAllGames() {
    this.http.get<any>(`http://localhost:3080/gameList/${this.steamId}`).pipe( map((value: ResponseGames) => {return value})).subscribe((res: ResponseGames) =>{
      this.chargerJeux(res.response.games);
    });
  }

  getAllRecentsGames() {
    this.http.get<any>(`http://localhost:3080/recentGames/${this.steamId}`).pipe( map((value: ResponseGames) => {return value})).subscribe((res: ResponseGames) =>{
      this.chargerJeux(res.response.games);
    });
  }

  ngOnInit(){
    this.getAllGames();
  }

  chargerJeux(liste : Jeu[]){
    try{
      this.listJeu = liste;
      this.construireListes(this.listJeu);
    } catch(error){
      console.log("Aucun jeu trouvé");
    }
  }

  trierListe(typeTri: string = "nameCroissant", name : string = ""){
    let listJeuBuff = this.listJeu.map(x => Object.assign({}, x));
    //Maintenant on tri les jeux
    switch(typeTri){
      case "nameCroissant": listJeuBuff.sort(function(a,b){return a.name.localeCompare(b.name)}); break;
      case "nameDecroissant": listJeuBuff.sort(function(a,b){return b.name.localeCompare(a.name)}); break;
      case "tpsJeuCroissant" : listJeuBuff.sort(function(a,b){return a.playtime_forever - b.playtime_forever}); break;
      case "tpsJeuDecroissant" : listJeuBuff.sort(function(a,b){return b.playtime_forever - a.playtime_forever}); break;
      case "appIDCroissant" : listJeuBuff.sort(function(a,b){return a.appid - b.appid}); break;
      case "appIDDecroissant" : listJeuBuff.sort(function(a,b){return b.appid - a.appid}); break;
    }
    this.rechercher(name,listJeuBuff);
  }

  rechercher(nom: string = "", listJeu: Jeu[] = []){
    let listJeuBuff: Jeu[] = [];
    if(nom != ""){
      nom = nom.toUpperCase();
      for(let jeu of listJeu){
        if(jeu.name.toUpperCase().includes(nom))
        listJeuBuff.push(jeu);
      }
    } else {
      listJeuBuff = listJeu;
    }
    this.construireListes(listJeuBuff);
  }


  construireListes(liste : Jeu[]){
    this.listJeuPrincipal = [];
    this.listJeuPlus = [];
    var longueurFinale :number = 0;
    for(longueurFinale = liste.length;(longueurFinale%6) != 0;longueurFinale--);
    var i : number = 0;

    for(i = 0;i<longueurFinale;i++){
      this.listJeuPrincipal.push(liste[i]);
    }

    for(i;i< liste.length;i++){
      this.listJeuPlus.push(liste[i]);
    }

    if(this.listJeuPlus.length != 0)
      this.debordement = true;
    else this.debordement = false;

    this.posPlus[1] = "";

    switch(this.listJeuPlus.length){
      case 1 : this.posPlus[0] = "col-lg-offset-2 pt-5";  this.posPlus[2] = "col-lg-offset-4 col-lg-2"; break;
      case 2 : this.posPlus[0] = "col-lg-offset-2 pt-5"; this.posPlus[2] = "col-lg-offset-1 col-lg-5"; break;
      case 3 : this.posPlus[0] = "col-lg-offset-2 pt-5"; this.posPlus[2] = "col-lg-offset col-lg-4"; break;
      case 4 : this.posPlus[0] = "pt-5"; this.posPlus[1] = "col-lg-3 pt-5"; this.posPlus[2] = "col-lg-offset-3 col-lg-6"; break;
      case 5 : this.posPlus[0] = "col-lg-offset-1 pt-5"; this.posPlus[1] = "col-lg-2 pt-5"; this.posPlus[2] = "col-lg-3"; break;
    }
  }
}
