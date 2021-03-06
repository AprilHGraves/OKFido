const request = require('request-promise');
const keys = require('../../config/keys');
const select = require('cheerio-select');
const cheerio = require('cheerio')

//the token expires every hour, so this grabs a new one
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

// create a cache so we don't hit the petfinder api so many times if we already
// have the data for that one dog
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

const dogSearch = async (args) => {
  let searchArgs = JSON.parse(args);
  return searchByDistAndLoc(searchArgs.distance, searchArgs.location, searchArgs)
}

const searchByDistAndLoc = async (distance, location, searchParams = {}) => {
  let url = `https://api.petfinder.com/v2/animals?type=dog&location=${location}&distance=${distance}&limit=50`
  if (searchParams.coat && searchParams.coat.length){
    url += `&coat=`
    url += searchParams.coat.map(coat => coat.toLowerCase()).join(',');
  }

  if (searchParams.gender && searchParams.gender.length){
    url += `&gender=`
    url += searchParams.gender.map(gender => gender.toLowerCase()).join(',');
  }

  if (searchParams.size && searchParams.size.length) {
    url += `&size=`
    url += searchParams.size.map(size => size.toLowerCase()).join(',');
  }

  if (searchParams.age && searchParams.age.length) {
    url += `&age=`
    url += searchParams.age.map(age => age.toLowerCase()).join(',');
  }

  const token = await getToken();

  // sanitize user input
  location = encodeURIComponent(location);
  distance = encodeURIComponent(distance);

  const result = await request({
    method: 'GET',
    url: url,
    auth: { bearer: token, sendImmediately: true },
    json: true
  })

  return dogListTransform(result.animals);
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
    return Object.assign({}, dogCache[dogId]);
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
  return Object.assign({}, dogCache[dogId]);;
}


module.exports = { getShibas, getOneDog, searchByDistAndLoc, dogSearch }