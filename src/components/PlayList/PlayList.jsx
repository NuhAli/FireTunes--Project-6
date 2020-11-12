import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './PlayList.scss'
import { BiListPlus } from 'react-icons/bi'

// Playlist component (class)
class PlayList extends Component {
    render() {
        // Gets user playlist after 500ms after window loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.props.getPlaylists()
            }, 500);
        })
        // Maps through array of objects that contain user playlist information.
        const playLists = this.props.playlists.map(playlist => {
            return (
                <Link to="/playlistname" key={`${Math.random()}`} >
                    <div className="list-item"  onClick={() => {
                        this.props.clear()
                        setTimeout(() => {
                            this.props.getPlaylistInfo(playlist.id)
                        }, 500);
                    }}>
                        <div className="hover-effect"></div>
                        <li>{playlist.name}</li>
                    </div>
                </Link>
            )
        })
        return (
            <div className="playlist">
                <h4 className="section-title">
                    Your Playlists
                </h4>
                <ul className="playlist-list">
                    {playLists}
                </ul>
                <div className="button-area">
                    <Link to="/">
                        <button className="cta">
                            New playlist <BiListPlus />
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default PlayList;
