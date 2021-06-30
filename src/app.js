const AnimuGetter = require("./scrapper");
const express = require("express");

const getLinks = require("./links");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// app.use(function (req, res, next) {
//     res.header(
//         "Access-Control-Allow-Origin",
//         "https://gogoanime-api-project.herokuapp.com/",
//     ); // update to match the domain you will make the request from
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept",
//     );
//     next();
// });

//getting the popular animes from page 1.

app.get("/popular/:page", (req, res, next) => {
	let page = req.params.page || 1;
	AnimuGetter.getPopular(page)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.status(404).send("Error occurred: " + err));
});

app.get("/recent/:page", (req, res) => {
	let page = req.params.page || 1;
	AnimuGetter.getRecentlyAdded(page)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.status(404).send("Error occurred: " + err));
});

app.get("/genre/", (req, res) => {
	AnimuGetter.getGenreList()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.status(404).send("Error occurred: " + err));
});

app.get("/genre/:type", (req, res) => {
	let genre = req.params.type;
	AnimuGetter.searchByGenre(genre)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.status(404).send("Error occurred: " + err));
});

app.get("/anime/:id", (req, res) => {
	let anime = req.params.id;
	AnimuGetter.getAnimeDetails(anime)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.status(404).send("Error occurred: " + err));
});

app.get("/anime/:id/:episode", async (req, res) => {
	let anime = req.params.id;
	let episode = req.params.episode;
	getLinks
		.getEpisodeLink(anime, episode)
		.then((data) => {
			console.log(data);
			res.send(data);
		})
		.catch((err) => {
			console.log(err);
			res.status(404).send("Error occurred: " + err);
		});
});
// app.get("/anime/:id/:episode", async (req, res) => {
//     let anime = req.params.id;
//     let episode = req.params.episode;
//     try {
//         const result = await scapper.watchAnime("naruto-episode-1");
//         res.header("Content-Type", "application/json");
//         res.send(JSON.stringify(result, null, 4));
//     } catch (err) {
//         res.send(err);
//     }
// });

app.get("/", (req, res) => {
	let searchField = req.query.search;
	let page = req.query.page || 1;
	AnimuGetter.search(searchField, page)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.status(404).send("Error occurred: " + err));
});

PORT = process.env.PORT || 8000;
app.listen(PORT);
