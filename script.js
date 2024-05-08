const accessKey = 'M9PgUxosVe7JNRJSBl_0H67z2JmQht-csvrXEuUDX3E'

//const Dotenv = require('dotenv-webpack');

//require('dotenv').config();

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input')
const ImagesContainer = document.querySelector('.images-container')
const LoadMoreBtn = document.querySelector('.LoadMoreBtn')


let page = 1;
const fetchImages = async (query , PageNo) => {

try {
   

    if (PageNo===1) {
        ImagesContainer.innerHTML = '';
    }

    //const accessKey = process.env.ACCESS_KEY;

    
    //const url = `https://api.unsplash.com/photos/?query=${query}&per_page=28&client_id=${accessKey}`

     const url = `https://api.unsplash.com/search/photos?page=${PageNo}&query=${query}&per_page=28&client_id=${accessKey}`
   // console.log(url);
//    const url = `https://api.unsplash.com/photos/?query=tech&per_page=28&client_id=M9PgUxosVe7JNRJSBl_0H67z2JmQht-csvrXEuUDX3E`

   console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(data);

    if (data.results.length>0) {
        data.results.forEach(photo => {
            const ImageElement = document.createElement('div');
            ImageElement.classList.add('imagediv')
            ImageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
    
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay')
    
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`
            overlayElement.appendChild(overlayText)
    
            ImageElement.appendChild(overlayElement);
            ImagesContainer.appendChild(ImageElement);
        });
    
        if (data.total_pages===PageNo) {
            LoadMoreBtn.style.display= "none";
    
        } else {
            LoadMoreBtn.style.display= "block";
        }
    } else {
        ImagesContainer.innerHTML=`<h2>No image found.</h2>`
        if (LoadMoreBtn.style.display==="block") {
            LoadMoreBtn.style.display="none"
        }
    }

         
} catch (error) {
    ImagesContainer.innerHTML=`<h2>Failed to fetch images. Try again later.</h2>`
}

    
}


searchForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const InputText = searchInput.value.trim();

    if (InputText!='') {
        page = 1
        fetchImages(InputText , page);
    }
    else{
        ImagesContainer.innerHTML = `<h2>please enter a search query</h2>`
        if (LoadMoreBtn.style.display==="block") {
            LoadMoreBtn.style.display="none"
        }
    }
})

LoadMoreBtn.addEventListener('click' , ()=>{
    fetchImages(searchInput.value.trim() , ++page) 
})