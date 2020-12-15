/* Global Variables */
const API_URL = 'http://api.openweathermap.org/data/2.5/weather?'
const units = 'metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const API_KEY = '000df94aabc4c6ba6ee800cce692b1d3' ;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherData(API_URL, newZip, API_KEY, units)
        .then(function(res){
            postData('/add', {temp: res.main.temp, date: newDate, feelings: feelings})
                .then(function () {
                    uiUpdate()
                })
            })
}

/* Function to GET Web API Data*/
const getWeatherData = async (API_URL,newZip, API_KEY, units)=>{
    const req = await fetch(`${API_URL}zip=${newZip}&appid=${API_KEY}&units=${units}`)
    try {
        // Catch Data
        const res = await req.json();
        return res;
    } catch (e) {
        // Error Log
        alert("Choose another Zip Code")
        console.log('error', e); console.log('Line 39')
    }
}

/* Function to POST data */
const postData = async (url = "", data={}) => {
   const req = await fetch(url , {
       method: 'POST',
       credentials: 'same-origin',
       headers: {
           'content-type': 'application/json',
       },
       body: JSON.stringify(data),
   });

    try {
        const res = await req.json();
        console.log(res)
        return res
    }
    catch (e) {
        console.log('error', e); console.log('Line 59')
    }
}

/* Function to GET Project Data */
const uiUpdate = async () => {
    const req= await fetch('/all')
    try {
        const lastData = await req.json();

        document.getElementById('date').innerHTML  = lastData.date;
        document.getElementById('temp').innerHTML = lastData.temp;
        document.getElementById('content').innerHTML = lastData.content;
    } catch (e) {
        // Error Log
        console.log('error' , e); console.log('Line 73')
    }
}
