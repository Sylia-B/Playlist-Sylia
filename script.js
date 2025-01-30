document.addEventListener('DOMContentLoaded', function() {
    const dataUrl = './tracks.json';
    
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            const musicSection = document.getElementById('music-selection');
            data.tracks.forEach(track => {
                const trackElement = document.createElement('div');
                trackElement.classList.add('track');
                trackElement.innerHTML = `
                    <div class="track-info">
                        <h3>${track.title}</h3>
                        <p>${track.description}</p>
                    </div>
                    <div class="track-media">
                        <img src="${track.image}" alt="" class="cover">
                        <div class="custom-play-button" data-url="${track.audio}">
                            <audio>
                                <source src="${track.audio}" type="audio/mpeg">
                            </audio>
                        </div>
                        <div class="platform-links">
                            <a href="${track.link}" target="_blank"><img src="img/spotify.webp" alt="lien de la musique vers Spotify" aria-label="ce lien va ouvrir une nouvelle fenêtre vers Spotify" class="icon"></a>
                            <a href="${track.link2}" target="_blank"><img src="img/yt.webp" alt="Lien de la musique vers YouTube" aria-label="ce lien va ouvrir une nouvelle fenêtre vers YouTube" class="icon"></a>
                            <a href="${track.link3}" target="_blank"><img src="img/deezer.png" alt="lien de la musique vers Deezer" aria-label="ce lien va ouvrir une nouvelle fenêtre vers Deezer" class="icon"></a>
                        </div>
                    </div>
                `;
                musicSection.appendChild(trackElement);

                const customPlayButton = trackElement.querySelector('.custom-play-button');
                const audio = customPlayButton.querySelector('audio');

                customPlayButton.addEventListener('click', (event) => {
                    const audioSource = event.currentTarget.getAttribute('data-url');
                    if (audioSource.includes('spotify.com') || audioSource.includes('deezer.com')) {
                        window.open(audioSource, '_blank');
                    } else {
                        if (audio.paused) {
                            audio.play();
                            customPlayButton.classList.add('pause');
                        } else {
                            audio.pause();
                            customPlayButton.classList.remove('pause');
                        }
                    }
                });
            });
        });

    const form = document.getElementById('suggestionForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const audioURL = document.getElementById('audioURL').value;
        const image = document.getElementById('image').files[0];
        const email = document.getElementById('email').value;

        if (!title || !description || !audioURL || !image || !email) {
            alert('Veuillez remplir tous les champs requis.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = function() {
            const musicSection = document.getElementById('music-selection');
            const trackElement = document.createElement('div');
            trackElement.classList.add('track');
            trackElement.innerHTML = `
                <div class="track-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
                <div class="track-media">
                    <img src="${reader.result}" alt="" class="cover">
                    <div class="custom-play-button" data-url="${audioURL}">
                        <audio>
                            <source src="${audioURL}" type="audio/mpeg">
                        </audio>
                    </div>
                </div>
            `;

            musicSection.appendChild(trackElement);

            const customPlayButton = trackElement.querySelector('.custom-play-button');
            const audio = customPlayButton.querySelector('audio');

            customPlayButton.addEventListener('click', (event) => {
                const audioSource = event.currentTarget.getAttribute('data-url');
                if (audioSource.includes('spotify.com') || audioSource.includes('deezer.com')) {
                    window.open(audioSource, '_blank');
                } else {
                    if (audio.paused) {
                        audio.play();
                        customPlayButton.classList.add('pause');
                    } else {
                        audio.pause();
                        customPlayButton.classList.remove('pause');
                    }
                }
            });

            alert('L\'ajout du titre a réussi!');
        };

        if (image) {
            reader.readAsDataURL(image);
        } else {
            alert('Veuillez sélectionner une image.');
        }
    });

    const credits = document.getElementById('credits');
    const creditsContent = document.getElementById('credits-content');
    const fermerCredits = document.querySelector('.fermerCredits');

    credits.addEventListener('click', () => {
        creditsContent.style.display = 'block';
    });

    fermerCredits.addEventListener('click', () => {
        creditsContent.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === creditsContent) {
            creditsContent.style.display = 'none';
        }
    });
});
