const request = require('request-promise');
const keys = require('../../config/keys');
const select = require('cheerio-select');
const cheerio = require('cheerio')

let _token = null;
const getToken = async () => {
  if (_token){
    return _token;
  }

  try {
    const authResponse = await request({
      method: 'POST',
      url: 'https://api.petfinder.com/v2/oauth2/token',
      formData: {
        grant_type: "client_credentials",
        client_id: keys.ADOPT_KEY,
        client_secret: keys.ADOPT_SECRET
      }, 
      json: true
    })
    _token = authResponse.access_token;

    setTimeout(() => {
      _token = null;
    }, 1000*60*30)

    return _token; 

  } catch(err) {
    console.log(err)
  }
}

// const searchByBreedAndLoc = async(breed, location) => {
//   const token = await getToken();

//   // sanitize user input
//   breed = encodeURIComponent(breed);
//   location = encodeURIComponent(location);

//   const result = await request({
//     method: 'GET',
//     url: `https://api.petfinder.com/v2/animals?type=dog&location=${location}&breed=${breed}`,
//     auth: { bearer: token, sendImmediately: true },
//     json: true
//   })

//   return result;
// }

const dogCache = {};


//shape dog data
const dogTransform = (dog) => {
  let photoUrl = null;
  if (dog.photos[0]){
    photoUrl = dog.photos[0].full;
  } 

  return {
    id: dog.id,
    age: dog.age,
    gender: dog.gender,
    url: dog.url,
    size: dog.size,
    name: dog.name,
    description: dog.description,
    photoUrl: photoUrl,
    breeds: dog.breeds,
    colors: dog.colors,
    coat: dog.coat,
    environment: dog.environment,
    contact: dog.contact
  }
} 

// remove dogs from result that don't have photos
const dogListTransform = (dogs) => {
  dogs = dogs.map(dogTransform);
  return dogs.filter(dog => dog.photoUrl);
}

const getShibas = async () => {
  const token = await getToken();

  // sanitize user input
  let breed = encodeURIComponent("shiba inu");

  const result = await request({
    method: 'GET',
    url: `https://api.petfinder.com/v2/animals?type=dog&breed=${breed}`,
    auth: { bearer: token, sendImmediately: true },
    json: true
  })

  return dogListTransform(result.animals);
}

const getOneDog = async(dogId) => {
  if (dogCache[dogId]){
    return dogCache[dogId];
  }

  const token = await getToken();

  const result = await request({
    method: 'GET',
    url: `https://api.petfinder.com/v2/animals/${dogId}`,
    auth: { bearer: token, sendImmediately: true },
    json: true
  })
  const dog = dogTransform(result.animal);

  //get html for page to scrape description bc the dumb api cuts it off
  const pageResultQuery = request(result.animal.url)

  //get breed info from The Dog API
  const breedResQuery = request({
    method: 'GET',
    url: `https://api.thedogapi.com/v1/breeds/search?q=${result.animal.breeds.primary}`,
    headers: { "x-api-key": keys.DOG_KEY },
    json: true
  })

  const [pageResult, breedRes] = await Promise.all([pageResultQuery, breedResQuery])
  
  const $ = cheerio.load(pageResult);

  let desc = null
  $("h2").each((idx, el) => {
    if($(el).text().includes("Meet ")) {
      desc = $(el).next().text().trim()
    }
  })
  if(desc) {
    dog.description = desc
  } else {
    dog.description = "No description provided."
  }

  if (breedRes[0]){
    dog.breedInfo = breedRes[0]
  }

  //store the dog so we don't hit the api more than we need to
  dogCache[dogId] = dog;
  return dog;
}


module.exports = { getShibas, getOneDog }