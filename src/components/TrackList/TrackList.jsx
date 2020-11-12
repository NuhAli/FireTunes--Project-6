import React from 'react'
import './TrackList.scss'
import Track from '../Track/Track'

// Tracklist component (functional)
const TrackList = (props) => {
    
    // Variable is used to capture all the tracks returned from the search function
    const searchResults = props.tracks.map(track => {
        return <Track 
                    track={track}
                    key={Math.random()} 
                    addTrack={props.addTrack}
                    removeTrack={props.removeTrack}
                    isRemoval={props.isRemoval}
                    existingPlaylist={props.existingPlaylist}
                />
    })
    return (
        <div className="results-table-area">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Duration</th>
                        {
                            props.existingPlaylist? <th className="status" style={{'display':'none'}}>Status</th> : <th className="status">Status</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {searchResults}
                </tbody>
            </table>
        </div>
    )
}

export default TrackList
