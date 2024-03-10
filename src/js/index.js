import { getData } from "./data.js";

const cardsContainer = document.getElementById("cards");
const checkboxContainer = document.getElementById("checkbox-container");
const filterForm = document.getElementById("form-filters");
const checkboxesAll = checkboxContainer.querySelectorAll(
  'input[type="checkbox"]'
);
const searchBar = document.getElementById("searcher");

let { currentDate, events } = await getData();

function getFormData(form) {
  const formData = new FormData(form);

  return Object.fromEntries(formData);
}

const handleFilterChange = (e) => {
  e.preventDefault();
  const formData = getFormData(filterForm);
  const selectedCategories = Object.keys(formData).filter(
    (key) => key !== "searcher"
  );
  const searchValue = formData.searcher.toLowerCase().trim();

  const cardsFilter = events.filter((event) => {
    const isCategoryInclude = selectedCategories.length
      ? selectedCategories.includes(event.category)
      : true && selectedCategories;
    return event.name.toLowerCase().includes(searchValue) && isCategoryInclude;
  });
  createCard(cardsFilter);
};

filterForm.addEventListener("submit", function (e) {
  handleFilterChange(e);
});

searchBar.addEventListener("input", function (e) {
  handleFilterChange(e);
});

checkboxesAll.forEach((checkbok) => {
  checkbok.addEventListener("change", function (e) {
    handleFilterChange(e);
  });
});

function createCard(cardsFiltered) {
  cardsContainer.innerHTML = "";
  let content = "";
  if (!cardsFiltered.length) {
    content = "Evento no encontrado";
  } else {
    for (const event of cardsFiltered) {
      content += `<div class="card" style="width: 240px">
                   <img src="${event.image}" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">${event.name}</h5>
                      <p class="card-category">${event.category}</p>
                      <p class="card-text">${event.description}</p>
                      <a href="./pages/details.html?id=${event._id}" class="btn btn-primary">More Info</a>
                    </div>
                 </div> `;
    }
  }
  cardsContainer.innerHTML = content;
}

createCard(events);
