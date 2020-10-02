const searchPlanetForm = document.querySelector(".search-form")
searchPlanetForm.addEventListener("submit", searchPlanet)

const signUpForm = document.querySelector("#new-account")
const loginForm = document.querySelector("#login-user")
const loginButton = document.querySelector("#login-button")

const mercuryButton = document.querySelector(".mercury")
const venusButton = document.querySelector(".venus")
const earthButton = document.querySelector(".earth")
const marsButton = document.querySelector(".mars")
const jupiterButton = document.querySelector(".jupiter")
const neptuneButton = document.querySelector(".neptune")
const uranusButton = document.querySelector(".uranus")
const saturnButton = document.querySelector(".saturn")
const plutoButton = document.querySelector(".pluto")
const sunButton = document.querySelector(".sun")

const mercuryButton1 = document.querySelector("#mercury-div")
const venusButton1 = document.querySelector("#venus-div")
const earthButton1 = document.querySelector("#earth-div")
const marsButton1 = document.querySelector("#mars-div")
const jupiterButton1 = document.querySelector("#jupiter-div")
const neptuneButton1 = document.querySelector("#neptune-div")
const uranusButton1 = document.querySelector("#uranus-div")
const saturnButton1 = document.querySelector("#saturn-div")
const plutoButton1 = document.querySelector("#pluto-div")
const sunButton1 = document.querySelector("#sun-div")

const nasaLink = document.querySelector("#nasa-daily-video")

const astroApiKey = "b17e8b59f8924d6585b40d01141a04b3"
const nasaApiKey = "LgC3ecRJ9ybPzqQJc5K9cxwBc0Xa7RLnFGwGqMXj"
const errorImageURL = "https://www.universetoday.com/wp-content/uploads/2013/10/milky_way.jpg"

const planetBaseURL = "https://api.le-systeme-solaire.net/rest/bodies"
const nasaBaseURL = "https://api.nasa.gov/planetary/apod?api_key="

let address = "colorado"

const baseURL = "http://localhost:3000"
let token = localStorage.token

// signUpForm.addEventListener("submit", signUp)
// loginButton.addEventListener("click", login)
mercuryButton.addEventListener("click",  planetData)
venusButton.addEventListener("click",  planetData)
earthButton.addEventListener("click",  planetData)
marsButton.addEventListener("click",  planetData)
jupiterButton.addEventListener("click",  planetData)
saturnButton.addEventListener("click",  planetData)
uranusButton.addEventListener("click",  planetData)
neptuneButton.addEventListener("click",  planetData)
plutoButton.addEventListener("click",  planetData)
sunButton.addEventListener("click",  planetData)

mercuryButton1.addEventListener("click",  planetData)
venusButton1.addEventListener("click",  planetData)
earthButton1.addEventListener("click",  planetData)
marsButton1.addEventListener("click",  planetData)
jupiterButton1.addEventListener("click",  planetData)
saturnButton1.addEventListener("click",  planetData)
uranusButton1.addEventListener("click",  planetData)
neptuneButton1.addEventListener("click",  planetData)
plutoButton1.addEventListener("click",  planetData)

const closeButton = document.querySelector(".fa-window-close-o")

nasaVideo()
riseFallData()
planetData()
searchPlanet()

if(token) {
    authorizeUser(token)
}

function signUp(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get("name")
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    const newUser = {
        name: name,
        username: username, 
        email: email, 
        password: password
    }

    fetch(`${baseURL}/users`, {
        method: "POST", 
        headers: {
            "Content-type": "application/json", 
        }, 
        body: JSON.stringify({user: newUser})
    }).then(response => response.json())
    .then(result => console.log(result))
}

function login(event) {
    event.preventDefault()

    const formData = new FormData(loginForm)
    const username = formData.get("username")
    const password = formData.get("password")
    const newUser = {
        username: username, 
        password: password
    }

    fetch(`${baseURL}/login`, {
        method: "POST", 
        headers: {
            "Content-type": "application/json", 
        }, 
        body: JSON.stringify(newUser)
    }).then(response => response.json())
    .then(result =>  { 
        localStorage.setItem("token", result.token)
    })   
}

function authorizeUser(token) {
    fetch(`${baseURL}/profile`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.json())
    .then(console.log)
}

function logout() {
    localStorage.removeItem("token")
}


function riseFallData() {
    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${astroApiKey}&location=${address}`)
        .then(response => response.json())
        .then(result => console.log(result))
}


function nasaVideo() {
    fetch(`${nasaBaseURL}${nasaApiKey}`)
        .then(response => response.json())
        .then(result => { 
            if (result.code == "404") {
                const image = document.createElement("img")
                const div = document.createElement("div")

                image.src = errorImageURL
                div.innerText = "IMAGE OF THE DAY"
                
               
                nasaLink.append(image, div)
                
            } else if (result.media_type == "image") {
                const image = document.createElement("img")
                image.src = result.url
                nasaLink.appendChild(image)
            } else {
                console.log(result)
                const video = document.createElement("iframe")
                video.width = "400"
                video.height = "400"

                video.src = result.url 
                console.log(video.src)      
                nasaLink.appendChild(video)
            }
    })
}


function planetData(event) {
    
    let planet= ""
  
    switch(event.target.id) {
        case "mercury-1": 
        planet = "mercure";
        break;

        case "mercury-div": 
        planet = "mercure";
        break;

        case "venus-1": 
        planet = "venus";
        break;

        case "venus-div": 
        planet = "venus";
        break;

        case "earth-1": 
        planet = "earth";
        break;

        case "earth-div": 
        planet = "earth";
        break;

        case "mars-1": 
        planet = "mars";
        break;

        case "mars-div": 
        planet = "mars";
        break;

        case "jupiter-1": 
        planet = "jupiter";
        break;

        case "jupiter-div": 
        planet = "jupiter";
        break;

        case "saturn-1": 
        planet = "saturn";
        break;

        case "saturn-div": 
        planet = "saturn";
        break;

        case "uranus-1": 
        planet = "uranus";
        break;

        case "uranus-div": 
        planet = "uranus";
        break;

        case "neptune-1": 
        planet = "neptune";
        break;

        case "neptune-div": 
        planet = "neptune";
        break;

        case "pluto-1": 
        planet = "pluto";
        break;

        case "pluto-div": 
        planet = "pluto";
        break;

        case "sun-1": 
        planet = "sun";
        break;
    }
    getPlanetInfo(planet)  
}





function searchPlanet(event){
    event.preventDefault()
    console.log(event.target)
    const formData = new FormData(event.target)
    const search = formData.get("search")

    getPlanetInfo(search)
}

function getPlanetInfo(planet) {

    const planetC = document.querySelector("#pop")
    const titlePlanet = document.querySelector(".pop-header")
    const bodyPlanet = document.querySelector(".pop-body")

    fetch(`${planetBaseURL}/${planet}`)
    .then(response => response.json())
    .then(result => { 
        console.log(result)
        planetC.style.transform = "scale(1)"

        const name = document.createElement("div")
        name.innerText = `NAME: ${result.englishName}`
        titlePlanet.appendChild(name)

        const density = document.createElement("div")
        density.innerText = `DENSITY: ${result.density}`

        const eccentricity = document.createElement("div")
        eccentricity.innerText = `ECCENTRICITY: ${result.eccentricity}`
        
        const equaRadius = document.createElement("div")
        equaRadius.innerText = `EQUARADIUS: ${result.equaRadius}`

        const escape = document.createElement("div")
        escape.innerText = `ESCAPE VELOCITY: ${result.escape}`

        const gravity = document.createElement("div")
        gravity.innerText = `GRAVITY: ${result.gravity}`

        const inclination = document.createElement("div")
        inclination.innerText = `INCLINATION: ${result.inclination}`

        const mass = document.createElement("div")
        mass.innerText = `MASS: ${result.mass.massValue}*${result.mass.massExponent}`

        const meanRadius = document.createElement("div")
        meanRadius.innerText = `MEAN RADIUS: ${result.meanRadius}`

        const moon = document.createElement("div")
        if (result.id== "soleil" || result.id== "mercure" || result.id== "venus") {
            moon.innerText == "NUMBER OF MOONS: 0"
        } else {
            moon.innerText = `NUMBER OF MOONS: ${result.moons.length}`
        }
        

        bodyPlanet.append(density, eccentricity, equaRadius, escape, gravity, inclination, mass, meanRadius, moon)

        closeButton.addEventListener("click", closePopUp)
        function closePopUp() {
            titlePlanet.removeChild(name)
            density.remove()
            eccentricity.remove()
            equaRadius.remove()
            escape.remove()
            gravity.remove()
            inclination.remove()
            mass.remove()
            meanRadius.remove()
            moon.remove()
       
            planetC.style.transform = "scale(0)"
        }
    })
}