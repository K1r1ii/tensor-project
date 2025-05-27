const API_KEY = 'e8dea2e3bfd0e0258422daf517c33600';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';


/**
 * Загружает топ-артистов с Last.fm API и отображает их на странице
 * @async
 * @function fetchTopArtists
 * @returns {Promise<void>} Ничего не возвращает, но обновляет DOM через renderArtists
 * @throws {Error} В случае ошибки загрузки данных
 */
async function fetchTopArtists() {
  const url = `${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const artists = data.artists.artist.slice(0, 12);
    renderArtists(artists);
  } catch (error) {
    console.error('Ошибка загрузки артистов:', error);
    document.querySelector('.artists-grid').innerHTML = '<p>Не удалось загрузить артистов</p>';
  }
}

/**
 * Загружает топ-треки с Last.fm API и отображает их на странице
 * @async
 * @function fetchTopTracks
 * @returns {Promise<void>} Ничего не возвращает, но обновляет DOM через renderTracks
 * @throws {Error} В случае ошибки загрузки данных
 */
async function fetchTopTracks() {
  const url = `${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const tracks = data.tracks.track.slice(0, 4);
    renderTracks(tracks);
  } catch (error) {
    console.error('Ошибка загрузки треков:', error);
    document.querySelector('.tracks-grid').innerHTML = '<p>Не удалось загрузить треки</p>';
  }
}

/**
 * Отрисовывает карточки артистов в контейнере .artists-grid
 * @function renderArtists
 * @param {Object[]} artists - Массив объектов артистов из Last.fm API
 * @param {string} artists[].name - Имя артиста
 * @param {Object[]} [artists[].tags] - Теги/жанры артиста
 * @param {Object[]} [artists[].image] - Массив изображений разного размера
 */
function renderArtists(artists) {
  const container = document.querySelector('.artists-grid');
  container.innerHTML = '';

  artists.forEach(artist => {
    const genres = artist.tags?.tag?.map(tag => tag.name).join(' · ') || 'Unknown genre';
    const imageUrl = artist.image?.find(img => img.size === 'medium')?.['#text'] || 'https://via.placeholder.com/300x200';

    const artistHTML = `
      <div class="artist-item">
        <img src="${imageUrl}" alt="${artist.name}" class="artist-image">
        <div class="artist-name">${artist.name}</div>
        <div class="genres">${genres}</div>
      </div>
    `;
    container.innerHTML += artistHTML;
  });
}

/**
 * Отрисовывает карточки треков в контейнере .tracks-grid
 * @function renderTracks
 * @param {Object[]} tracks - Массив объектов треков из Last.fm API
 * @param {string} tracks[].name - Название трека
 * @param {Object} tracks[].artist - Объект артиста
 * @param {string} tracks[].artist.name - Имя артиста
 * @param {Object[]} [tracks[].image] - Массив изображений разного размера
 */
function renderTracks(tracks) {
  const container = document.querySelector('.tracks-grid');
  container.innerHTML = '';

  tracks.forEach(track => {
    const artist = track.artist?.name || 'Unknown artist';
    const imageUrl = track.image?.find(img => img.size === 'medium')?.['#text'] || '';
    const genres = track.tags?.tag?.map(tag => tag.name).join(' · ') || 'Unknown genre';

    const trackHTML = `
      <div class="track-item">
        <img src="${imageUrl}" alt="${track.name}" class="track-image">
        <div class="track-info">
          <div class="track-title">${track.name}</div>
          <div class="track-artist">${artist}</div>
          <div class="track-genres">${genres}</div>
        </div>
      </div>
    `;
    container.innerHTML += trackHTML;
  });
}

/**
 * Инициализация страницы при полной загрузке DOM
 * @event DOMContentLoaded
 * @listens DOMContentLoaded
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
  fetchTopArtists();
  fetchTopTracks();
});