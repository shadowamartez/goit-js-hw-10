import './css/styles.css';
import axios from "axios"; 

axios.defaults.headers.common["x-api-key"] = "live_ob3iVYzCeKtdH0VA3ELX8ukxGOl7jz40Hxs7nyJ0hC0YXup4GzMDn2R8C3LXqu4P";

export function fetchBreeds() {
    return axios
        .get("https://api.thecatapi.com/v1/breeds")
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
}

export function fetchCatByBreed(breedId) {
    return axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
}