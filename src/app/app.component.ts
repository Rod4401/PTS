import { Component, OnInit  } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'dashfront';
  steamId = "";

  //Pour le preloader
  preloader : string = "preloader";

  constructor(private cookieService: CookieService) {
    var url = window.location.href;
    if(this.cookieService.get('PTS-ID')){
      if("http://localhost:4200/" != url.replace("http://localhost:4200/steamid/","")){
        this.steamId = url.replace("http://localhost:4200/steamid/","");
          this.cookieService.delete('PTS-ID');
          this.cookieService.set( 'PTS-ID', `${this.steamId}`, { expires: 1, path: '/'} );
        }
        else {
          this.steamId = this.cookieService.get('PTS-ID');
        }
      setTimeout(() => {
        this.preloader = "preloader preloader-deactivate";
      }, 1000);
    } else{
      //On recupère l'id dans l'url
      this.steamId = url.replace("http://localhost:4200/steamid/","");
      //Si il n'y a pas d'id
      if(this.steamId == "http://localhost:4200/"){
        this.steamId = "";
        //on ne fait rien -> on attend que l'utilisateur appuie sur connexion
      } else {
        this.cookieService.delete('PTS-ID');
        this.cookieService.set( 'PTS-ID', `${this.steamId}`, { expires: 1, path: '/'} );
        setTimeout(() => {
          this.preloader = "preloader preloader-deactivate";
        }, 1000);
      }
    }
}

  ngOnInit() {
  }

}
