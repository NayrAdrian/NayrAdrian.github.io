const repoImagePaths = {
    "Habit-Tracker": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Habit-Tracker-img1.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Habit-Tracker-img2.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Habit-Tracker-img3.webp"
    ],
    "Stock-Trading-News-Alert": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Stock-Trading-News-Alert-img1.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Stock-Trading-News-Alert-img2.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Stock-Trading-News-Alert-img3.webp"
    ],
    "Kanye-Quotes": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Kanye-Quotes-img1.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Kanye-Quotes-img2.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Kanye-Quotes-img3.webp"
    ],
    "Rain-Alert": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Rain-Alert-img1.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Rain-Alert-img2.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Rain-Alert-img3.webp"
    ],
    "Birthday-Wisher": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img1.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img2.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img3.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img4.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img5.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img6.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Birthday-Wisher-img7.webp"
    ],
    "Quizzler-App": [
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Quizzler-App-img1.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Quizzler-App-img2.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Quizzler-App-img3.webp",
        "https://raw.githubusercontent.com/NayrAdrian/NayrAdrian.github.io/main/images/Quizzler-App-img4.webp"
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
        repoDiv.className = 'project bg-white p-4 shadow rounded';
        repoDiv.innerHTML = `
            <div class="project-content flex items-center space-x-4">
                <div class="project-preview-container relative">
                    <img src="${images[0]}" alt="Project Preview" class="project-preview w-24 h-24 object-cover rounded shadow cursor-pointer" data-images='${JSON.stringify(images)}' loading="lazy">
                </div>
                <div class="project-details flex-1">
                    <h3 class="text-lg font-bold"><a href="${repo.html_url}" target="_blank" class="text-blue-500 hover:underline">${repo.name}</a></h3>
                    <p class="text-gray-700">${repo.description || 'No description available.'}</p>
                    <p class="text-sm text-gray-500"><small>Last updated: ${new Date(repo.updated_at).toLocaleDateString()}</small></p>
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
                thumbnail.className = "thumbnail w-24 h-24 object-cover m-1 cursor-pointer opacity-60 hover:opacity-100";
                thumbnail.loading = "lazy";
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
