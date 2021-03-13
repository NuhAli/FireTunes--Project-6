import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MobileNavPlaylist.scss'
import { BiListPlus } from 'react-icons/bi'

class MobileNavPlaylist extends Component {

    render() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.props.getPlaylists()
            }, 500);
        })
        const playLists = this.props.playlists.map(playlist => {
            return (
                <Link to="/existingplaylist" key={playlist.id}  >
                    <div className="list-item" onClick={() => {
                        this.props.clear()
                        setTimeout(() => {
                            this.props.getPlaylistInfo(playlist.id)
                        }, 500);
                        this.props.handleMenuToggle()
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
                    <Link to="/newplaylist">
                        <button className="cta" onClick={this.props.handleMenuToggle}>
                            New playlist <BiListPlus />
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default MobileNavPlaylist;
