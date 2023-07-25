import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from "notiflix";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

function toggleDisplay(element, show) {
    element.style.display = show ? "block" : "none";
}

function showCatInfo({ breeds, url }) {
    const { name: breed, description, temperament } = breeds[0]; 
    catInfo.innerHTML = `<p>Breed: ${breed}</p>
                    <p>Description: ${description}</p>
                    <p>Temperament: ${temperament}</p>
                    <img src="${url}" alt="${breed}" />`;
    toggleDisplay(catInfo, true); 
}

function showError() {
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page.");
}

breedSelect.addEventListener("change", (event) => {
    const selectedBreedId = event.target.value;

    toggleDisplay(loader, true);
    toggleDisplay(catInfo, false);

    fetchCatByBreed(selectedBreedId)
        .then((cats) => {
            toggleDisplay(loader, false);
            showCatInfo(cats[0]);
        })
        .catch(() => {
            toggleDisplay(loader, false);
            showError();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    toggleDisplay(loader, true);
    toggleDisplay(catInfo, false);

    fetchBreeds()
        .then((breeds) => {
            toggleDisplay(loader, false);
            breedSelect.style.display = "block";

            const options = breeds.map((breed) => {
                const option = document.createElement("option");
                option.value = breed.id;
                option.textContent = breed.name; 
                return option;
            });
            breedSelect.append(...options);
        })
        .catch(() => {
            toggleDisplay(loader, false);
            showError();
        });
});