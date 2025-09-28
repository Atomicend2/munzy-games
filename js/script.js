// Load reviews
fetch("data/reviews.json")
  .then(res => res.json())
  .then(data => {
    window.reviews = data; // store globally
    displayReviews(data);
    populatePlatforms(data);
  });

// Display reviews
function displayReviews(reviews) {
  const container = document.getElementById("reviews");
  container.innerHTML = "";
  reviews.forEach(review => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <img src="${review.image}" alt="${review.title}" />
      <h3>${review.title}</h3>
      <p><strong>Platform:</strong> ${review.platform}</p>
      <p><strong>Rating:</strong> ${review.rating}/100</p>
      <p>${review.description}</p>
    `;
    container.appendChild(card);
  });
}

// Populate platform filter
function populatePlatforms(reviews) {
  const platforms = [...new Set(reviews.map(r => r.platform))];
  const filter = document.getElementById("platformFilter");
  platforms.forEach(platform => {
    const opt = document.createElement("option");
    opt.value = platform;
    opt.textContent = platform;
    filter.appendChild(opt);
  });
}

// Search + Filter
document.getElementById("searchInput").addEventListener("input", filterReviews);
document.getElementById("platformFilter").addEventListener("change", filterReviews);

function filterReviews() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const platform = document.getElementById("platformFilter").value;
  const filtered = window.reviews.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search);
    const matchesPlatform = platform === "all" || r.platform === platform;
    return matchesSearch && matchesPlatform;
  });
  displayReviews(filtered);
}

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});