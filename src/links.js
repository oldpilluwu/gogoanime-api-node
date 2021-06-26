const baseURL = "https://gogo-stream.com/videos/";

("use strict");
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenreList =
    exports.getRecentlyAdded =
    exports.searchByGenre =
    exports.getEpisodeLinks =
    exports.search =
    exports.getAnimeDetails =
    exports.getPopular =
        void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));

function getEpisodeLink(id, episode) {
    return __awaiter(this, void 0, void 0, function* () {
        let animeStreamingLinkGogo;
        let finalLinksList = [];
        const siteUrl = `${baseURL}${id}-episode-${episode}`;
        yield axios_1.default
            .get(siteUrl)
            .then((response) =>
                __awaiter(this, void 0, void 0, function* () {
                    const html = response.data;
                    try {
                        var $ = cheerio_1.default.load(html);
                        if ($(".entry-title").text() === "404") {
                            throw new Error("Episode not found");
                        }
                        animeStreamingLinkGogo = $("iframe").attr("src");
                        const downloadsLinkGogo =
                            "https:" + animeStreamingLinkGogo;
                        finalLinksList.push({
                            link: downloadsLinkGogo,
                            quality: "Play",
                        });
                    } catch (error) {
                        throw error;
                    }
                }),
            )
            .catch((error) => {
                throw {
                    error: error.message,
                };
            });
        return finalLinksList;
    });
}
exports.getEpisodeLink = getEpisodeLink;
