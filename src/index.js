let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const addToyForm = document.querySelector(".add-toy-form");
  addToyForm.addEventListener("submit", function(e) {
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: addToyForm.elements.name.value,
        image: addToyForm.elements.image.value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(obj => {
      addCard(obj);
      addToyForm.elements.name.value = "";
      addToyForm.elements.image.value = "";
    })
    .catch(error => {
      console.log(error.message);
    });
  });

  getToys();
});

function getToys() {
  const toy_collection = document.querySelector("#toy-collection");
  toy_collection.innerHTML = "";
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(obj => {
    obj.forEach(toy => {
      addCard(toy);
    });
  });
}

function addCard(toy) {
  const toy_collection = document.querySelector("#toy-collection");
  const card = document.createElement("div")
  card.setAttribute("class", "card");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const button = document.createElement("button");
  h2.textContent = toy.name;
  card.appendChild(h2);
  img.classList.add("toy-avatar");
  img.src = toy.image;
  card.appendChild(img);
  p.textContent = `${toy.likes} Likes `;
  card.appendChild(p);
  button.classList.add("like-btn");
  button.textContent = "Like <3";
  button.addEventListener("click", (e) => {
    incrementLikes(toy, p)
  });
  card.appendChild(button);
  toy_collection.appendChild(card);
}

function incrementLikes(toy, p) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  })
  .then(res => res.json())
  .then(obj => {
    p.textContent = `${toy.likes+1} Likes `;
  })
}