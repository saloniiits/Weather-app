window.addEventListener('load',()=>{
   let long;//longitude
   let lat;//latitude
   let temperatureDescription=document.querySelector('.temperature-description');
   let temperatureDegree=document.querySelector('.temperature-degree');
   let temperaturesection=document.querySelector('.degree-section');
   let temperaturespan=document.querySelector('.degree-section span');
   let locationtimezone=document.querySelector('.location-timezone')
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition((position)=>{
           long=position.coords.longitude;
           lat=position.coords.latitude;
           const proxy="https://cors-anywhere.herokuapp.com/";
           const api =`${proxy}http://api.weatherapi.com/v1/current.json?key= c59a7ed4830148c1b9670408203108&q=sangrur`
           fetch(api)
               .then(data => {
                   return data.json();
               })
               .then(response => { 
                   //SET DOM ELEMENTS
                   console.log(response);
                   temperatureDegree.textContent=response.current.temp_f;
                   temperaturespan.textContent='F';
                   temperatureDescription.textContent=response.current.condition.text;
                   locationtimezone.textContent=response.location.tz_id;
                   const icon=response.current.condition.text;
                   //SET ICON
                   setIcons(icon,document.querySelector('.icon'));
                   //change temperature to celsius /fahrenheit
                   temperaturesection.addEventListener('click',()=>{
                       if(temperaturespan.textContent=='F'){
                          temperaturespan.textContent='C';
                          temperatureDegree.textContent=response.current.temp_c;
                       }else{
                           temperaturespan.textContent='F';
                           temperatureDegree.textContent=response.current.temp_f;
                       }
                   })
                   locationtimezone.addEventListener('click',()=>{
                       if(locationtimezone.textContent=='Asia/Kolkata'){
                       locationtimezone.textContent=`${response.location.region} / ${response.location.country}`;
                       }else{
                           locationtimezone.textContent=response.location.tz_id;
                       }
                   })
            });
       });
   }
   function setIcons(icon,iconID){
       const skycons=new Skycons({"color":"white"});
       skycons.resizeClear=true;
       const currentIcon=icon.replaceAll(' ','_').toUpperCase();
       console.log(icon);
       console.log(currentIcon);
       skycons.add("ïcon",Skycons[currentIcon]);
       skycons.play();
       return skycons.set(iconID,Skycons[currentIcon]);
   }

});