import './css/styles.css';
import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.headers.common["x-api-key"] = "live_ob3iVYzCeKtdH0VA3ELX8ukxGOl7jz40Hxs7nyJ0hC0YXup4GzMDn2R8C3LXqu4P";

export function fetchBreeds() {
    return axios
        .get("https://api.thecatapi.com/v1/breeds")
        .then((response) => response.data)
        .catch((error) => {
            Notiflix.Notify.failure("Failed to fetch cat breeds. Please try again later.");
            throw error;
        });
}

export function fetchCatByBreed(breedId) {
    return axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then((response) => response.data)
        .catch((error) => {
            Notiflix.Notify.failure("Failed to fetch cat information. Please try again later.");
            throw error;
        });
}