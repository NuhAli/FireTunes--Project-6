import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import { BiSearch } from 'react-icons/bi';
import './SearchResults.scss'


// Search result component (class)
class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: ''
        }
        this.searchTrack = this.searchTrack.bind(this)
        this.handleSearchQuery = this.handleSearchQuery.bind(this)
    }
    // Function is used to pass in paramters to Spotify.search() function.
    searchTrack() {
        this.props.search(this.state.searchQuery)
    }
    // Stores the string entered into the input elelment as the searchQuery state element
    handleSearchQuery(event) {
        this.setState({
            searchQuery: event.target.value,
        })
    }
    render() {
        return (
            <div className="search-results-area">
                <div className="search-bar">
                    <input type="text" name="searchQuery" placeholder="Search for a song ...." onChange={this.handleSearchQuery} />
                    <button type="button" className="cta" onClick={this.searchTrack}><BiSearch /></button>
                </div>
                <TrackList
                    tracks={this.props.tracks}
                    addTrack={this.props.addTrack}
                    isRemoval={false}
                    existingPlaylist={false}
                />
            </div>
        )
    }
}

export default SearchResults;
