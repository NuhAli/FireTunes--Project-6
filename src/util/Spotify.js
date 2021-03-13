const clientId = process.env.REACT_APP_SECRET_KEY;
const redirectUri = 'https://nuhali.github.io/FireTunes--Project-6/'
let accessToken

// Function converts milliseconds unit to minutes:seconds
const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// Spotify module that containes all the functions needed to interface with the Spotify API.
const Spotify = {
    // This function gets a spotify access token via implict grant authorization process, scopes: playlist-modify-public,playlist-read-private,playlist-read-collaborative
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/)
        
        if (accessTokenMatch && expirationTimeMatch) {
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expirationTimeMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 100000);
            window.history.pushState('Access Token', null, '/')
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20playlist-read-private%20playlist-read-collaborative&redirect_uri=${redirectUri}`
            window.location = `${accessUrl}`
            console.log(accessTokenMatch)
        }
    },

    // Function uses the fetch(get) API to retrieves data related to a string passed in.
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track&market=US&limit=15`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }).then(
            response => {
                return response.json()
            }
        ).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                title: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                duration: millisToMinutesAndSeconds(track.duration_ms),
                id: track.id,
                uri: track.uri
            }))
        })
    },
    // Function takes in 2 parameters, which are playlist name(string) and an array of track uris to save a playlist to spotify using the fetch(post).
    async savePlaylist(name, trackUris) {
        const accessToken = Spotify.getAccessToken()
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        let userId;
        if (!name || !trackUris.length) {
            alert('Please make sure to enter a name and at least one track from the search results.')
        }
        return fetch('https://api.spotify.com/v1/me', {
                headers: headers
            }).then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({
                            name: name,
                            "description": "Playlist created by Fire Tunes using the Spotify API",
                            "public": true
                        })
                    }).then(response => response.json())
                    .then(jsonResponse => {
                        let playListId = jsonResponse.id
                        return fetch(`https://api.spotify.com/v1/playlists/${playListId}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({
                                uris: trackUris
                            })
                        })
                    })
            })
    },
    // This function returns a list of all the users private and public playlists on Spotify.
    async getPlaylists(){
        const accessToken = Spotify.getAccessToken()
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        return fetch('https://api.spotify.com/v1/me/playlists',{
            headers: headers
        }).then(response => {
            if(response.ok){
                return response.json()
            } throw new Error("Request failed")
        }).then(jsonResponse => {
            let result = jsonResponse.items.map(item => {
                return {
                    name: item.name,
                    id: item.id
                }
            })
            return result
        })
    },

    // This function returns an array of objects which contain the information of all the tracks associated with the playlist passed in as a parameter.
    async getPlaylistInfo(playListId) {
        const accessToken = Spotify.getAccessToken()
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        return fetch(`https://api.spotify.com/v1/playlists/${playListId}`,{
            headers: headers
        }).then(response => {
            if(response.ok){
                return response.json()
            } else {
                alert("Failed here")
            }
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return
            } else {
                const playlistInfo = jsonResponse.tracks.items.map(item => {
                    return ({
                        id: playListId,
                        title: item.track.name,
                        artist:item.track.album.artists[0].name,
                        album: item.track.album.name,
                        duration: millisToMinutesAndSeconds(item.track.duration_ms),
                        uri: item.track.uri
                    })
                })
                return playlistInfo
            }
        })
    }
}

export default Spotify