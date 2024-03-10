import { getData } from "./data.js";

let { currentDate, events } = await getData();

const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = parseInt(params.get("id"));



const details = events.find((event) => event._id === id);

const card = document.querySelector(".cards");
card.innerHTML = `<div class="card" style="width: 320px">
                  <img src="${details.image}" class="card-img-top" alt="..." />
                   <div class="card-body">
                     <h5 class="card-title">${details.name}</h5>
                     <p class="card-category">${details.category}</p>
                     <p class="card-text">${details.description}</p>
                     <p class="card-date">Date: ${details.date}</p>
                     <p class="card-place">Place: ${details.place}</p>
                     <p class="card-capacity">Capacity: ${details.capacity}</p>
                     <p class="card-price">$ ${details.price}</p>
                     <a href="/index.html" class="btn btn-primary">Go Home</a>
                   </div>
                </div> `;
