/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let URL="http://api.openweathermap.org/data/2.5/forecast?zip=";
let API_KEY="&appid=b506a4fdfeae5f4e7de7bd974d5a06f8";

const element=document.getElementById('generate');
element.addEventListener('click',action);

function action()
{
    const zipID=document.getElementById('zip').value;
    const feel=document.getElementById('feelings').value;
    retrieveDataWeather(URL,zipID,API_KEY)
     .then(function(alldata)
     {
        // Add data
        postData('/addData', {date:newDate, temperature: alldata.list[0].main.temp, feelings:feel} );
     }
    )
    .then(updateUI())

}

const retrieveDataWeather = async (URL,zipID,API_KEY) =>{ 
        const senturl=URL+zipID+API_KEY;
        const request = await fetch(senturl);
        try {
        // Transform into JSON and return then if no error found
        const allData = await request.json()
        console.log("data",allData);
        return allData;
        }
        catch(error) {
        //catching errors
        console.log("error", error);
        }
}

const postData=async(url='',data={})=>{
    const response= await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const nawData=await response.json();
        return newData;
    }
    catch(error){
        console.log("error",error);
    }
};

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = 'Date: ${allData[0].date}';
    document.getElementById('temp').innerHTML = 'Temprature: ${allData[0].temp}';
    document.getElementById('content').innerHTML = 'Feelings: ${allData[0].content}';

  }catch(error){
    console.log("error", error);
  }
};