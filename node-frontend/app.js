document.addEventListener('DOMContentLoaded', () => {
    const BACKEND_URL = ''; // All API calls will be relative to the domain

    // Page elements
    const topAnimeContainer = document.getElementById('top-anime-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const descInput = document.getElementById('desc-input');
    const resultsContainer = document.getElementById('results-container');
    const animeListContainer = document.getElementById('anime-list-container');

    // Modal elements
    const modalOverlay = document.getElementById('modal-overlay');
    const animeModal = document.getElementById('anime-modal');

    const getEnglishTitle = (anime) => {
        return anime.title_english || anime.title;
    };

    // --- Modal Functions ---
    const openModal = async (animeId) => {
        // Show modal overlay immediately with a loading state
        animeModal.innerHTML = `<h3>Loading...</h3>`;
        modalOverlay.classList.add('visible');
        
        try {
            const response = await fetch(`${BACKEND_URL}/api/anime/${animeId}`);

            if (!response.ok) {
                throw new Error(`Server responded with an error: ${response.status}`);
            }

            const { data } = await response.json();
            
            if (!data) {
                throw new Error("Invalid data structure received from the API.");
            }

            const title = getEnglishTitle(data);

            animeModal.innerHTML = `
                <button class="modal-close-btn">&times;</button>
                <div class="modal-content">
                    <img src="${data.images?.jpg?.large_image_url || ''}" alt="${title}">
                    <div>
                        <h2>${title || 'Title not found'} (${data.year || 'N/A'})</h2>
                        <p><strong>Score:</strong> ${data.score || 'N/A'} (scored by ${data.scored_by?.toLocaleString() || 0} users)</p>
                        <p><strong>Rank:</strong> #${data.rank || 'N/A'}</p>
                        <p><strong>Genres:</strong> ${data.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
                        <hr>
                        <p>${data.synopsis || 'No synopsis available.'}</p>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching anime details:', error);
            animeModal.innerHTML = `
                <button class="modal-close-btn">&times;</button>
                <h3>Error</h3>
                <p>Could not load anime details. Please try again later.</p>
            `;
        }
    };
    
    const closeModal = () => {
        modalOverlay.classList.remove('visible');
    };

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay || e.target.closest('.modal-close-btn')) {
            closeModal();
        }
    });

    // --- Data Display Function ---
    const displayAnimes = (animes, container) => {
        container.innerHTML = '';
        if (animes && animes.length > 0) {
            animes.forEach(anime => {
                const animeCard = document.createElement('div');
                animeCard.className = 'anime-card';
                const title = getEnglishTitle(anime);
                animeCard.innerHTML = `
                    <img src="${anime.images.jpg.image_url}" alt="${title}">
                    <h3>${title}</h3>
                    <p>Score: ${anime.score || 'N/A'}</p>
                `;
                animeCard.addEventListener('click', () => openModal(anime.mal_id));
                container.appendChild(animeCard);
            });
        } else {
            container.innerHTML = '<p>No results found.</p>';
        }
    };

    // --- Page-Specific Logic ---
    if (topAnimeContainer) {
        fetch(`${BACKEND_URL}/api/top-anime`)
            .then(response => response.json())
            .then(data => displayAnimes(data.data, topAnimeContainer))
            .catch(error => console.error('Error fetching top anime:', error));
    }

    if (animeListContainer) {
        fetch(`${BACKEND_URL}/api/anime-list`)
            .then(response => response.json())
            .then(data => displayAnimes(data.data, animeListContainer))
            .catch(error => console.error('Error fetching anime list:', error));
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameQuery = searchInput.value.trim();
            const descQuery = descInput.value.trim();
            const combinedQuery = `${nameQuery} ${descQuery}`.trim();

            if (combinedQuery) {
                window.location.href = `results.html?q=${encodeURIComponent(combinedQuery)}`;
            }
        });
    }

    if (resultsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            resultsContainer.innerHTML = '<p>Loading...</p>';
            fetch(`${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => displayAnimes(data.data, resultsContainer))
                .catch(error => console.error('Error searching for anime:', error));
        }
    }
}); 