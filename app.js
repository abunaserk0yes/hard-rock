const searchBtn=()=>{
    const searchSongs=document.getElementById('search-song').value;
    document.getElementById('search-song').value='';
    const url=`https://api.lyrics.ovh/suggest/${searchSongs}`
    fetch(url)
    .then(response=>response.json())
    .then(data=>displaySongs(data.data))
}   
const displaySongs=songs=>{
    const displaySong=document.getElementById('display-songs');
    document.getElementById('display-songs').innerHTML=''
    songs.forEach(song => {
        console.log(song)
        const songList=document.createElement('div');
        songList.className='single-result row align-items-center my-3 p-3'
        songList.innerHTML=`
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="displayLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        displaySong.appendChild(songList)
    });
} 

const displayLyrics=(artist,title)=>{
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(response=>response.json())
    .then(data=>getLyricsItem(data.lyrics))
}
const getLyricsItem=lyric=>{
    const displayLyrics=document.getElementById('display-lyrics')
    displayLyrics.innerText=lyric;
}