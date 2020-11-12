import React from 'react'
import TrackList from '../TrackList/TrackList'
import './ExistingPlaylist.scss'

// Existing playlist component(functional)

const ExistingPlaylist = (props) => {
    return (
        <div className ="existing-play-list">
            <TrackList
                tracks={props.info}
                removeTrack={props.removeTrack}
                isRemoval={true}
                existingPlaylist={true}
            />
        </div>
    )
}

export default ExistingPlaylist
