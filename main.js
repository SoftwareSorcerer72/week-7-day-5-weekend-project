// This function is called when the user submits the form
document.getElementById('countryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const countryName = document.getElementById('countryInput').value;
    await fetchCountryDataAndDisplay(countryName);
});

function clearFlags() {
    const flags = document.querySelectorAll('.flag');
    flags.forEach(flag => flag.remove());
}

// Fetch the country data from the API
async function fetchCountryDataAndDisplay(countryName) {
    clearFlags();
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const countryData = await response.json();
        displayCountryInfo(countryData[0]);
        createFallingFlags(countryData);
    } catch (error) {
        console.error('An error occurred:', error);
        displayError(error.message);
    }
}
// Display the country information to the user
function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById('countryInfo');
    const formattedCountryName = country.name.common.replace(/ /g, '_');
    const wikipediaUrl = `https://en.wikipedia.org/wiki/${formattedCountryName}`;
    const amazonSearchUrl = `https://www.amazon.com/s?k=${formattedCountryName}+history+book`;
    const primaryLanguage = Object.values(country.languages)[0];
    const googleTranslateUrl = `https://translate.google.com/`;
    
    countryInfoDiv.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag" style="width: 250px;"><br>
        <img src="${country.coatOfArms?.svg || ''}" alt="Coat of Arms" style="width: 200px;"><br>
        📖Country Name: ${country.name.common}<br>
        🌎Continent: ${Object.values(country.continents).join(', ')}<br>
        🤑Currency: ${Object.values(country.currencies).map(currency => currency.name).join(', ')}<br>
        ⭐Capital: ${country.capital[0]}<br>
        🗣️Languages: ${Object.values(country.languages).join(', ')}<br>
        🫂Citizens Referred to As: ${country.demonyms.eng.f}<br>
        📞Calling Code: ${country.idd.root}<br>
        <a href="${googleTranslateUrl}" target="_blank">🌐Translate ${primaryLanguage} into your native language on Google Translate</a><br>
        <a href="${amazonSearchUrl}" target="_blank">📚Find books about ${country.name.common}'s history on Amazon</a><br>
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

// Just showing off with a falling flag
function createFallingFlags(country) {
    const numFlags = Math.floor(Math.random() * 76) + 25; // Generate a random number between 25 and 100
    for (let i = 0; i < numFlags; i++) {
        const flag = document.createElement('img');
        flag.src = country.flags.svg;
        flag.className = 'flag';
        flag.style.width = '50px';
        flag.style.left = Math.random() * window.innerWidth + 'px';
        document.body.appendChild(flag);
    }
}
