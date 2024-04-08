// This function is called when the user submits the form
document.getElementById('countryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const countryName = document.getElementById('countryInput').value;
    await fetchCountryDataAndDisplay(countryName);
});

// Fetch the country data from the API
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
// Display the country information to the user
function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById('countryInfo');
    const formattedCountryName = country.name.common.replace(/ /g, '_');
    const wikipediaUrl = `https://en.wikipedia.org/wiki/${formattedCountryName}`;

    countryInfoDiv.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag" style="width: 300px;"><br>
        <img src="${country.coatOfArms?.svg || ''}" alt="Coat of Arms" style="width: 200px;"><br>
        🤑Currency: ${Object.values(country.currencies).map(currency => currency.name).join(', ')}<br>
        ⭐Capital: ${country.capital[0]}<br>
        🗣️Languages: ${Object.values(country.languages).join(', ')}<br>
        <a href="${wikipediaUrl}" target="_blank">🧐Learn more about ${country.name.common} on Wikipedia</a>
    `;
}

// Display an error message to the user
function displayError(message) {
    const countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = `
        <p style="color: red;">${message}</p>
        <img src="/images/parks-and.gif" alt="Error" style="width: 300px;">
    `;
}

