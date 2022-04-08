export class Jeu {
  public appid: number;
  public name: string;
  public playtime_forever: number;
  public img_icon_url : string;
  public playtime_windows_forever: number;
  public playtime_mac_forever : number;
  public playtime_linux_forever : number;

  constructor(appid: number, name: string, playtime_forever: number, img_icon_url : string, playtime_windows_forever: number, playtime_mac_forever : number, playtime_linux_forever : number ) {
    this.appid = appid;
    this.name=name;
    this.playtime_forever=playtime_forever;
    this.img_icon_url=img_icon_url;
    this.playtime_windows_forever=playtime_windows_forever;
    this.playtime_mac_forever=playtime_mac_forever;
    this.playtime_linux_forever= playtime_linux_forever;
  }
}

export class RecentGames{
  game_count : number;
  games : Jeu[];

  constructor(game_count: number, games : Jeu[]){
    this.game_count = game_count;
    this.games = games;
  }
}

export class ResponseGames{
  response : RecentGames;
  constructor(response : RecentGames){
    this.response = response;
  }
}
