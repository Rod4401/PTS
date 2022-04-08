import { Component,  ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { JeuComponent } from '../jeu/jeu.component';

@Component({
  selector: 'app-trieur',
  templateUrl: './trieur.component.html',
  styleUrls: ['./trieur.component.css']
})
export class TrieurComponent implements OnInit{
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('tpsJeu') tpsJeu: ElementRef;
  @ViewChild('appID') appID: ElementRef;
  @Input() jeuComponent: JeuComponent;

  croissant: boolean ;
  selecteur : string ;



  constructor() { }

  ngOnInit() : void{
  }

  trier(type: string, changement : boolean = true){
    if(changement){
      if(this.selecteur == type){
        this.croissant = !this.croissant;
      } else {
        this.selecteur = type;
        this.croissant = true;
      }
  }
    this.jeuComponent.trierListe(type+(this.croissant?"Croissant":"Decroissant"),this.searchInput.nativeElement.value );
  }


  recherche() {
    this.trier(this.selecteur,false);
  }

}
