export class Friend {
  public steamid: number;
  public relationship: string;
  public friend_since: number;

  constructor(steamid: number, relationship: string, friend_since: number ) {
    this.steamid = steamid;
    this.relationship=relationship;
    this.friend_since=friend_since;
  }
}

export class Friendslist{
  friends : Friend[];
  constructor(friends : Friend[]){
    this.friends = friends;
  }
}

export class ResponseFriend{
  friendslist: Friendslist;
  constructor(friendslist : Friendslist){
    this.friendslist = friendslist;
  }
}