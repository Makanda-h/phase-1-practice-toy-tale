let addToy = false;
let toyList = [];
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const toyAPI = "http://localhost:3000/toys";
  const addToyForm = document.getElementById('add-toy-form');


  fetch(toyAPI)
    .then((res) => res.json())
    .then(toys => {
      toyList = toys;
      renderToys(toyList)
    });

  function renderToys(toys) {
    toyCollection.innerHTML = "";
    toys.forEach(renderToy);
  }

  function renderToy(toy) {
    const toyCard = document.createElement("div");
    toyCard.classList.add("card");
    toyCollection.append(toyCard);

    toyCard.innerHTML = `<h2>${toy.name}</h2>
     <img src="${toy.image}" class="toy-avatar" />
     <p>${toy.likes}</p>
     <button class="like-btn" id="${toy.id}">Like ❤️ </button>
     `;
    const likeButton = document.getElementById("toy-${toy.id}");
    
}
likeButton.addEventListener('click', () => handleAddLike(toy))

function handleAddLike(toy){
  const likes = toy.likes + 1;
  
  fetch(`${toyAPI}/${toy.id}`,{
    headers,
    method: 'PATCH',
    body: JSON.stringify({likes})
  })
  .then(res => res.json())
  .then(() => {
    toy.likes = likes;
    renderToys(toyList);
});
}



addToyForm.addEventListener('submit', handleAddNewToy)
function handleAddNewToy(e){
    e.preventDefault();
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
}
fetch(toyAPI,{
  headers,
  method:'POST',
  BODY: JSON.stringify(newToy)
})
.then(res => res.json())
.then(renderToy)

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
