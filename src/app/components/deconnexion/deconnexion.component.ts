import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  deconnecter(){
    //On supprime le cookie
    this.cookieService.delete("PTS-ID",'/');
    window.location.reload();
  }

}
