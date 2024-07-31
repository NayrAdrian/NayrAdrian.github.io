const repoImagePaths = {
    "Habit-Tracker": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Habit-Tracker-img1.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Habit-Tracker-img2.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Habit-Tracker-img3.jpg"
    ],
    "Stock-Trading-News-Alert": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Stock-Trading-News-Alert-img1.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Stock-Trading-News-Alert-img2.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Stock-Trading-News-Alert-img3.jpg"
    ],
    "Kanye-Quotes": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Kanye-Quotes-img1.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Kanye-Quotes-img2.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Kanye-Quotes-img3.jpg"
    ],
    "Rain-Alert": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Rain-Alert-img1.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Rain-Alert-img2.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Rain-Alert-img3.jpg"
    ],
    "Birthday-Wisher": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img1.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img2.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img3.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img4.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img5.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img6.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img7.jpg"
    ],
    "Quizzler-App": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Quizzler-App-img1.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Quizzler-App-img2.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Quizzler-App-img3.jpg",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Quizzler-App-img4.jpg"
    ],
    // Add more repositories and their image paths here
};

async function fetchRepositories() {
    const response = await fetch('https://api.github.com/users/NayrAdrian/repos');
    const repos = await response.json();

    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const repoList = document.getElementById('repo-list');

    repos.forEach(repo => {
        const images = repoImagePaths[repo.name] || ["https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/default-img.jpg"];
        const repoDiv = document.createElement('div');
        repoDiv.className = 'project';
        repoDiv.innerHTML = `
            <div class="project-content">
                <div class="project-preview-container">
                    <img src="${images[0]}" alt="Project Preview" class="project-preview" data-images='${JSON.stringify(images)}' loading="lazy">
                </div>
                <div class="project-details">
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <p><small>Last updated: ${new Date(repo.updated_at).toLocaleDateString()}</small></p>
                </div>
            </div>
        `;

        repoList.appendChild(repoDiv);
    });

    setupModal();
}

function setupModal() {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const thumbnailContainer = document.getElementById("thumbnail-container");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentImageIndex = 0;
    let currentImages = [];

    document.querySelectorAll(".project-preview").forEach(img => {
        img.addEventListener("click", function() {
            currentImages = JSON.parse(this.dataset.images);
            currentImageIndex = 0;
            modalImage.src = currentImages[currentImageIndex];
            thumbnailContainer.innerHTML = "";
            currentImages.forEach((image, index) => {
                const thumbnail = document.createElement("img");
                thumbnail.src = image;
                thumbnail.className = "thumbnail";
                thumbnail.loading = "lazy"; // Add this line
                thumbnail.addEventListener("click", () => {
                    currentImageIndex = index;
                    modalImage.src = currentImages[currentImageIndex];
                });
                thumbnailContainer.appendChild(thumbnail);
            });
            modal.style.display = "block";
        });
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    prevBtn.addEventListener("click", function() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            modalImage.src = currentImages[currentImageIndex];
        }
    });

    nextBtn.addEventListener("click", function() {
        if (currentImageIndex < currentImages.length - 1) {
            currentImageIndex++;
            modalImage.src = currentImages[currentImageIndex];
        }
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

fetchRepositories();


