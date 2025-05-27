const API_KEY = 'e8dea2e3bfd0e0258422daf517c33600';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

const SPARE_IMAGE_URL = 'https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png'


/**
 * Загружает артистов по поисковому запросу с Last.fm API
 * @async
 * @function fetchArtistsByQuery
 * @param {string} [query="never gonna give you up"] - Строка поискового запроса
 * @returns {Promise<void>} Ничего не возвращает, но обновляет DOM через renderArtists
 * @throws {Error} В случае ошибки загрузки данных
 */
async function fetchArtistsByQuery(query="never gonna give you up") {
    const url = `${BASE_URL}?method=artist.search&artist=${query}&limit=8&api_key=${API_KEY}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const artists = data.results.artistmatches.artist;
        renderArtists(artists);
    } catch (error) {
        console.error('Ошибка загрузки артистов:', error);
        document.querySelector('.artists').innerHTML = '<p>Не удалось загрузить артистов</p>';
    }
}

/**
 * Загружает альбомы по поисковому запросу с Last.fm API
 * @async
 * @function fetchAlbumsByQuery
 * @param {string} [query="never gonna give you up"] - Строка поискового запроса
 * @returns {Promise<void>} Ничего не возвращает, но обновляет DOM через renderAlbums
 * @throws {Error} В случае ошибки загрузки данных
 */
async function fetchAlbumsByQuery(query="never gonna give you up") {
    const url = `${BASE_URL}?method=album.search&album=${query}&limit=8&api_key=${API_KEY}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const albums = data.results.albummatches.album;
        renderAlbums(albums);
    } catch (error) {
        console.error('Ошибка загрузки альбомов:', error);
        document.querySelector('.albums').innerHTML = '<p>Не удалось загрузить альбомы</p>';
    }
}

/**
 * Загружает треки по поисковому запросу с Last.fm API
 * @async
 * @function fetchTracksByQuery
 * @param {string} [query="never gonna give you up"] - Строка поискового запроса
 * @returns {Promise<void>} Ничего не возвращает, но обновляет DOM через renderTracks
 * @throws {Error} В случае ошибки загрузки данных
 */
async function fetchTracksByQuery(query="never gonna give you up") {
    const url = `${BASE_URL}?method=track.search&track=${query}&limit=10&api_key=${API_KEY}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const albums = data.results.trackmatches.track;
        renderTracks(albums);
    } catch (error) {
        console.error('Ошибка загрузки треков:', error);
        document.querySelector('.track-list').innerHTML = '<p>Не удалось загрузить треки</p>';
    }
}

/**
 * Отрисовывает результаты поиска артистов
 * @function renderArtists
 * @param {Object[]} artists - Массив объектов артистов из Last.fm API
 * @param {string} artists[].name - Имя артиста
 * @param {number} artists[].listeners - Количество слушателей
 * @param {Object[]} [artists[].image] - Массив изображений разного размера
 * @returns {void}
 */
async function renderArtists(artists) {
    const container = document.querySelector('.artists');
    container.innerHTML = '';

    if (artists.length == 0) {
        container.innerHTML += "<p>По вашему запросу ничего не найдено.</p>";
        return;
    }

    artists.forEach(artist => {
        const imageUrl = artist.image?.find(img => img.size === 'medium')?.['#text'] || SPARE_IMAGE_URL;

        const artistHTML = `
            <div class="item">
                <img src="${imageUrl}" alt="" class="item-image">
                <div class="item-overlay">
                    <h3 class="item-name">${artist.name}</h3>
                    <p class="item-desc">${artist.listeners} listeners</p>
                </div>
            </div>
        `;
        container.innerHTML += artistHTML;
      });
}

/**
 * Отрисовывает результаты поиска альбомов
 * @function renderAlbums
 * @param {Object[]} albums - Массив объектов альбомов из Last.fm API
 * @param {string} albums[].name - Название альбома
 * @param {string} albums[].artist - Имя артиста
 * @param {Object[]} [albums[].image] - Массив изображений разного размера
 * @returns {void}
 */
async function renderAlbums(albums) {
    const container = document.querySelector('.albums');
    container.innerHTML = '';

    if (albums.length == 0) {
        container.innerHTML += "<p>По вашему запросу ничего не найдено.</p>";
        return;
    }

    albums.forEach(album => {
        const imageUrl = album.image?.find(img => img.size === 'large')?.['#text'] || SPARE_IMAGE_URL;

        const albumHTML = `
            <div class="item">
                <img src="${imageUrl}" alt="" class="item-image">
                <div class="item-overlay">
                    <h3 class="item-name">${album.name}</h3>
                    <p class="item-desc">${album.artist}</p>
                </div>
            </div>
        `;
        container.innerHTML += albumHTML;
      });
}

/**
 * Отрисовывает результаты поиска треков
 * @function renderTracks
 * @param {Object[]} tracks - Массив объектов треков из Last.fm API
 * @param {string} tracks[].name - Название трека
 * @param {Object} tracks[].artist - Объект артиста
 * @param {string} tracks[].artist.name - Имя артиста
 * @param {Object[]} [tracks[].image] - Массив изображений разного размера
 * @returns {void}
 */
async function renderTracks(tracks) {
    const container = document.querySelector('.track-list');
    container.innerHTML = '';
    
    if (tracks.length == 0) {
        container.innerHTML += "<p>По вашему запросу ничего не найдено.</p>";
        return;
    }

    tracks.forEach(track => {
        const imageUrl = track.image?.find(img => img.size === 'medium')?.['#text'] || SPARE_IMAGE_URL;

        const trackHTML = `
            <div class="track-item">
                <div class="track-play"><button class="custom-button"><img class="start-image" src="https://img.icons8.com/?size=100&id=59862&format=png&color=000000   " alt="start/stop"></button></div>
                <img src="${imageUrl}" alt="" class="track-image">
                <button class="custom-button"><img class="like-logo" src="https://img.icons8.com/?size=100&id=53TQ8096ZRdz&format=png&color=999999   " alt="like"></button>
                <div class="track-details">
                    <h3 class="track-title">${track.name}</h3>
                    <p class="track-artist">${track.artist}</p>
                    <p class="track-duration">${track.listeners}</p>
                </div>
            </div>
        `;
        container.innerHTML += trackHTML;
      });
}

/**
 * Обновляет заголовок результатов поиска
 * @function renderSerchQwery
 * @param {string} [query="never gonna give you up"] - Строка поискового запроса
 * @returns {void}
 */
async function renderSerchQwery(query="never gonna give you up") {
    const container = document.querySelector('.search-results');
    const oldHeading = container.querySelector('h1');
    oldHeading?.remove();

    const newHeading = document.createElement('h1');
    newHeading.textContent = `Search results for "${query}"`;

    container.prepend(newHeading);
}

/**
 * Инициализация страницы при полной загрузке DOM
 * @event DOMContentLoaded
 * @listens DOMContentLoaded
 * @description Устанавливает обработчики событий поиска и запускает начальную загрузку данных
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query.length < 2) return;
        
        fetchArtistsByQuery(query);
        fetchAlbumsByQuery(query);
        fetchTracksByQuery(query);
        renderSerchQwery(query);
    }
    
    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
        performSearch();
        }
    });

    fetchArtistsByQuery();
    fetchAlbumsByQuery();
    fetchTracksByQuery();
    renderSerchQwery();
});
