export default function Header() {
    return (
        <header>
            <div className="media-controls">
                <button><img src="https://www.last.fm/static/images/playbar/previous_track.1e1b1fccec35.svg" alt="previous"/></button>
                <button><img className="start-image" src="https://img.icons8.com/?size=100&id=25603&format=png&color=ffffff" alt="stop/play"/></button>
                <button><img className="rotate_icon" src="https://www.last.fm/static/images/playbar/previous_track.1e1b1fccec35.svg" alt="next"/></button>
                <button className="custom-button"><img class="like-logo" src="https://img.icons8.com/?size=100&id=53TQ8096ZRdz&format=png&color=999999" alt="like"/></button>
            </div>
            <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Lastfm_logo.svg" alt="logo"/></div>
            <div className="nav-menu">
                <a href="search" class="search-icon"><img src="https://www.last.fm/static/images/icons/search/search_16.9c1d552b8f55.svg" alt="поиск"/></a>
                <a href="/">Home</a>
                <a href="#">Live</a>
                <a href="/">Music</a>
                <a href="#">Charts</a>
                <a href="#">Events</a>
                <a href="#">Features</a>
            </div>
            <div className="profile-icon"></div>
        </header>
    );
}