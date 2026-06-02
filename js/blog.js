document.addEventListener('DOMContentLoaded', function() {
    const blogArticlesContainer = document.getElementById('blog-articles');
    const searchInput = document.getElementById('search-input');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const noResults = document.getElementById('no-results');

    let currentCategory = 'all';
    let searchQuery = '';

    // Get articles from content-data.js
    const articles = window.MPH_CONTENT ? window.MPH_CONTENT.articles : [];
    
    // Debug logging
    console.log('MPH_CONTENT exists:', !!window.MPH_CONTENT);
    console.log('Articles loaded:', articles.length);
    console.log('First article:', articles[0]);

    function filterAndRenderArticles() {
        let filteredArticles = articles;

        // Filter by category
        if (currentCategory !== 'all') {
            filteredArticles = filteredArticles.filter(article => 
                article.category === currentCategory
            );
        }

        // Filter by search query
        if (searchQuery) {
            filteredArticles = filteredArticles.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        console.log('Filtered articles:', filteredArticles.length);

        // Render results
        if (filteredArticles.length > 0) {
            blogArticlesContainer.innerHTML = filteredArticles.map(article => 
                renderArticleCard(article)
            ).join('');
            blogArticlesContainer.style.display = 'grid';
            noResults.style.display = 'none';
        } else {
            blogArticlesContainer.style.display = 'none';
            noResults.style.display = 'block';
        }
    }

    // Category filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            filterAndRenderArticles();
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            filterAndRenderArticles();
        });
    }

    // Initial render
    filterAndRenderArticles();
});