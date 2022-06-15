const client_id = 'f7f108b7299045f9b0037dff800d13c2'
const client_secret = 'f630db1d88f54e39aeb66b455b1e5e35'

const token_adress = 'https://accounts.spotify.com/api/token'
const genres_adress = 'https://api.spotify.com/v1/browse/categories?locale=sv_RU'
const playlist_adress_part_1 = 'https://api.spotify.com/v1/browse/categories/'
const playlist_adress_part_2 = '/playlists?limit='
const tracks_adress_part_1 = 'https://api.spotify.com/v1/playlists/'
const tracks_adress_part_2 = '/tracks?limit='
const track_adress = 'https://api.spotify.com/v1/tracks/'

export default class API {
    static access_token = null

    static getResultOfFetch = async(urlToFetch) => {
        if (!this.access_token) {
            const result = await fetch(token_adress, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',                                                   
                    'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
                },
                body: 'grant_type=client_credentials'
            }).catch(err => console.warn(err.message))
            if (result !== undefined) {
                const data = await result.json()
                this.access_token = data.access_token  
            }
        }
        try {
            if (!this.access_token) return null
            const result =  await fetch(urlToFetch, {
                method: 'GET',
                headers: 
                {
                    'Authorization' : 'Bearer ' + this.access_token
                }
            }).catch(err => console.warn(err.message))
            if (result !== undefined) {
                const data = await result.json()
                return data
            }
            return null
        } catch (err) {console.warn(err.message)}
        return null
    }

    /**
     * Метод получения жанров песен
     */
    static get_genres = async() => {
        const data = await this.getResultOfFetch(genres_adress)
        if (data) {
            if (data.categories) return data.categories.items ? data.categories.items : null
            return null
        } else return null
    }

    /**
     * Метод получения жанров плейлистов согласно выбранному жанру
     */
    static get_playlists = async(genre) => {
        const data = await this.getResultOfFetch(playlist_adress_part_1 + genre + playlist_adress_part_2 + 15)
        if (data) {
            if (data.playlists) return data.playlists.items ? data.playlists.items : null
            return null
        } else return null
    }

    /**
     * Метод получения треков из выбранного плейлиста
     */
    static get_tracks = async(tracks) => {
        const data = await this.getResultOfFetch(tracks_adress_part_1 + tracks + tracks_adress_part_2 + 15)
        if (data) return data ? data.items : null
        return null
    }

    /**
     * Метод получения выбранного трека
     */
    static get_track = async(track) => {
        const data = await this.getResultOfFetch(track_adress + track)
        return data ? data : null
    }
}
