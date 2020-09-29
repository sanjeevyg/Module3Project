const signUpForm = document.querySelector("#new-account")
const loginForm = document.querySelector("#login-user")
const loginButton = document.querySelector("#login-button")

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
    fetch(`${baseURL}/profile` {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.json(0))
    .then(console.log)
}

