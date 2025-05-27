import { useEffect, useState } from 'react';
import { getTopTracks } from '../api/fetchData'

export default function TopTracks() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
      getTopTracks().then(setTracks).catch(console.error);
    }, []);
    return (
        <>
            <section className="popular-tracks">
                <div>Popular tracks</div>
            </section>
    
            <div className="tracks-grid">
                {tracks.map((track) => (
                    <div className="track-item">
                        <img src={track.image?.find(img => img.size === 'medium')?.['#text'] || ''} className="track-image"/>
                        <div className="track-info">
                            <div className="track-title">{track.name}</div>
                            <div className="track-artist">{track.artist?.name || 'Unknown artist'}</div>
                            <div className="track-genres">{track.tags?.tag?.map(tag => tag.name).join(' · ') || 'Unknown genre'}</div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
}