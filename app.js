
//API & all infos :authentifications,paths, queryes, parse JSON data we get back and send it over to the brownser


const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

//we need to install another package -> npm body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
 
});

//connect to html 
app.post("/", function(req, res){

  const query = req.body.cityName;
    const apiKey = "ae5516e42ad5939fee633ff9efcb57a1";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey + "&units=" + unit

https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);

    //HOW TO ACCES DIFFERENT LEVELS OF CODE TO INDENTIFY INFOS
        const temp = weatherData.main.temp;
        console.log(temp);
   //HOW TO GET INFOS FROM THE KEY WITH ARRAY
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openwathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<p>The weather is currently " + weatherDescription + "</p>");
        res.write("<h1> The temperature in "+ query + " is " +  temp + " degrees  </h1>" );
        res.write("<img src =" + imageURL + ">");
        res.send();

  
            
        })
    })  
})




     /*HOW TO MAKE A STRING WITH LEVELS OF CODE
       name: "Angela",
       favoriteFood:"pizza"
    }
          console.log(JSON.stringify(object));
       */








app.listen(3000, function(){
    console.log("The server is running at port 3000");
})