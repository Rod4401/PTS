export class Player {
  public steamid: number;
  public profilestate: number;
  public personaname: string;
  public profileurl: string;
  public avatar: string;
  public avatarmedium: string;
  public avatarfull: string;
  public avatarhash: string;
  public lastlogoff: number;
  public personastate: number;
  public primaryclanid: string;
  public timecreated: number;
  public personastateflags: number;
  public loccountrycode: string;

  constructor(steamid: number, profilestate: number, personaname: string, profileurl: string, avatar: string, avatarmedium: string, avatarfull: string, avatarhash: string, lastlogoff: number, personastate: number, primaryclanid: string, timecreated: number, personastateflags: number, loccountrycode: string) {
    this.steamid = steamid;
    this.profilestate = profilestate;
    this.personaname = personaname;
    this.profileurl = profileurl;
    this.avatar = avatar;
    this.avatarmedium = avatarmedium;
    this.avatarfull = avatarfull;
    this.avatarhash = avatarhash;
    this.lastlogoff = lastlogoff;
    this.personastate = personastate;
    this.primaryclanid = primaryclanid;
    this.timecreated = timecreated;
    this.personastateflags = personastateflags;
    this.loccountrycode = loccountrycode;
  }
}

export class Profil{
  players : Player[];
  constructor(players : Player[]){
    this.players = players;
  }
}

export class ResponseProfil{
  response: Profil;
  constructor(response : Profil){
    this.response = response;
  }
}
