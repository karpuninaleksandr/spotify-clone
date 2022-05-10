/*
* Я попытался поключиться к API Spotify, но он
* почему-то он кидает 401 ошибку и указывает на invalid_client,
* хотя и clientId, и client_secret валидны и 4 раза перепроверялись
* в соответствии с выданными самим Spotify соответствующими ключами.
* В связи с чем работать конкретно с fetch и API Spotify
* у меня возможности не было.
* Я сделал почти полностью рабочую страницу пока что без привязки
* к Spotify API, а саму по себе.
* Подскажите, пожалуйста, в каком месте я свернул не туда
* и я исправлю проект под все критерии для сдачи.
* Пока что авторизация настроена на кнопку De с id="de",
* а непосредственные запросы к трекам привязаны к кнопке Bug с id="bug"
* в header'е, которые, естественно, после настройки будут убраны а процессы автоматизированы.
* Спасибо!   
*/

const audio_player = document.getElementById('audio_player');
const playpause = document.getElementById('btnPlayPause');
const button_next = document.getElementById('btnNext');
const button_prev = document.getElementById('btnPrev');
const button_loop = document.getElementById('btnLoop');
const button_muted = document.getElementById('btnMuted');
const button_back = document.getElementById('back');
const button_forward = document.getElementById('forward');
const button_favourite = document.getElementById('favourite');
const button_favourite_aside = document.getElementById('fav_aside');
const timeline = document.getElementById('timeline');
const first_song = document.getElementById('first_song');
const second_song = document.getElementById('second_song');
const third_song = document.getElementById('third_song');
const fourth_song = document.getElementById('fourth_song');
const fifth_song = document.getElementById('fifth_song');
const sixth_song = document.getElementById('sixth_song');
const seventh_song = document.getElementById('seventh_song');
const eighth_song = document.getElementById('eighth_song');
const playing_song = document.getElementById('playing_song');
let current_song = -1;

let songs = [
    "./songs/mp3/Burevestnik.mp3",
    "./songs/mp3/Perfect.mp3",
    "./songs/mp3/Bystro.mp3",
    "./songs/mp3/Photograph.mp3",
    "./songs/mp3/Shest_utra.mp3",
    "./songs/mp3/Geroy_moih_detskix_grez.mp3",
    "./songs/mp3/Krasota_i_Urodstvo.mp3",
    "./songs/mp3/Golos_i_struny.mp3"
];
let ins = [
    '<img src="./songs/img/Burevestnik.jpg" alt="Song" width="40" height="40"/><div class="title-song"><p>Буревестник</p><p>Мияги</p></div>',
    '<img src="./songs/img/Perfect.jpg" alt="Song" width="40" height="40"/><div class="title-song"><p>Perfect</p><p>Ed Sheeran</p></div>',
    '<img src="./songs/img/Bystro.png" alt="Song" width="40" height="40"/><div class="title-song"><p>Быстро</p><p>Slava Marlow</p></div>',
    '<img src="./songs/img/Photograph.jpg" alt="Song" width="40" height="40"/><div class="title-song"><p>Photograph</p><p>Ed Sheeran</p></div>',
    '<img src="./songs/img/Shest_utra.jpg" alt="Song" width="40" height="40"/><div class="title-song"><p>шесть утра</p><p>тима ищет свет</p></div>',
    '<img src="./songs/img/Geroy_moih_detskix_grez.jpg" alt="Song" width="40" height="40"/><div class="title-song"><p>Герой моих детских грёз</p><p>Аффинаж</p></div>',
    '<img src="./songs/img/Krasota_i_Urodstvo.jpg" alt="Song" width="40" height="40"/><div class="title-song"><p>Красота и Уродство</p><p>Oxxxymiron</p></div>',
    '<img src="./songs/img/Golos_i_struny.jpg" alt="Song" width="40" height="40"/><div class="title-song"><p>Голос и струны</p><p>Noize MC</p></div>',
]
let songs_names = []

function unloop() {
    button_loop.innerHTML = ''
    button_loop.insertAdjacentHTML(
        'afterbegin',
        '<img src="./buttons/footer_buttons/loop.png" alt="Loop" width="30" height="30"/>'
    )
}
function play() {
    playpause.innerHTML = ''
    playpause.insertAdjacentHTML(
        'afterbegin',
        '<img src="./buttons/footer_buttons/pause.png" alt="Play" width="50" height="50"/>'
    )
}
function changeCurrentSongParam(curr) {
    if (curr > -1) current_song = curr;
    audio_player.setAttribute('src', songs[current_song]);
    timeline.setAttribute('max', audio_player.duration);
    audio_player.play();
    playing_song.innerHTML = '';
    playing_song.insertAdjacentHTML(
        'beforeend',
        ins[current_song]
    )
}

audio_player.addEventListener('loadedmetadata', () => {
    timeline.max = Math.floor(audio_player.duration);
});
audio_player.addEventListener("timeupdate", () => {
    timeline.value = audio_player.currentTime;
    audio_player.autplay = true;
});
timeline.addEventListener("click", () => {
    audio_player.currentTime= timeline.value;
})
button_forward.addEventListener("click", () => {
    current_song = (current_song + 1) % songs.length;
    changeCurrentSongParam(-1)
    unloop()
    play()
})
button_next.addEventListener("click", () => {
    current_song = (current_song + 1) % songs.length;
    changeCurrentSongParam(-1)
    unloop()
    play()
})
button_muted.addEventListener('click', () => {
    button_muted.innerHTML = '';
    if (audio_player.muted) {
        button_muted.insertAdjacentHTML(
            'afterbegin',
            '<img src="./buttons/footer_buttons/unmuted.png" alt="Volume" width="25" height="25"/>'
        )
    } else {
        button_muted.insertAdjacentHTML(
            'afterbegin',
            '<img src="./buttons/footer_buttons/muted.png" alt="Volume" width="25" height="25"/>'
        )
    }
    audio_player.muted ? audio_player.muted = false : audio_player.muted = true;
})
button_back.addEventListener("click", () => {
    current_song === 0 || current_song === -1 ? current_song = songs.length - 1 : current_song = (current_song - 1) % songs.length;
    changeCurrentSongParam(-1)
    unloop()
    play()
})
button_prev.addEventListener("click", () => {
    current_song === 0 || current_song === -1 ? current_song = songs.length - 1 : current_song = (current_song - 1) % songs.length;
    changeCurrentSongParam(-1)
    unloop()
    play()
})
first_song.addEventListener('click', () => {
    changeCurrentSongParam(0)
    unloop()
    play()
})
second_song.addEventListener('click', () => {
    changeCurrentSongParam(1)
    unloop()
    play()
})
third_song.addEventListener('click', () => {
    changeCurrentSongParam(2)
    unloop()
    play()
})
fourth_song.addEventListener('click', () => {
    changeCurrentSongParam(3)
    unloop()
    play()
})
fifth_song.addEventListener('click', () => {
    changeCurrentSongParam(4)
    unloop()
    play()
})
sixth_song.addEventListener('click', () => {
    changeCurrentSongParam(5)
    unloop()
    play()
})
seventh_song.addEventListener('click', () => {
    changeCurrentSongParam(6)
    unloop()
    play()
})
eighth_song.addEventListener('click', () => {
    changeCurrentSongParam(7)
    unloop()
    play()
})
button_favourite_aside.addEventListener('click', () => {
    changeCurrentSongParam(Math.floor(Math.random() * songs.length))
    unloop()
    play()
})
button_favourite.addEventListener('click', () => {
    changeCurrentSongParam(Math.floor(Math.random() * songs.length))
    unloop()
    play()
})
playpause.addEventListener('click', () => {
    if (audio_player.paused) play()
    else {
        playpause.innerHTML = ''
        playpause.insertAdjacentHTML(
            'afterbegin',
            '<img src="./buttons/footer_buttons/play.png" alt="Play" width="50" height="50"/>'
        )
    }
    audio_player.paused && audio_player.getAttribute('src') !== null ? audio_player.play() : audio_player.pause();
})
button_loop.addEventListener('click', () => {
    audio_player.loop ? audio_player.loop = false : audio_player.loop = true;
    if (audio_player.loop) {
        button_loop.innerHTML = '';
        button_loop.insertAdjacentHTML(
        'afterbegin',
        '<img src="./buttons/footer_buttons/loop_activated.png" alt="Loop" width="30" height="30"/>'
    )
    } else unloop()
})



let access_token = null;

const clientId = 'f7f108b7299045f9b0037dff800d13c2';
const client_secret = 'f630db1d88f54e39aeb66b455b1e5e35';
const redirect_uri = "http://localhost:3000";
const api_authorize = "https://accounts.spotify.com/authorize"
const api_token = "https://accounts.spotify.com/api/token";

function handleRedirect() {
    let code = getCode();
    window.history.pushState("", "", redirect_uri);
    return fetchAccessToken(code);
}
function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
} 
function requestAuthorization(){
    let url = api_authorize;
    url += "?client_id=" + clientId;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
    console.log(url)
}
function fetchAccessToken(code){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + clientId;
    body += "&client_secret=" + client_secret;
    return callAuthorizationApi(body);
} 
const callAuthorizationApi = async (bodyt) => {
    const result = await fetch(api_token, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : btoa(clientId + ":" + client_secret)
        },
        body: bodyt
    });
    console.log(data);
    if (result.status == 200) {
        var data = result.json();
        if ( data.access_token != undefined ) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        // const Golos_i_struny = getTrack(access_token, '6b0I7JaUvA963W7pwXbttH')
    //    Golos_i_struny.then(res => console.log(res.name))
    }
    else {
        console.log(result.body);
        alert(result.body);
    }
}

const getTrack = async (token, songId) => {
        const result = await fetch('https://api.spotify.com/v1/tracks/' + songId, {
            method: 'GET',
            headers: { 
                'Authorization' : 'Bearer ' + token,
                'Content-Type' : 'application/json' 
        }
        })
        const data = result.json();
        return data;
    }

const de_button = document.getElementById('de')
const bug_button = document.getElementById('bug')


de_button.addEventListener('click', () => {
    requestAuthorization()
})
bug_button.addEventListener('click', () => {
    const token = handleRedirect()
    // const Burevestnik = getTrack(access_token, '0YMRW5mlu9bUCWeRMZfB32')
    // const Perfect = getTrack(access_token, '0tgVpDi06FyKpA1z0VMD4v')
    // const Bystro = getTrack(access_token, '10EdfwW2FDCp4I9kyy52YB')
    // const Photograph = getTrack(access_token, '1HNkqx9Ahdgi1Ixy2xkKkL')
    // const Shest_utra = getTrack(access_token, '0etdBo56v3iSwe2PcJQqXe')
    // const Geroy_moih_detskih_grez = getTrack(access_token, '1eMz8q5MnnT9nS1rKh2Rla')
    // const Krasota_i_Urodstvo = getTrack(access_token, '4XeBNnnoABfqa6x8dK27b8')
    //const Golos_i_struny = getTrack(access_token, '6b0I7JaUvA963W7pwXbttH')
    //console.log(Golos_i_struny.then(res => res.name))
    //console.log(songs_names[1])
    //Golos_i_struny.then(res => (addSongName(res.name, 0)))
    //look()
})

// function addSongName(name, index) {
    // songs_names[index] = name;
    // console.log(name)
    // console.log(index)
    // console.log(songs_names[0])
// }
// function look() {
    // console.log(songs_names[1])
// }
