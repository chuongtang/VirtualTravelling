
const apiUrl = 'https://c6project1api.herokuapp.com/api/memories';


//↹ Fetch API
async function fetchApi() {
    let memories = [];
    try {
        const response = await fetch(apiUrl);
        memories = await response.json();
        console.log('Fresh set of Objs from API: ',memories);
        return memories;
        }
    catch (error) { console.log('fetch failed Chuong, check your code', error); }
}

// ⇉ POST request
async function postApi(params) {
    try {
        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(params),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log('Res after POST request', json))

    } catch (error) { console.log(err.detail); }
    alert('POST request 🚀.\nMemory has been recorded at "https://c6project1api.herokuapp.com/api/memories/". \nClick Fetch Memory again to display');
    // FetchApi();
}

// 🗑️Delete post in API
async function delApi(params) {
    const deleteEndpoint = `${apiUrl}/${params}`;
    try {
        const response = await fetch(deleteEndpoint, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: `${params}` }),
        })
        const data = await response.json();
        alert(`${data.name} memory has been DELETED. Click Fetch Memories again to see the update`);
        //   FetchApi();
        return;
    } catch (error) {console.log(error);}
}

// 🖮 Update API
async function updateApi(params, data) {
    const editEndpoint = `${apiUrl}/${params}`;
    try {
        const response = await fetch(editEndpoint, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;

    } catch (error) {console.log(error);}
}



// scenes API

// var unirest = require("unirest");

// var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/continent=AF");

// req.query({
// 	"lang": "en",
// 	"show": "webcams:image,location"
// });

// req.headers({
// 	"x-rapidapi-key": "8ed01153e5msh6793097f3c8ae97p129b52jsn6648b7d31e40",
// 	"x-rapidapi-host": "webcamstravel.p.rapidapi.com",
// 	"useQueryString": true
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });

export { fetchApi, postApi, delApi, updateApi } ;