'use strict'

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('.p1');
const message2 = document.querySelector('.p2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            return  message2.innerHTML = data.error;
        }

       message1.innerHTML = data.location;
       message2.innerHTML = data.forecast;
    })
})
})


