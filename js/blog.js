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
            try {
                const html = filteredArticles.map(article => {
                    console.log('Rendering article:', article.title);
                    return renderArticleCard(article);
                }).join('');
                
                console.log('HTML generated, length:', html.length);
                blogArticlesContainer.innerHTML = html;
                blogArticlesContainer.style.display = 'grid';
                noResults.style.display = 'none';
                console.log('Articles rendered successfully');
            } catch (error) {
                console.error('Error rendering articles:', error);
                blogArticlesContainer.innerHTML = '<p>Error loading articles. Check console.</p>';
            }
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