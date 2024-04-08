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
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const countryData = await response.json();
        if (countryData[0]) {
            displayCountryInfo(countryData[0]);
            createFallingFlags(countryData[0]);
        } else {
            console.error('No country data found');
        }
    } catch (error) {
        console.error('An error occurred:', error);
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
    if (!country || !country.flags) {
        console.error('Country or country flags are undefined');
        return;
    }

    const isMobile = window.innerWidth <= 480; // Check if the screen width is 480 pixels or less
    const numFlags = isMobile ? Math.floor(Math.random() * 46) + 10 : Math.floor(Math.random() * 76) + 25; // Generate fewer flags on mobile
    const flagContainer = document.getElementById('flagContainer'); // Get the flag container element
    if (!flagContainer) {
        console.error('Flag container does not exist');
        return;
    }

    for (let i = 0; i < numFlags; i++) {
        const flag = document.createElement('img');
        flag.src = country.flags.svg;
        flag.className = 'flag';
        flag.style.width = '50px';
        flag.style.left = Math.random() * window.innerWidth + 'px';
        flag.style.opacity = '0'; // Set the opacity to 0
        flag.style.animationDelay = Math.random() * 2 + 's'; // Set the animation-delay property to a random value
        flagContainer.appendChild(flag); // Append the flag to the flag container

        flag.addEventListener('animationstart', () => {
            flag.style.opacity = '1'; // Change the opacity to 1 when the animation starts
        });

        flag.addEventListener('animationend', () => {
            flag.remove(); // Remove the flag element at the end of the animation
        });
    }
}