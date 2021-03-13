import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import { MobileNav } from './components/MobileNav/MobileNav'
import Playlist from './components/PlayList/PlayList'
import SearchResults from './components/SearchResults/SearchResults'
import NewPlaylist from './components/NewPlaylist/NewPlayList'
import ExistingPlaylist from './components/ExistingPlaylist/ExistingPlaylist'
import Spotify from './util/Spotify'
import './App.scss';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playlists: [],
      tracks: [],
      existingPlaylistName: [],
      existingPlaylistInfo: [],
      playlistName: '',
      playlistTracks: [],
      listOfUris: [],
      menuToggle: false
    }
    this.handleMenuToggle = this.handleMenuToggle.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSearchQuery = this.handleSearchQuery.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.searchTrack = this.searchTrack.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.getPlaylists = this.getPlaylists.bind(this)
    this.getPlaylistInfo = this.getPlaylistInfo.bind(this)
    this.clearCurrent = this.clearCurrent.bind(this)
  }

  // Captures new playlist name and updates state
  handleNameChange(event) {
    this.setState({
      playlistName: event.target.value,
    })
  }

  // Captures the search query that is passed to the Spotify search function
  handleSearchQuery(event) {
    this.setState({
      searchQuery: event.target.value,
    })
  }

  // Changes state to toggle the mobile playlist menu
  handleMenuToggle() {
    this.setState({
      menuToggle: !this.state.menuToggle
    })
  }

  // Adds track from the search results to the new playlist list
  addTrack(track) {
    const searchList = this.state.tracks
    let uriList = this.state.listOfUris
    const item = searchList.find(result => result.id === track.id)
    let updatedUriList = uriList.push(item.uri)
    const newTracklist = searchList.filter(item => item.id !== track.id)
    const newPlaylist = [...this.state.playlistTracks, item]
    this.setState({
      tracks: newTracklist,
      playlistTracks: newPlaylist,
      uriList: updatedUriList
    })
  }

  // Removes track from new playlist and adds back to the search results
  removeTrack(track) {
    const playList = this.state.playlistTracks
    const newPlaylist = playList.filter(item => item.id !== track.id)
    let newTracklist
    let updatedUriList = this.state.listOfUris.filter(item => item !== track.uri)
    if(this.state.tracks.length > 0){
      newTracklist = [...this.state.tracks, track]
    } else {
      newTracklist = [...this.state.tracks]
    }
    this.setState({
      tracks: newTracklist,
      playlistTracks: newPlaylist,
      listOfUris: updatedUriList
    })
  }

  searchTrack(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        tracks: searchResults
      })
    })
  }

  savePlaylist() {
    const trackUris = this.state.listOfUris
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      alert(`Your playlist "${this.state.playlistName}" has been saved to spotify.`)
      this.setState({
        playlistName: '',
        playlistTracks: [],
        listOfUris: []
      })
    })
    setInterval(() => {
      window.location.href = "https://nuhali.github.io/FireTunes--Project-6/"
    }, 1000);
  }

  getPlaylists() {
    Spotify.getPlaylists().then(results => {
      this.setState({
        playlists: results
      })
    })
  }

  getPlaylistInfo(playlist) {
    Spotify.getPlaylistInfo(playlist).then(result => {
      this.setState({
        existingPlaylistInfo: result,
        tracks: []
      })
    })
  }

  clearCurrent() {
    this.setState({
      existingPlaylistInfo: []
    })
  }

  // Gets Spotify access token 
  componentDidMount() {
    window.addEventListener('load', () => { Spotify.getAccessToken()});
  }

  render() {
    return (
      <>
        <Header
          menuToggle={this.state.menuToggle}
          onclick={this.handleMenuToggle}
        />
        <MobileNav
          playlists={this.state.playlists}
          getPlaylists={this.getPlaylists}
          getPlaylistInfo={this.getPlaylistInfo}
          clear={this.clearCurrent}
          menuToggle={this.state.menuToggle}
          handleMenuToggle={this.handleMenuToggle}
        />

        <main className="main-area">

          <section className="playlist-section">
            <div className="container">
              <Playlist
                playlists={this.state.playlists}
                getPlaylists={this.getPlaylists}
                getPlaylistInfo={this.getPlaylistInfo}
                clear={this.clearCurrent}
              />
            </div>
            <div className="border-right"></div>
          </section>

          <section className="searchresults-section">
            <div className="container">
              <Switch>
                <Route exact path="/newplaylist">
                  <SearchResults
                    tracks={this.state.tracks}
                    addTrack={this.addTrack}
                    search={this.searchTrack}
                  />
                  <NewPlaylist
                    playlist={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    handleNameChange={this.handleNameChange}
                    removeTrack={this.removeTrack}
                    savePlaylist={this.savePlaylist}
                    listOfUris={this.state.listOfUris}
                  />
                </Route>
                <Route path="/existingplaylist">
                  <ExistingPlaylist
                    info={this.state.existingPlaylistInfo}
                    removeTrack={this.removeTrack}
                    savePlaylist={this.savePlaylist}
                    listOfUris={this.state.listOfUris}
                  />
                </Route>
              </Switch>
            </div>
          </section>

        </main>
      </>
    );
  }
}

export default App;
