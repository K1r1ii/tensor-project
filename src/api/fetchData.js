/**
 * Универсальный метод для получения данных из API 
 * @param {string} method - Метод API
 * @param {Object} [params={}] - Параметры запроса
 * @param {string} [format='json'] - Формат ответа
 * @returns {Promise<Object>} - Объект с данными из API
 * @throws {Error} - В случае ошибки запроса или ошибки от API
 */
export async function requestLastFM(method, params = {}) {
    const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
    const API_KEY = 'e8dea2e3bfd0e0258422daf517c33600';
    
    const queryParams = {
      method: method,
      ...params,
      api_key: API_KEY,
      format: "json"
    };
    
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${BASE_URL}?${queryString}`;
    
    try {
      console.log("sjdfkjdshfdjfhvkj")
      console.log(url)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(`Last.fm API error: ${data.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Last.fm API request error:', error);
      throw error;
    }
}


export async function getTopArtists() {
    try {
        const result = await requestLastFM('chart.gettopartists');
        return result.artists.artist.slice(0, 12);
      } catch (error) {
        console.error('Failed to get top artists:', error);
        return [];
      }
}

export async function getTopTracks() {
    try {
        const result = await requestLastFM('chart.gettoptracks');
        return result.tracks.track.slice(0, 4);
      } catch (error) {
        console.error('Failed to get top tracks:', error);
        return [];
      }
}

export async function getArtistsByQuery(query) {
    try {
        const result = await requestLastFM('artist.search', {artist: query, limit: 8});
        return result.results.artistmatches.artist;
      } catch (error) {
        console.error('Failed to get artists:', error);
        return [];
      }
}

export async function getAlbumsByQuery(query) {
    try {
        const result = await requestLastFM('album.search', {album: query, limit: 8});
        return result.results.albummatches.album;
      } catch (error) {
        console.error('Failed to get albums:', error);
        return [];
      }
}

export async function getTracksByQuery(query) {
    try {
        const result = await requestLastFM('track.search', {track: query, limit: 10});
        return result.results.trackmatches.track;
      } catch (error) {
        console.error('Failed to get tracks:', error);
        return [];
      }
}