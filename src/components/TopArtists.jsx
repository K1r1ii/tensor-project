import { useEffect, useState } from 'react';
import { getTopArtists } from '../api/fetchData'

export default function TopArtists() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
      getTopArtists().then(setArtists).catch(console.error);
    }, []);

    return (
        <>
            <section className="hot-now">
                <div>Hot right now</div>
            </section>
    
            <div className="artists-grid">
                {artists.map((artist) => (
                    <div className="artist-item">
                        <img src={artist.image?.find(img => img.size === 'medium')?.['#text'] || ''} class="artist-image"/>
                        <div className="artist-name">{artist.name}</div>
                        <div className="genres">{artist.tags?.tag?.map(tag => tag.name).join(' · ') || 'Unknown genre'}</div>
                    </div>
                ))}
            </div>
        </>
    );
}