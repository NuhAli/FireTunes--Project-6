import React from 'react'
import './MobileNav.scss'
import MobileNavPlaylist from '../MobileNavPlaylist/MobileNavPlaylist'

// Mobile navigation component (functional)
export const MobileNav = (props) => {
    return (
        <nav className={props.menuToggle? "active": "unactive"}>
            <MobileNavPlaylist
            menuToggle={props.menuToggle}
            playlists={props.playlists}
            getPlaylists={props.getPlaylists}
            getPlaylistInfo={props.getPlaylistInfo}
            clear={props.clear}
            handleMenuToggle={props.handleMenuToggle}
            />
        </nav>
        
    )
}
