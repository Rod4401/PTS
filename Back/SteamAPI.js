const XMLHttpRequest = require('xhr2');
const fs = require("fs");
class SteamAPI {
	/* Les path relatifs aux differentes informations*/
	pathRecentGames = "/recentGames/";
	pathFriendList = "/friendList/";
	pathPlayerStats = "/playerStats/";
	pathGameList = "/gameList/";
	pathGameStats = "/gameStats/";

	/* L'url base de steam */
	steam_url = "http://api.steampowered.com";

	/**
   * Constructeur de la classe
   * @param key Le token d'acces a l'api steam
   */
	constructor(key) {
		this.key = key;
	}

	/**
   * Permet de initialiser toutes les entrees au serveur
   * @param app L'app du serveur
   */
	initAll(app) {
		this.initRecentGames(app); /* * Pour les recent games */
		this.initFriendList(app); /* * Pour la liste des friends */
		this.initPlayerStats(app); /* * Pour les stats player */
		this.initGameList(app); /* * Pour la liste de jeux */
		this.initGameStats(app); /* * Pour game stat */
	}

	/***********************/
	/*  Les jeux recents   */
	/***********************/

	/**
   * Permet de initialiser l'acces des jeux recents
   * @param app L'app du serveur
   */
	initRecentGames(app) {
		app.get(this.pathRecentGames + ":userID", (req, res) => {
			this.getRecentGames(res, req.params.userID);
		});
	}

	/**
	 * Methode pour recuperer l'url des jeux recents a partir de l'id
	 * @param id L'id du joueur
	 * @return l'url en question
	 */
	getUrlRecentGamesById(id) {
		return `${this.steam_url}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.key}&steamid=${id}`
	}

	/**
	 * Methode qui verifie si le serveur possede deja les jeux recents du joueur
	 * @param res La variable res reliee a l'app du serveur
	 * @param id L'id du joueur
	 */
	getRecentGames(res, id) {
		try {
			const json = fs.readFileSync(`./data${this.pathRecentGames}${id}.json`);
			res.json(JSON.parse(json));
			console.log(`Data load for ${id}`);
		} catch (error) {
			console.log(`Data download for ${id}`);
			this.creerDossier(this.pathRecentGames);
			this.get(res, this.getUrlRecentGamesById(id), `data${this.pathRecentGames}${id}.json`);
		}

	}


	/***********************/
	/*  La liste des amis  */
	/***********************/

	/**
   * Permet de initialiser l'acces de la liste des amis
   * @param app L'app du serveur
   */
	initFriendList(app) {
		app.get(this.pathFriendList + ":userID", (req, res) => {
			this.getFriendList(res, req.params.userID);
		});
	}

	/**
	 * Methode pour recuperer l'url de la liste des amis a partir de l'id
	 * @param id L'id du joueur
	 * @return l'url en question
	 */
	getUrlFriendListById(id) {
		return `${this.steam_url}/ISteamUser/GetFriendList/v0001/?key=${this.key}&steamid=${id}&relationship=all`
	}

	/**
	 * Methode qui verifie si le serveur possede deja la liste des amis du joueur
	 * @param res La variable res reliee a l'app du serveur
	 * @param id L'id du joueur
	 */
	getFriendList(res, id) {
		try {
			const json = fs.readFileSync(`./data${this.pathFriendList}${id}.json`);
			res.json(JSON.parse(json));
			console.log(`Data load for ${id}`);
		} catch (error) {
			console.log(`Data download for ${id}`);
			this.creerDossier(this.pathFriendList);
			this.get(res, this.getUrlFriendListById(id), `data${this.pathFriendList}${id}.json`);
		}
	}


	/***********************/
	/* Les stats du joueur */
	/***********************/

	/**
	 * Permet de initialiser l'acces des statistiques du joueur
	 * @param app L'app du serveur
	 */
	initPlayerStats(app) {
		app.get(this.pathPlayerStats + ":userID", (req, res) => {
			this.getPlayerStats(res, req.params.userID);
		});
	}

	/**
	 * Methode pour recuperer l'url des statistiques du joueur a partir de l'id
	 * @param id L'id du joueur
	 * @return l'url en question
	 */
	getUrlPlayerStats(id) {
		return `${this.steam_url}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.key}&steamids=${id}`;
	}

	/**
	 * Methode qui verifie si le serveur possede deja les statistiques du joueur
	 * @param res La variable res reliee a l'app du serveur
	 * @param id L'id du joueur
	 */
	getPlayerStats(res, id) {
		try {
			const json = fs.readFileSync(`./data${this.pathPlayerStats}${id}.json`);
			res.json(JSON.parse(json));
			console.log(`Data load for ${id}`);
		} catch (error) {
			console.log(`Data download for ${id}`);
			this.creerDossier(this.pathPlayerStats);
			this.get(res, this.getUrlPlayerStats(id), `data${this.pathPlayerStats}${id}.json`);
		}
	}


	/***********************/
	/*  La liste de jeux   */
	/***********************/

	/**
	 * Permet de initialiser l'acces de la liste des jeux du joueur
	 * @param app L'app du serveur
	 */
	initGameList(app) {
		app.get(this.pathGameList + ":userID", (req, res) => {
			this.getGameList(res, req.params.userID);
		});
	}

	/**
	 * Methode pour recuperer l'url de la liste des jeux du joueur a partir de l'id
	 * @param id L'id du joueur
	 * @return l'url en question
	 */
	getUrlGameList(id) {
		return `${this.steam_url}/IPlayerService/GetOwnedGames/v0001/?key=${this.key}&steamid=${id}&include_appinfo=true&format=json`;
	}

	/**
	 * Methode qui verifie si le serveur possede deja la liste des jeux du joueur
	 * @param res La variable res reliee a l'app du serveur
	 * @param id L'id du joueur
	 */
	getGameList(res, id) {
		try {
			const json = fs.readFileSync(`./data${this.pathGameList}${id}.json`);
			res.json(JSON.parse(json));
			console.log(`Data load for ${id}`);
		} catch (error) {
			console.log(`Data download for ${id}`);
			this.creerDossier(this.pathGameList);
			this.get(res, this.getUrlGameList(id), `data${this.pathGameList}${id}.json`);
		}
	}


	/************************/
	/*  Les stats d'un jeu  */
	/************************/

	/**
	 * Permet de initialiser l'acces des statistiques d'un jeu du joueur
	 * @param app L'app du serveur
	 */
	initGameStats(app) {
		app.get(this.pathGameStats + ":userID/:appID", (req, res) => {
			this.getGameStats(res, req.params.userID, req.params.appID);
		});
	}

	/**
	 * Methode pour recuperer l'url des statistiques d'un jeu du joueur a partir de l'id et de l'id du jeu
	 * @param id L'id du joueur
	 * @param jeu L'id du jeu
	 * @return l'url en question
	 */
	getUrlGameStats(id, jeu) {
		return `${this.steam_url}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${jeu}&key=${this.key}&steamid=${id}`;
	}

	/**
	 * Methode qui verifie si le serveur possede deja les statistiques d'un jeu du joueur
	 * @param res La variable res reliee a l'app du serveur
	 * @param id L'id du joueur
	 * @param jeu L'id du jeu
	 */
	getGameStats(res, id, jeu) {
		try {
			const json = fs.readFileSync(`./data${this.pathGameStats}${id}.${jeu}.json`);
			res.json(JSON.parse(json));
			console.log(`Data load for ${id} for ${jeu}`);
		} catch (error) {
			console.log(`Data download for ${id} for ${jeu}`);
			this.creerDossier(this.pathGameStats);
			this.get(res, this.getUrlGameStats(id, jeu), `data${this.pathGameStats}${id}.${jeu}.json`);
		}
	}

	/**
	 * Methode pour recuperer le json a partir de l'url
	 * @param res La variable res relie a l'app du serveur
	 * @param url L'url de recherche vers l'api Steam
	 * @param path Le path de sauvegarde des donnees
	 */
	get(res, url, path) {
		var oReq = new XMLHttpRequest();
		oReq.onload = function() {
			if (this.status == 200) {
				try {

					fs.writeFile(path, this.responseText, (err) => {
						if (err) throw err;
					});
				} catch (error) {
					console.log(error.message);
				}
				res.json(JSON.parse(this.responseText));
			} else {
				console.log("Aucune reponse de steam");
				res.json({});
			}
		};
		oReq.open("get", url, true);
		oReq.send();
	}

	/**
	 * Methode qui créer le dossier corrspondant au path si il n'existe pas
	 * @param path Le path du dossier de sauvegarde
	 */
	creerDossier(path){
		if (!fs.existsSync("data")) {
			fs.mkdirSync("data");
		}
		if (!fs.existsSync("data" + path)) {
			fs.mkdirSync("data" + path);
		}
	}

}
module.exports = SteamAPI;
