let nav = document.querySelector("nav");

window.addEventListener("scroll", ()=>{
    if(window.scrollY>150){
        nav.style.position = "fixed";
    }
    else{
        nav.style.position = "";
    }
})

let service = document.querySelector("#service");
let section1 = document.querySelector(".section1");
let about = document.querySelector("#about");
let section2 = document.querySelector(".section2");
let news = document.querySelector("#news");
let section3 = document.querySelector(".section3");

service.addEventListener("click", ()=>{
    section1.scrollIntoView({behavior : "smooth"})
})

about.addEventListener("click", ()=>{
    section2.scrollIntoView({behavior: "smooth"})
})

news.addEventListener("click", ()=>{
    section3.scrollIntoView({behavior: "smooth"})
})

let icon = document.querySelector("#icon");
let modal = document.querySelector(".modal");

icon.addEventListener("click", ()=>{
    modal.classList.toggle("none")
})

let web = document.querySelector(".web");
let length = 8;
let arr = [];
let search = document.querySelector("#search");

function getAllObject(){
    fetch("http://localhost:3000/drimo")
    .then(res => res.json())
    .then(data => {
        arr.push(data);
        data.slice(0, length).forEach(element => {
            web.innerHTML += `
            <div class="cloud">
                <i class="bi bi-heart" onclick="goFavorite(${element.id})"></i>
                <img src="${element.image}" alt="">
                <h3>${element.name}</h3>
                <p>${element.desc}</p>
                <button onclick="details(${element.id})">View Details</button>
                <button onclick="deleteObj(${element.id})">Delete</button>
                <button onclick="update(${element.id})">Update</button>
            </div>
            `
        })
        return arr.flat()
    }) 
    .then(data => {
        search.addEventListener("input", (e)=>{
            let value = e.target.value;
            if(value !== null){
                data.filter(s => {
                    web.innerHTML = "";
                    return s.name.toLowerCase().includes(value.toLowerCase())
                }).forEach(element => {
                    web.innerHTML += `
                    <div class="cloud">
                        <i class="bi bi-heart" onclick="goFavorite(${element.id})"></i>
                        <img src="${element.image}" alt="">
                        <h3>${element.name}</h3>
                        <p>${element.desc}</p>
                        <button onclick="details(${element.id})">View Details</button>
                        <button onclick="deleteObj(${element.id})">Delete</button>
                        <button onclick="update(${element.id})">Update</button>
                    </div>
                    `
                })
            }
            else{
                data.forEach(element => {
                    web.innerHTML += `
                    <div class="cloud">
                        <i class="bi bi-heart" onclick="goFavorite(${element.id})"></i>
                        <img src="${element.image}" alt="">
                        <h3>${element.name}</h3>
                        <p>${element.desc}</p>
                        <button onclick="details(${element.id})">View Details</button>
                        <button onclick="deleteObj(${element.id})">Delete</button>
                        <button onclick="update(${element.id})">Update</button>
                    </div>
                    `
                })
            }
        })
    }) 
}

getAllObject();

function details(id) {
    window.location = `../html/details.html?id=${id}`
}

function deleteObj(id) {
    axios.delete(`http://localhost:3000/drimo/${id}`)
    window.location.reload()
}

function update(id) {
    window.location = `../html/update.html?id=${id}`
}

function goFavorite(id) {
    fetch(`http://localhost:3000/drimo/${id}`)
    .then(res => res.json())
    .then(data => {
        axios.post("http://localhost:3000/favorites", data)
    })
}

let load = document.querySelector("#load");

load.addEventListener("click", ()=>{
    if(load.innerText == "Load More"){
        length+=4;
        web.innerHTML = "";
        getAllObject();
        load.innerText = "Less More";
    }
    else{
        length-=4;
        web.innerHTML = "";
        load.innerText = "Load More";
        getAllObject();
    }
})