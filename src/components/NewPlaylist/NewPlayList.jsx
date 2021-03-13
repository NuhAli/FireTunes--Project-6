import React from 'react'
import TrackList from '../TrackList/TrackList'
import './NewPlaylist.scss'

// New playlist component(functional)
const NewPlayList = (props) => {
    // Function used to pass in parameters to the Spotify.search() function
    const save = () => {
        if(props.playlistTracks.length === 0){
            alert("Please add at least 1 track to the playlist before saving.")
        } else {
            props.savePlaylist(props.playlist,props.listOfUris)
        }
    }
    return (
        <div className="newplay-list">
            <input
            id="naming-input" 
            type="text" 
            name="playListName"
            placeholder="Enter a new playlist name...."
            onChange={props.handleNameChange}
            />
            <TrackList
                tracks={props.playlistTracks}
                removeTrack={props.removeTrack}
                isRemoval={true}
            />
            <button className="cta" onClick={save} >
                Save to spotify
            </button>
        </div>
    )
}

export default NewPlayList
