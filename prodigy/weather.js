const API_KEY = 'https://openweathermap.org/api'; // Replace with your OpenWeatherMap API key

document.getElementById('submit').addEventListener('click', () => {
    const locationInput = document.getElementById('location');
    const cityName = locationInput.value.trim();

    if (cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('city').textContent = data.name;
                document.getElementById('temperature').textContent = `${data.main.temp} °C`;
                document.getElementById('description').textContent = data.weather[0].description;
            })
            .catch(error => {
                alert('Error fetching weather data. Please try again.');
                console.error(error);
            });
    } else {
        alert('Please enter a location.');
    }
});

// Get the user's location and fetch weather data
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('city').textContent = data.name;
                document.getElementById('temperature').textContent = `${data.main.temp} °C`;
                document.getElementById('description').textContent = data.weather[0].description;
            })
            .catch(error => {
                console.error(error);
            });
    });
} else {
    alert('Geolocation is not supported by your browser.');
}