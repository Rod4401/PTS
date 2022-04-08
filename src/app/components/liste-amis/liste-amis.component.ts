import { Component, OnInit, Input } from '@angular/core';
import { Friend, ResponseFriend } from './class';
import { Player, Profil, ResponseProfil } from '../profil/class';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-liste-amis',
  templateUrl: './liste-amis.component.html',
  styleUrls: ['./liste-amis.component.css']
})
export class ListeAmisComponent implements OnInit {

  @Input() steamId = "";
  listeFriend : Friend[] = [];
  listeProfilsFriends : Player[] = [];
  affichage : boolean = false;
  dateAmis : Date = new Date();

  constructor(private http: HttpClient) { }

  getAllFriend() {
    this.http.get<any>(`http://localhost:3080/friendList/${this.steamId}`).pipe( map((value: ResponseFriend) => {return value})).subscribe((res: ResponseFriend) =>{
      this.chargerFriend(res.friendslist.friends);
    });
  }

  ngOnInit(){
    this.getAllFriend();
  }

  chargerProfil(player : Player){
    this.listeProfilsFriends.push(player);
  }

  chargerFriend(liste : Friend[]){
    this.listeFriend = liste;
      for(let friend of this.listeFriend ){
        this.http.get<any>(`http://localhost:3080/playerStats/${friend.steamid}`).pipe( map((value: ResponseProfil) => {return value})).subscribe((res: ResponseProfil) =>{
        this.chargerProfil(res.response.players[0]);
      });
    }
  }

  afficherFriends(){
    this.affichage = !this.affichage;
  }

	getFriendsDepuis(steamid : number): string{
    if(this.listeFriend.find(element => element.steamid == steamid) === undefined){
      return "";
    }else{
      this.dateAmis = new Date(this.listeFriend.find(element => element.steamid == steamid).friend_since * 1000);
      return this.dateAmis.getDate()+"/"+(this.dateAmis.getMonth()+1)+"/"+this.dateAmis.getFullYear();
    }
  }

}
