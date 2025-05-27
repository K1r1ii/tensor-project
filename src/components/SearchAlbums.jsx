import React, { useEffect, useState } from 'react';
import { getAlbumsByQuery } from '../api/fetchData';

export default function SearchAlbums({ query }) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbumsByQuery(query)
            .then(setAlbums)
            .catch(error => {
                console.error('Error fetching albums:', error);
                setAlbums([]);
            });
    }, [query]);

    return (
        <>
            <section className="albums-section">
                <h2>Albums</h2>
                <div className="items-grid albums">
                    {albums.map((album) => {
                        const imageUrl = album.image?.find(img => img.size === 'large')?.['#text'] || '';
                        
                        return (
                            <div key={album.url} className="item">
                                <img 
                                    src={imageUrl} 
                                    alt={album.name} 
                                    className="item-image"
                                />
                                <div className="item-overlay">
                                    <h3 className="item-name">{album.name}</h3>
                                    <p className="item-desc">{album.artist}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="more-items">
                    <a href="#">More albums →</a>
                </div>
            </section>
        </>
    );
}