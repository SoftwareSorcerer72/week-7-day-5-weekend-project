document.getElementById('countryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const countryName = document.getElementById('countryInput').value;
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0]; // Assuming the first match is the desired one
            displayCountryInfo(country);
        }).catch(error => console.error('Error fetching country data:', error));
});

function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag" style="width: 200px;"><br>
        <img src="${country.coatOfArms?.svg || ''}" alt="Coat of Arms" style="width: 100px;"><br>
        Currency: ${Object.values(country.currencies).map(currency => currency.name).join(', ')}<br>
        Capital: ${country.capital[0]}<br>
        Languages: ${Object.values(country.languages).join(', ')}
    `;
}
