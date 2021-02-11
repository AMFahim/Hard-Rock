const searchSongs = () =>{
  const searchText = document.getElementById("search-field").value;
const url = ` https://api.lyrics.ovh/suggest/${searchText}`
fetch(url)
.then(res => res.json())
.then(data => displaySongs(data.data))
.catch(error => displayError('Something went wrong!! please try again later'));
}

// const searchSongs = async() =>{
//   const searchText = document.getElementById("search-field").value;
// const url = ` https://api.lyrics.ovh/suggest/${searchText}`
// const res = await fetch(url);
// const data = await res.json();
//  displaySongs(data.data);
// }

const displaySongs = songs => {
  const songContainer = document.getElementById("song-container")
  songContainer.innerHTML = '';
songs.forEach(song => {
  const songDiv = document.createElement('div');
  songDiv.className = "single-result row align-items-center my-3 p-3"
  songDiv.innerHTML = `
  <div class="col-md-9">
      <h3 class="lyrics-name">${song.title}</h3>
      <p class="author lead">Album by <span>${song.artist.name}</span></p>
      <audio controls id="audio-btn-responsive">
          <source src="${song.preview}" type="audio/ogg">
      </audio>
  </div>
  <div class="col-md-3 text-md-right text-center">
      <button onclick ="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
  </div>
  `
  songContainer.appendChild(songDiv);

});
}
// const getLyric = (artist, title) => {
// const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
// console.log(url);
// fetch(url)
// .then(res => res.json())
// .then(data => displayLyrics(data.lyrics))
// }

const getLyric = async(artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
  try{
    const res = await fetch(url);
    const data = await res.json();
     displayLyrics(data.lyrics);
  }
  catch(error){
    displayError('Sorry! I failed to load lyric. Please try again later!!!')
  }
  }

const displayLyrics = lyrics =>{
  const lyricsDiv = document.getElementById("song-lyrics");
  lyricsDiv.innerText = lyrics;
}

const displayError = error => {
  const errorTag = document.getElementById("error-message");
  errorTag.innerText = error;
}