
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count=5;
const apyKey='xAteT5_tvdMI8jg_YqkJuyepczy2GBivzvVuqRn0by0';
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apyKey}&count=${count}`

// Check if all images were loaded
const imageLoaded=()=>{
  ++imagesLoaded;
  if(imagesLoaded===totalImages){
    loader.hidden=true
    ready=true;
    // this count update to fix the slow internet problem
    count=10;
    apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apyKey}&count=${count}`
}
}
// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}




// create Elements for links&photos,add to Dom
const displayPhotos=()=> {
  totalImages=photosArray.length
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
      // Create <a> to link to Unsplash
      const item = document.createElement('a');
      setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
      });
      // Create <img> for photo
      const img = document.createElement('img');
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      // Event listener , check the image loaded
      img.addEventListener('load',imageLoaded)
      // Put <img> inside <a>, then put both inside imageContainer Element
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  }



// fetch photos from unsplash Api
const getPhotos=async()=>{
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json()
        // console.log('photosArray:',photosArray)
        displayPhotos()
    }catch(error){
        // console.log('error',error)
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      imagesLoaded=0
      ready=false;
      getPhotos();

    }
  });

//   on load
getPhotos()