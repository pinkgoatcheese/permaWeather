import Arweave from 'arweave/web';
var instance = Arweave.init;

function loadWalletFile() {
  var inputWalletFile, walletFile, readWallet;
  inputWalletFile = document.getElementById('inputWalletFile');
  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
    } 
  else {
    walletFile = inputWalletFile.files[0];
    readWallet = new FileReader();
    readWallet.onload = createJwk();
    readWallet.readAsText(walletFile);
    console.log(readWallet);
  }
}
  function createJwk() {
    console.log(readWallet);
    let lines = readWallet.target.result;
    var jwk = JSON.parse(lines); 
    console.log(jwk);
    document.getElementById('saveToArwave').onclick = function saveToArweave() {
      const instance = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
      });
      let transaction = instance.createTransaction({
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, jwk);
      console.log(transaction); 
     // transaction.addTag('Content-Type', 'text/html');
     // transaction.addTag('key2', 'value2');

    arweave.transactions.sign(transaction, jwk);

    const response = arweave.transactions.post(transaction);

console.log(response.status);
};
  }

function loadWallet() {
  var input, file, fr;
  input = document.getElementById("walletFile");
  console.log(input)
}
/*
let jwk = json.parse(selectedFile);
const arweave = Arweave.init();
const selectedFile = document.getElementById('input');
let jwk = json.parse(selectedFile);
let transactionA = arweave.createTransaction({
  data: ''
}, jwk);


  document.getElementById('get_file').onclick = function () {
    document.getElementById('my_file').click();
  }
  */
function getWeather() {
  let city = document.getElementById("inputCity").value;
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=019700cd96eeb0fe38a84fff3686e27f";
  fetch(apiUrl)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {
      displayWeather(data);
    })
    .catch(function () {
      console.log(err);
    });
}

function displayWeather(d) {
  let celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  let fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
  let description = d.weather[0].description;
  let icon = d.weather[0].icon;
  let windSpeedContent = "Windspeed: ";

  document.getElementById('description').innerHTML = d.weather[0].main;
  document.getElementById('celcius').innerHTML = celcius + '&deg;C';
  document.getElementById('temp').innerHTML = fahrenheit + '&deg;F';
  document.getElementById('location').innerHTML = d.name;
  document.getElementById('windSpeed').innerHTML = windSpeedContent + d.wind.speed + " m/s";


  if (icon == '01d') {
    document.body.className = 'clearDat';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/01d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '01n') {
    document.body.className = 'clearNight';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/01n.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '02d') {
    document.body.className = 'fewCloudsDay';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/02d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '02n') {
    document.body.className = 'fewCloudsNight';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/02n.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '03d') {
    document.body.className = 'scatteredCloudsDay';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/03d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '03n') {
    document.body.className = 'scatteredCloudsNight';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/03d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '04d') {
    document.body.className = 'brokenCloudsDay';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/04d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '04n') {
    document.body.className = 'brokenCloudsNight';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/04d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '09d') {
    document.body.className = 'rainShowerDay';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/09d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '09n') {
    document.body.className = 'rainShowerNight';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/09d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '10d') {
    document.body.className = 'rainDay';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/10d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '10n') {
    document.body.className = 'rainNight';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/10d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '11d') {
    document.body.className = 'thunderstormDay';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/11d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '11n') {
    document.body.className = 'thunderstormNight';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/11d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '13d') {
    document.body.className = 'snowDay';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/13d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '13n') {
    document.body.className = 'snowNight';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/13d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '50d') {
    document.body.className = 'atmosphere';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/50d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else if (icon == '50n') {
    document.body.className = 'atmosphere';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/50d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  } else {
    document.body.className = 'clearDay';
    document.getElementById('weatherIcon').style.backgroundImage = "url('assets/03d.png')";
    document.getElementById('weatherIcon').style.backgroundRepeat = "no-repeat";
    document.getElementById('weatherIcon').style.backgroundPosition = "center";
  }
}
