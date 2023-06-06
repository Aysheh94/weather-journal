/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apikey = "4a018f6bf09a33aba82d8e514eb397dd&units=metric";
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', preformAction);
/* Function called by event listener */
function preformAction(e){
    const zipCodevalue = document.getElementById('zip').value;
    const zipCode = `${zipCodevalue}&appid=`;
    const feelings =document.getElementById('feelings').value;
    getweatherInfo(baseUrl, zipCode,apikey)
    .then(function (data){
        postData('http://localhost:8000/setData', {date: newDate, temp: data.main.temp, content: feelings})
        .then(function(){
            updateUI()
        })
    })
}



/* Function to GET Web API Data*/
const getweatherInfo = async(baseUrl,zipCode,apikey) =>{
    const res = await fetch(baseUrl+zipCode+apikey)
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log("error", error);
    }  
}
/* Function to POST data */
const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch(error) {
      console.log("error",error);
    }
  } 

/* Function to GET Project Data */

const updateUI = async () =>{
    const request = await fetch('http://localhost:8000/getData');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = "Temperature right now is: " + Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = "Your feelings: " + allData.content;
    document.getElementById("date").innerHTML ="Today's date: " + allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }