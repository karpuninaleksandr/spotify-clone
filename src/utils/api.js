const client_id = 'f7f108b7299045f9b0037dff800d13c2'
const client_secret = 'f630db1d88f54e39aeb66b455b1e5e35'

const token_adress = 'https://accounts.spotify.com/api/token'
const genres_adress = 'https://api.spotify.com/v1/browse/categories?locale=sv_RU'
const playlist_adress_part_1 = 'https://api.spotify.com/v1/browse/categories/'
const playlist_adress_part_2 = '/playlists?limit='
const tracks_adress_part_1 = 'https://api.spotify.com/v1/playlists/'
const tracks_adress_part_2 = '/tracks?limit='
const track_adress = 'https://api.spotify.com/v1/tracks/'

//let access_token 

export default class API {
    static access_token = null
    /**
     * Метод получения token для запросов к API
     */
    static get_token = async() => {
        try {
            const result = await fetch(token_adress, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
                },
                body: 'grant_type=client_credentials'
            })
            const data = await result.json()
            this.access_token = data.access_token
            this.get_genres()
        } catch(error) {return null}
    }

    /**
     * Метод получения жанров песен
     */
    static get_genres = async() => {
        try {
            const result = await fetch(genres_adress, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + this.access_token
                }
            })
            const data = await result.json()
            return data.categories.items
        } catch(error) {return []}    
    }

    /**
     * Метод получения жанров плейлистов согласно выбранному жанру
     */
    static get_playlists = async(genre) => {
        try {
            const limit = 15
            const result = await fetch(playlist_adress_part_1 + genre + playlist_adress_part_2 + limit, {
                method: 'GET',
                headers: 
                { 
                    'Authorization' : 'Bearer ' + this.access_token
                }
            })
        const data = await result.json() 
        return data.playlists.items 
        } catch(error) {return []}    
    }

    /**
     * Метод получения треков из выбранного плейлиста
     */
    static get_tracks = async(tracks) => {
        try {
            const limit = 15
            const result = await fetch(tracks_adress_part_1 + tracks + tracks_adress_part_2 + limit, {
                method: 'GET',
                headers: 
                {
                    'Authorization' : 'Bearer ' + this.access_token
                }
            })
            const data = await result.json();
            return data.items 
        } catch(error) {return []}   
    }


    /**
     * Метод выбранного трека
     */
    static get_track = async(track) => {
        try {
            const result = await fetch(track_adress + track, {
                method: 'GET',
                headers: 
                {
                     'Authorization' : 'Bearer ' + this.access_token
                }
            })
            const data = await result.json()
            return data
        } catch(error) {return null}
    }
}

