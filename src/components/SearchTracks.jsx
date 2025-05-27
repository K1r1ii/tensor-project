import React, { useEffect, useState } from 'react';
import { getTracksByQuery } from '../api/fetchData';

export default function SearchTracks({ query }) {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        getTracksByQuery(query)
            .then(setTracks)
            .catch(error => {
                console.error('Error fetching tracks:', error);
                setTracks([]);
            });
    }, [query]);

    return (
        <section className="tracks-section">
            <h2>Tracks</h2>
            <div className="track-list">
                {tracks.map((track) => {
                    const imageUrl = track.image?.find(img => img.size === 'medium')?.['#text'] || '';
                    return (
                        <div key={track.url} className="track-item">
                            <div className="track-play">
                                <button className="custom-button">
                                    <img 
                                        className="start-image" 
                                        src="https://img.icons8.com/?size=100&id=59862&format=png&color=000000 " 
                                        alt="start/stop"
                                    />
                                </button>
                            </div>
                            <img 
                                src={imageUrl} 
                                alt={track.name} 
                                className="track-image"
                            />
                            <button className="custom-button">
                                <img 
                                    className="like-logo" 
                                    src="https://img.icons8.com/?size=100&id=53TQ8096ZRdz&format=png&color=999999 " 
                                    alt="like"
                                />
                            </button>
                            <div className="track-details">
                                <h3 className="track-title">{track.name}</h3>
                                <p className="track-artist">{track.artist}</p>
                                <p className="track-duration">{track.listeners}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="more-tracks">
                <a href="#">More tracks →</a>
            </div>
        </section>
    );
}