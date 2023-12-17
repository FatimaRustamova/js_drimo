let id = new URLSearchParams(window.location.search).get("id");
let form = document.querySelector("#form");
let file = document.querySelector("input[type=file]");
let name = document.querySelector("#name");
let desc = document.querySelector("#desc");
let image = document.querySelector("#image");

fetch(`http://localhost:3000/drimo/${id}`)
.then(res => res.json())
.then(data => {
    image.src = data.image,
    name.value = data.name,
    desc.value = data.desc
})

file.addEventListener("input", (e)=>{
    let file = e.target.files[0];
    if(file){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            image.src = reader.result
        }
    }
})

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    axios.patch(`http://localhost:3000/drimo/${id}`, {
        image: image.src,
        name: name.value,
        desc: desc.value
    })
    .then(res => {
        window.location = "../html/index.html"
    })
})