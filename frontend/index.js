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

const nasaLink = document.querySelector("#nasa-daily-video")

const astroApiKey = "b17e8b59f8924d6585b40d01141a04b3"
const nasaApiKey = "LgC3ecRJ9ybPzqQJc5K9cxwBc0Xa7RLnFGwGqMXj"
const planetBaseURL = "https://api.le-systeme-solaire.net/rest/bodies"

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

nasaVideo()
riseFallData()
planetData()

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
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
        .then(response => response.json())
        .then(result => { 

            if (result.media_type == "image") {
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
    console.log(event.target.id)
    let planet= ""
    const planetC = document.querySelector("#pop")
    const titlePlanet = document.querySelector(".pop-header")
    const bodyPlanet = document.querySelector(".pop-body")
    const closeButton = document.querySelector(".close-button")
    console.log(planetC)
    switch(event.target.id) {
        case "mercury-1": 
        planet = "mercury";
        break;

        case "venus-1": 
        planet = "venus";
        break;

        case "earth-1": 
        planet = "earth";
        break;

        case "mars-1": 
        planet = "mars";
        break;

        case "jupiter-1": 
        planet = "jupiter";
        break;

        case "saturn-1": 
        planet = "saturn";
        break;

        case "uranus-1": 
        planet = "uranus";
        break;

        case "neptune-1": 
        planet = "neptune";
        break;

        case "pluto-1": 
        planet = "pluto";
        break;
    }
    console.log(planet)
    fetch(`${planetBaseURL}/${planet}`)
        .then(response => response.json())
        .then(result => { 
            console.log(result)
            planetC.style.transform = "scale(1)"

            const name = document.createElement("div")
            name.innerText = `PLANET: ${result.englishName}`
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
            moon.innerText = `NUMBER OF MOON: ${result.moons.length}`

            bodyPlanet.append(density, eccentricity, equaRadius, escape, gravity, inclination, mass, meanRadius, moon)
        })
    }