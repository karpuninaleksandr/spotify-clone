const client_id = 'f7f108b7299045f9b0037dff800d13c2'
const client_secret = 'f630db1d88f54e39aeb66b455b1e5e35'

const token_adress = 'https://accounts.spotify.com/api/token'
const genres_adress = 'https://api.spotify.com/v1/browse/categories?locale=sv_RU'
const playlist_adress_part_1 = 'https://api.spotify.com/v1/browse/categories/'
const playlist_adress_part_2 = '/playlists?limit='
const tracks_adress_part_1 = 'https://api.spotify.com/v1/playlists/'
const tracks_adress_part_2 = '/tracks?limit='
const track_adress = 'https://api.spotify.com/v1/tracks/'

const genres_container = document.getElementsByClassName('genres_container')[0]
const albums_container = document.getElementsByClassName('albums_container')[0]
const tracks_container = document.getElementsByClassName('tracks_container')[0]
const current_song_container = document.getElementsByClassName('current_song_container')[0]
const current_song_description = document.getElementsByClassName('current_song_description')[0]

let access_token = null

/**
 * Метод получения token для запросов к API
 */
const get_token = async() => {
    const result = await fetch(token_adress, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    }).catch(error => alert(error))
    const data = await result.json()
    access_token = data.access_token
    get_genres()
}

/**
 * Метод получения жанров песен
 */
const get_genres = async() => {
    const result = await fetch(genres_adress, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + access_token
        }
    })
    const data = await result.json()
    create_genres(data.categories.items)
}

/**
 * Метод получения жанров плейлистов согласно выбранному жанру
 */
const get_playlists = async(genre) => {
    const limit = 15
    const result = await fetch(playlist_adress_part_1 + genre + playlist_adress_part_2 + limit, {
        method: 'GET',
        headers: 
        { 
            'Authorization' : 'Bearer ' + access_token
        }
    })
    const data = await result.json()
    create_playlists(data.playlists.items)
}

/**
 * Метод получения треков из выбранного плейлиста
 */
const get_tracks = async(tracks) => {
    const limit = 15
    const result = await fetch(tracks_adress_part_1 + tracks + tracks_adress_part_2 + limit, {
        method: 'GET',
        headers: 
        {
            'Authorization' : 'Bearer ' + access_token
        }
    })
    const data = await result.json();
    create_tracks(data.items)
}


/**
 * Метод выбранного трека
 */
const get_track = async(track) => {
    const result = await fetch(track_adress + track, {
        method: 'GET',
        headers: 
        {
             'Authorization' : 'Bearer ' + access_token
        }
    })
    const data = await result.json()
    create_track(data)
    create_track_description(data)
}

/**
 * Функция, создающая объекты жанров в genres_container
 */
function create_genres(genres) {
    var output = '';
    genres.forEach(element => {
        output += '<button class="genre" name="' + element.id + '">'
        output += '<img src="' + element.icons[0].url + '" width="100" height="100"></img>'
        output += '<p>' + element.name + '</p>'
        output += '</button>'
    });
    genres_container.insertAdjacentHTML('afterbegin', output)
    tracks_container.innerHTML = ''
    genres_container.addEventListener('click', ({target}) => {
        if (target.parentNode.getAttribute('name') !== null) {
           get_playlists(target.parentNode.getAttribute('name')) 
        }
    })
}

/**
 * Функция, создающая объекты плейлистов в albums_container
 */
function create_playlists(playlists) {
    var output = '';
    if (playlists.length === 0) {
        output += '<p class="empty_alert">Unfortunately, no albums were found for this genre :(</p>'
        output += '<p class="empty_alert">Please, try checking other genres</p>'
    }
    playlists.forEach(element => {
        output += '<button class="album" name="' + element.id + '">'
        output += '<img src="' + element.images[0].url + '" width="100" height="100"></img>'
        output += '<p>' + element.name + '</p>'
        output += '</button>'
    })
    albums_container.innerHTML = ''
    albums_container.insertAdjacentHTML('afterbegin', output)
    albums_container.addEventListener('click', ({target}) => {
        if (target.parentNode.getAttribute('name') !== null) {
           get_tracks(target.parentNode.getAttribute('name')) 
        }
    })
}

/**
 * Функция, создающая объекты треков в tracks_container
 */
function create_tracks(tracks) {
    var output = '';
    tracks.forEach(element => {
        output += '<button class="track" name="' + element.track.id + '">'
        output += '<img src="' + element.track.album.images[0].url + '" width="100" height="100"></img>'
        output += '<p>' + element.track.name + '</p>'
        output += '<p>' + element.track.artists[0].name + '</p>'
        output += '</button>'
    })
    tracks_container.innerHTML = ''
    tracks_container.insertAdjacentHTML('afterbegin', output)
    tracks_container.addEventListener('click', ({target}) => {
        if (target.parentNode.getAttribute('name') !== null) {
           get_track(target.parentNode.getAttribute('name'))
        }
    })
}

/**
 * Функция, помещающая данные выбранного трека в current_song_container
 */
function create_track(track) {
    var output = ''
    output += '<img src="' + track.album.images[0].url + '" width="40" height="40"></img>'
    output += '<div class="current_song">'
    output += '<p>' + track.name +'</p>'
    output += '<p>' + track.artists[0].name +'</p></div>'               
    current_song_container.innerHTML = ''
    current_song_container.insertAdjacentHTML('afterbegin', output)
    current_song_container.setAttribute('name', track.id)
}

/**
 * Функция, помещающая данные выбранного трека в current_song_description
 */
function create_track_description(track) {
    var output = ''
    output += '<div class="current_song">'
    output += '<p>Release date: ' + track.album.release_date +'</p>'
    output += '<p>Check this track on <a href="' + track.external_urls.spotify + '">actual</a> Spotify</p></div>'               
    current_song_description.innerHTML = ''
    current_song_description.insertAdjacentHTML('afterbegin', output)
}

get_token()