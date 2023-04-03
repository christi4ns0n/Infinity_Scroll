const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'jTl-P1TqOFq7xwysWuPJtnMt4aygHCGs5A7cvbzHuDg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 10
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create <div> for each photo
    const photoDiv = document.createElement('div');
    // Create <a> link to Unsplash 
    const link = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(link, {
        href: photo.links.html,
        target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    // Create <p> for Location
    const location = document.createElement('p');
          location.innerText = photo.location.name
          
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    
    // Put <img> inside <a> , put <a> and <p> inside <div> then put both inside imageContainer Element
    
    link.appendChild(img);
    // imageContainer.appendChild(link);
    imageContainer.appendChild(photoDiv);
    photoDiv.appendChild(link);
    photoDiv.appendChild(location);
    });
}

// Get Photos From Unsplash API
async function getPhotos() {
    try {
const response = await fetch(apiUrl);
photosArray = await response.json();
displayPhotos();
    } catch (error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
       ready = false;
        getPhotos(); 
    }
})

// ON Load
getPhotos();