import { Component, OnInit, Input } from '@angular/core';
import { Player, Profil, ResponseProfil } from './class';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  @Input() steamId = "";
  profil : Player = null;

  constructor(private http: HttpClient) { }

  getAllInfos() {
    this.http.get<any>(`http://localhost:3080/playerStats/${this.steamId}`).pipe( map((value: ResponseProfil) => {return value})).subscribe((res: ResponseProfil) =>{
      this.chargerProfil(res.response.players[0]);
    });
  }

  ngOnInit(){
    this.getAllInfos();
  }

  chargerProfil(liste : Player){
      this.profil = liste;

  }

}
