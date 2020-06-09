/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(q) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const response = await axios.get('http://api.tvmaze.com/search/shows',{params: {q}})
  console.log(response);
  for (let show of response.data){
    return [{
      id: show.show.id,
      name: show.show.name,
      summary: show.show.summary,
      image: show.show.image.original
    }];
  }
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
           <img src="${show.image}" class="card-img" alt="...">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-info" id = "episodes" type="submit">Get Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}

function populateEpisodes(id){
  const $episodesList = $('$episodes-list')
  $episodesList.empty();

}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

$('body').on("click","#episodes",async function(e){
  let showID = $(e.target).closest(".Show").data("show-id");
  console.log(showID);
  
  let $episodesArea = $("#episodes-area")
  $episodesArea.show();
  
  let episodesList = await getEpisodes(showID)
 
  for (episode of episodesList){
    let $newEpisode = $(`<ul><b>${episode.name}</b> (season ${episode.season} number ${episode.number})</ul>`)
    $episodesArea.append($newEpisode)
  }
})

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
  const response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  let episodeList = response.data;
  //console.log(episodeList);
  let episodeArray = [];
  for (let episode of episodeList){
    let episodeInfo = {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    }
  episodeArray.push(episodeInfo);
  }
  console.log(episodeArray);
  return episodeArray;
}



//PJV EXPLORATION ONLY

//for an array of shows that come back from one search
async function searchMultiShows(q) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const response = await axios.get('http://api.tvmaze.com/search/shows',{params: {q}})
  //console.log(response.data);
  let tvShows = [];
  for (let show of response.data){
    let showInfo = {
      id: show.show.id,
      name: show.show.name,
      summary: show.show.summary,
      image: show.show.image
    };
  
  tvShows.push(showInfo);
  }
  return tvShows;
}