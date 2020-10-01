const signUpForm = document.querySelector("#new-account")
const loginForm = document.querySelector("#login-user")
const loginButton = document.querySelector("#login-button")
const nasaLink = document.querySelector("#nasa")

const astroApiKey = "b17e8b59f8924d6585b40d01141a04b3"
const nasaApiKey = "LgC3ecRJ9ybPzqQJc5K9cxwBc0Xa7RLnFGwGqMXj"

let address = "colorado"

const baseURL = "http://localhost:3000"
let token = localStorage.token

signUpForm.addEventListener("submit", signUp)
loginButton.addEventListener("click", login)

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

// const asteroidContainer = document.querySelector(".orbit")
// function asteroidGenerator() {  
//     for(let i = 0; i < 200; i++) {
//         let div = document.createElement("div")
//         div.classList.add(`orbit-child`)
//         asteroidContainer.appendChild(div)
//     } 
//     console.log(asteroidContainer)
//   }
//   asteroidGenerator()

// fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${astroApiKey}&location=${address}`)
//     .then(response => response.json())
//     .then(result => console.log(result))

// fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
// .then(response => response.json())
// .then(result => { 
//     console.log(result)
//     const video = document.createElement("iframe")
//     video.width = "400"
//     video.height = "400"
   
//     video.src = result.url 
//     console.log(video.src)

    
//     nasaLink.appendChild(video)

// })