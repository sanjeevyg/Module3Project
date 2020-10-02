
let address = "colorado"

function riseFallData() {
    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${astroApiKey}&location=${address}`)
        .then(response => response.json())
        .then(result => console.log(result))
}