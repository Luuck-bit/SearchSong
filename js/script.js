const clientId = ``;
const clientSecret = ``
const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

const informs = document.getElementById('informs');

function requestSong(){
  const searchValue = serchBar.value;
  async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: 'grant_type=client_credentials',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }
  
    const data = await response.json();
    return data.access_token; // Token de acesso
  }


  async function searchTracks(query) {
    const token = await getAccessToken();
  
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch tracks');
    }
  
    const data = await response.json();
    return data.tracks.items; // Retorna as músicas encontradas
  }
  
  // Exemplo de uso
  searchTracks(searchValue).then(tracks => {
    tracks.forEach(track => {
      console.log(`Música: ${track.name}, Artista: ${track.artists[0].name}`);
      informs.innerHTML += `
      <div>
      <div id="data">
        <img src="${track.album.images[1].url}" alt="Album Cover">
        <div>
          <h1>${track.name}</h1>
          <p><strong>Artist:</strong> ${track.artists[0].name}</p>
          <p><strong>Album:</strong> ${track.album.name}</p>
          <audio controls>
          <source src="${track.preview_url}" type="audio/mpeg">
          Your browser does not support the audio element.
          </audio>
          <a href="${track.external_urls.spotify}" target="_blank"><img src="./icons/spotify.png" alt="Listen on Spotify"><p>Listen on Spotify</p></a>
        </div>
      </div>
      <hr>
      </div>
      `
    });
  });

}

const serchBar = document.getElementById('search');
const button = document.getElementById('button');


button.addEventListener('click', (event) => {
  event.preventDefault();
  requestSong();
})
serchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    requestSong();
  }
})






