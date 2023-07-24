import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from "notiflix";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

function showError() {
    error.style.display = "block";
}

function hideError() {
    error.style.display = "none";
}

function showCatInfo(info) {
    catInfo.innerHTML = `<p>Breed: ${info.breed}</p>
                    <p>Description: ${info.description}</p>
                    <p>Temperament: ${info.temperament}</p>
                    <img src="${info.image}" alt="${info.breed}" />`;
    catInfo.style.display = "block";
}

function hideCatInfo() {
    catInfo.style.display = "none";
}

breedSelect.addEventListener("change", (event) => {
    const selectedBreedId = event.target.value;

    showLoader();
    hideError();
    hideCatInfo();

    fetchCatByBreed(selectedBreedId)
    .then((cats) => {
        hideLoader();
        showCatInfo({
            breed: cats[0].breeds[0].name,
            description: cats[0].breeds[0].description,
            temperament: cats[0].breeds[0].temperament,
            image: cats[0].url,
    });
        hideError(); 
    })
    .catch(() => {
        hideLoader();
        showError(); 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    showLoader();
    hideError();
    hideCatInfo();

    fetchBreeds()
        .then((breeds) => {
        hideLoader();
        breedSelect.style.display = "block";

        breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
        });
    })
    .catch(() => {
        hideLoader();
        showError();
    });
});