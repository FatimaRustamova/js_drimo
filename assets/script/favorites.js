let favorites = document.querySelector(".favorites");

fetch("http://localhost:3000/favorites")
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        favorites.innerHTML += `
        <div class="cloud">
            <img src="${element.image}" alt="">
            <h3>${element.name}</h3>
            <p>${element.desc}</p>
            <button onclick="deleteFavorites(${element.id})">Delete</button>
        </div>
        `
    })
})

function deleteFavorites(id) {
    axios.delete(`http://localhost:3000/favorites/${id}`);
    window.location.reload()
}