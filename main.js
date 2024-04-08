document.getElementById('countryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const countryName = document.getElementById('countryInput').value;
    await fetchCountryDataAndDisplay(countryName);
});

async function fetchCountryDataAndDisplay(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];
        displayCountryInfo(country);
    } catch (error) {
        console.error('Error fetching country data:', error);
        displayError('Failed to fetch country data. Please try again.');
    }
}

function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById('countryInfo');
    const formattedCountryName = country.name.common.replace(/ /g, '_');
    const wikipediaUrl = `https://en.wikipedia.org/wiki/${formattedCountryName}`;

    countryInfoDiv.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag" style="width: 200px;"><br>
        <img src="${country.coatOfArms?.svg || ''}" alt="Coat of Arms" style="width: 100px;"><br>
        Currency: ${Object.values(country.currencies).map(currency => currency.name).join(', ')}<br>
        Capital: ${country.capital[0]}<br>
        Languages: ${Object.values(country.languages).join(', ')}<br>
        <a href="${wikipediaUrl}" target="_blank">More about ${country.name.common}</a>
    `;
}


function displayError(message) {
    const countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}
