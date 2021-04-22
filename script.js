// import { func } from 'joi';
import { fetchApi, postApi, delApi, updateApi } from './apiMethods.js';

const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const dirIn = 'in';
const dirOut = 'out';
const navItemNum = [1, 2, 3, 4, 5];
const navArray = [];
navItemNum.map(i => navArray.push(document.getElementById(`nav${i}`)));
const loader = document.getElementById('lds-dual-ring');
const mainContainer = document.getElementById('mainContainer');
// Start the page animation codes
function sliding(dir1, dir2) {
    overlay.classList.remove(`overlay-slide-${dir2}`);
    overlay.classList.add(`overlay-slide-${dir1}`)
    navArray.forEach((element, i) => {
        element.classList.remove(`slide-${dir2}-${i + 1}`);
        element.classList.add(`slide-${dir1}-${i + 1}`);
    });
}

function toggleNav() {
    // Toggle: Menu bars open/closed
    menuBars.classList.toggle('change');
    //  Toggle: Menu active
    overlay.classList.toggle('overlay-active');
    // console.log(overlay.classList);
    (overlay.classList.contains('overlay-active')) ? sliding(dirIn, dirOut) : sliding(dirOut, dirIn);
}
// End of page animation codes



const apiUrl = 'https://c6project1api.herokuapp.com/api/memories';
const fetchButton = document.getElementById('fetchButton');
const postButton = document.getElementById('postButton');
const memoryCard = document.getElementById('memoryCard');
const memoryForm = document.getElementById('memoryForm');
const postTitle = document.getElementById('postTitle');
const editTitle = document.getElementById('editTitle');
const updateButton = document.getElementById('updateButton');



// *************** ⤴️ good codes ❤

// Show Loading animation //
function showLoadingSpinner(){
    loader.hidden = false;
    fetchButton.hidden = true;
    mainContainer.hidden = true;
}

// Hide loading animation and show quoteContainer //
function removeLoadingSpinner(){
    if(!loader.hidden){
        mainContainer.hidden = false;
        fetchButton.hidden = false;
        loader.hidden = true;
    }
}

//**************** ⤵️ woking codes 🔥
// 🧹Clearing form after editting
function clearForm() {
    memoryForm.name.value = ''; 
    memoryForm.place.value = ''; 
    memoryForm.travelDate.value = ''; 
    memoryForm.tags.value = ''; 
    memoryForm.message.value = '';
    postTitle.hidden = false;
    postButton.hidden = false; 
    editTitle.hidden = true;
    updateButton.hidden = true; 
}
// 🖮 Edit post  
function editMemory(params) {
    memoryForm.name.value = params.name; 
    memoryForm.place.value = params.place; 
    memoryForm.travelDate.value = params.travelDate; 
    memoryForm.tags.value = params.tags; 
    memoryForm.message.value = params.message;
    postTitle.hidden = true;
    postButton.hidden = true; 
    editTitle.hidden = false;
    updateButton.hidden = false; 
    updateButton.addEventListener('click', function (e) {
        console.log(`${params.name}'s memory will be updated`);
        const newMemory = {
            "name": `${memoryForm.name.value}`,
            "place": `${memoryForm.place.value}`,
            "travelDate": `${memoryForm.travelDate.value}`,
            "tags": `${memoryForm.tags.value}`,
            "message": `${memoryForm.message.value}`,
        }
        console.log(newMemory);
        e.preventDefault();
        updateApi(params.id, newMemory);
        alert(`${params.name}'s memory  with ID ${params.id} has been updated.
        Fetch again to see new cards`);
        clearForm();
    });
}


// 🖥️ Create cards from Get/API JSON and DISPLAY to home page
async function displayMemories() {
    showLoadingSpinner();
    const memoriesDiv = document.querySelector('#parentcard');
    memoriesDiv.innerText = '';
    let memories = await fetchApi();
    console.log(memories);
    memories.forEach((memory, index) => {
        const memoryElement = document.createElement('form');
        memoryElement.classList.add(`div${index + 1}`, `memoryCard`);
        memoryElement.setAttribute('id', memory.id);
        memoryElement.innerText = `
        Name: ${memory.name}  
        Place: ${memory.place}  
        TravelDate: ${memory.travelDate}  
        Tags: ${memory.tags}  
        
        Message: ${memory.message}
        
        `;
        
        const delButton = document.createElement('Button');
        delButton.innerText = `Delete`;
        delButton.classList.add('delButton');
        delButton.value = `${memory.id}`;
        delButton.addEventListener('click', function (e) {
            console.log(this.value, 'is the ID of post being deleted');
            e.preventDefault();
            delApi(this.value);
        });
        
        const editButton = document.createElement('Button');
        editButton.classList.add('editButton');
        editButton.innerText = `Edit`;
        // editButton.value = `${memory}`;
        editButton.addEventListener('click', function (e) {
            console.log(memory.id, 'is the ID being editted');
            // console.log(memory);
            e.preventDefault();
            editMemory(memory);
        });
        memoryElement.append(editButton, delButton);
        memoriesDiv.append(memoryElement,);
    });
    removeLoadingSpinner();
    clearForm();
}

//🖅 Onclick function for submit button to send POST  request
function postExperience(e) {
    const name = document.getElementById('name').value;
    const place = document.getElementById('place').value;
    const travelDate = document.getElementById('travelDate').value;
    const tags = document.getElementById('tags').value.split(',');
    const message = document.getElementById('message').value;
    const newPost = {
        "name": `${name}`,
        "place": `${place}`,
        "travelDate": `${travelDate}`,
        "tags": `${tags}`,
        "message": `${message}`,
    }
    console.log(newPost);
    const newPostArray = Object.values(newPost);
    if(newPostArray.includes('')){
        alert(`All fields are required🤔`)
        return;
    } else {
        postApi(newPost);
    }
    
}


//  🞜Event listeners for the menu
menuBars.addEventListener('click', toggleNav);
navArray.forEach(element => element.addEventListener('click', toggleNav));

//   🞜Event listeners for the API routes
fetchButton.addEventListener('click', displayMemories);
postButton.addEventListener('click', postExperience);

// Onload
toggleNav();