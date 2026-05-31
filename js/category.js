document.addEventListener('DOMContentLoaded', function() {
    const categoryArticlesContainer = document.getElementById('category-articles');
    
    if (categoryArticlesContainer && typeof articles !== 'undefined') {
        // Get current page category from title
        const pageTitle = document.querySelector('.category-hero h1').textContent;
        
        // Filter articles by category
        let categoryArticles = articles.filter(article => {
            if (pageTitle.includes('Brain Health')) {
                return article.category === 'Brain Health';
            } else if (pageTitle.includes('Focus')) {
                return article.category === 'Focus & Concentration';
            } else if (pageTitle.includes('Productivity')) {
                return article.category === 'Productivity';
            }
            return false;
        });

        // Render articles
        if (categoryArticles.length > 0) {
            categoryArticlesContainer.innerHTML = categoryArticles.map(article => 
                renderArticleCard(article)
            ).join('');
        } else {
            categoryArticlesContainer.innerHTML = '<p style="text-align: center; color: var(--text-light);">No articles available yet. Check back soon!</p>';
        }
    }
});
