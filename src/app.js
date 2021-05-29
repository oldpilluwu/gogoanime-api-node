const AnimuGetter = require("animu-desu");
const express = require("express");

const app = express();

app.use(express.json());

//getting the popular animes from page 1.

app.get("/popular/:page", (req, res) => {
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

app.get("/anime/:id/:episode", (req, res) => {
    let anime = req.params.id;
    let episode = req.params.episode;
    AnimuGetter.getEpisodeLinks(anime, episode)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => res.status(404).send("Error occurred: " + err));
});

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
