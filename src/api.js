const APIController = (function() {

    const clientId = 'f7f108b7299045f9b0037dff800d13c2';
    const client_secret = 'f630db1d88f54e39aeb66b455b1e5e35';


    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientId + ':' + client_secret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _getGenres = async (token) => {

        const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlayistByGenre = async (token, genreId) => {

        const limit = 10;

        const result = await fetch('https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {
        const limit = 10;

        const result = await fetch('${tracksEndPoint}?limit=${limit}', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        })

        const data = await result.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {
        const limit = 10;

        const result = await fetch('${tracksEndPoint}', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        })

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlayistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})()

console.log('aboba')