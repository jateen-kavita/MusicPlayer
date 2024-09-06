document.addEventListener('DOMContentLoaded', () => {
    const toggleTheme = document.getElementById('toggleTheme');
    const body = document.body;

    toggleTheme.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
    });

    const songs = [
        {
            title: 'Shape Of You',
            artist: 'Ed Sheeran',
            albumArt: 'https://i.ytimg.com/vi/VwomfkFDvH4/sddefault.jpg',
            audioSrc: './Songs/Shape-of-You(Pagal-World.Com.In).mp3',
            genre: 'Pop'
        },
        {
            title: 'Sorry',
            artist: 'Ed Sheeran',
            albumArt: 'https://i.ytimg.com/vi/BerNfXSuvJ0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBxY7TSfSQVes46HedjEvACKYFv1w',
            audioSrc: './Songs/Sorry_320(PagalWorld.com.so).mp3',
            genre: 'Rock'
        },
        {
            title: 'Let me Love you',
            artist: 'Ed Sheeran',
            albumArt: 'https://i.ytimg.com/vi/SMs0GnYze34/sddefault.jpg',
            audioSrc: './Songs/Let-Me-Love-You(Pagal-World.Com.In).mp3',
            genre: 'Pop'
        }
    ];

    let currentSongIndex = 0;
    const songList = document.getElementById('songList');
    const albumArt = document.getElementById('albumArt');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const audioPlayer = document.getElementById('audioPlayer');
    const genreFilter = document.getElementById('genre');
    const prevSongBtn = document.getElementById('prevSong');
    const nextSongBtn = document.getElementById('nextSong');
    const addToPlaylistBtn = document.getElementById('addToPlaylist');
    const currentPlaylist = document.getElementById('currentPlaylist');
    const playlistNameInput = document.getElementById('playlistName');
    const createPlaylistButton = document.getElementById('createPlaylist');
    const allPlaylists = document.getElementById('allPlaylists');

    let playlists = [];
    let selectedPlaylist = null;

    function displaySongs(songsToDisplay) {
        songList.innerHTML = '';
        songsToDisplay.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'song-item p-2 bg-blue-400 text-white rounded-lg cursor-pointer flex justify-between items-center';
            li.innerText = `${song.title} - ${song.artist}`;
            li.addEventListener('click', () => {
                playSong(index);
            });
            songList.appendChild(li);
        });
    }

    function playSong(index) {
        currentSongIndex = index;
        const song = songs[index];
        albumArt.src = song.albumArt;
        songTitle.innerText = song.title;
        songArtist.innerText = song.artist;
        audioPlayer.src = song.audioSrc;
        audioPlayer.play();
    }

    prevSongBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    nextSongBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });

    addToPlaylistBtn.addEventListener('click', () => {
        if (selectedPlaylist) {
            const song = songs[currentSongIndex];
            if (!selectedPlaylist.songs.includes(song)) {
                addSongToPlaylist(song, selectedPlaylist);
            } else {
                alert('This song is already in the playlist.');
            }
        } else {
            alert('Please select a playlist first.');
        }
    });

    function addSongToPlaylist(song, playlist) {
        playlist.songs.push(song);

        const li = document.createElement('li');
        li.className = 'song-item p-2 bg-blue-400 text-white rounded-lg flex justify-between items-center';

        const songText = document.createElement('span');
        songText.innerText = `${song.title} - ${song.artist}`;
        li.appendChild(songText);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'ml-4 bg-red-500 p-2 text-white rounded-lg';
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => {
            const index = playlist.songs.indexOf(song);
            playlist.songs.splice(index, 1);
            li.remove();
        });
        li.appendChild(deleteBtn);

        currentPlaylist.appendChild(li);
    }

    createPlaylistButton.addEventListener('click', () => {
        const playlistName = playlistNameInput.value.trim();
        if (playlistName) {
            const playlist = {
                name: playlistName,
                songs: []
            };
            playlists.push(playlist);

            const li = document.createElement('li');
            li.innerText = playlist.name;
            li.className = 'playlist-item p-2 bg-gray-200 text-black rounded-lg cursor-pointer';
            li.addEventListener('click', () => {
                selectedPlaylist = playlist;
                displayPlaylistSongs(playlist);
            });

            allPlaylists.appendChild(li);
        }
    });

    function displayPlaylistSongs(playlist) {
        // Clear current playlist display
        currentPlaylist.innerHTML = '';
        
        // Display songs in the selected playlist
        playlist.songs.forEach(song => {
            const li = document.createElement('li');
            li.className = 'song-item p-2 bg-blue-400 text-white rounded-lg flex justify-between items-center';

            const songText = document.createElement('span');
            songText.innerText = `${song.title} - ${song.artist}`;
            li.appendChild(songText);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'ml-4 bg-red-500 p-2 text-white rounded-lg';
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                const index = playlist.songs.indexOf(song);
                playlist.songs.splice(index, 1);
                li.remove();
            });
            li.appendChild(deleteBtn);

            currentPlaylist.appendChild(li);
        });
    }

    displaySongs(songs);

    genreFilter.addEventListener('change', () => {
        const genre = genreFilter.value;
        const filteredSongs = genre === 'All' ? songs : songs.filter(song => song.genre === genre);
        displaySongs(filteredSongs);
    });
});
