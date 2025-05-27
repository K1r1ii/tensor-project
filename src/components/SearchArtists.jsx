import { useEffect, useState } from 'react';
import { getArtistsByQuery, getTopArtists } from '../api/fetchData'

export default function SearchArtists({ query }) {
    const [artists, setArtists] = useState([]);
    useEffect(() => {
      getArtistsByQuery(query).then(setArtists).catch(console.error);
    }, []);

    return (
        <>
            <section className="artists-section">
                <h2>Artists</h2>
                <div className="items-grid artists">
                    {artists.map((artist) => (
                        <div className="item">
                            <img src={artist.image?.find(img => img.size === 'medium')?.['#text'] || ''} alt="" class="item-image"/>
                            <div className="item-overlay">
                                <h3 className="item-name">{artist.name}</h3>
                                <p className="item-desc">{artist.listeners} listeners</p>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="more-items"><a href="#">More artists →</a></div>
            </section>
        </>
    );
}