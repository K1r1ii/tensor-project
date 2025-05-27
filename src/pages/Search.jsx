import React, { useState, useEffect } from 'react';
import SearchAlbums from "../components/SearchAlbums";
import SearchArtists from "../components/SearchArtists";
import SearchTracks from "../components/SearchTracks";


export default function Search() {
    const [query, setQuery] = useState('never gonna give you up');
    const [activeTab, setActiveTab] = useState('top');


    return (
        <main>
          <section className="search-results">
            <h1 className="search-query">Search results for "{query}"</h1>
    
            <div className="tabs">
              <div 
                className={`tab ${activeTab === 'top' ? 'active-tab' : ''}`} 
                onClick={() => setActiveTab('top')}
              >
                Top Results
              </div>
              <div 
                className={`tab ${activeTab === 'artists' ? 'active-tab' : ''}`} 
                onClick={() => setActiveTab('artists')}
              >
                Artists
              </div>
              <div 
                className={`tab ${activeTab === 'albums' ? 'active-tab' : ''}`} 
                onClick={() => setActiveTab('albums')}
              >
                Albums
              </div>
              <div 
                className={`tab ${activeTab === 'tracks' ? 'active-tab' : ''}`} 
                onClick={() => setActiveTab('tracks')}
              >
                Tracks
              </div>
            </div>
    
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
              />
              <button className="search-btn">
                <img 
                  src="https://www.last.fm/static/images/icons/search/search_232323_16.fd4564f92909.png "
                  alt="Search"
                />
              </button>
            </div>
          </section>
    
          {activeTab === 'top' && (
            <>
              <SearchArtists query={query} />
              <SearchAlbums query={query} />
              <SearchTracks query={query} />
            </>
          )}
    
          {activeTab === 'artists' && <SearchArtists query={query} />}
          {activeTab === 'albums' && <SearchAlbums query={query} />}
          {activeTab === 'tracks' && <SearchTracks query={query} />}
        </main>
      );
}
