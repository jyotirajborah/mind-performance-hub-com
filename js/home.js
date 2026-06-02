// Homepage specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get articles from content-data.js
    const articles = window.MPH_CONTENT ? window.MPH_CONTENT.articles : [];
    
    // Render Latest Articles
    const latestArticlesContainer = document.getElementById('latest-articles');
    if (latestArticlesContainer && articles.length > 0) {
        const latestArticles = articles.slice(0, 3);
        latestArticlesContainer.innerHTML = latestArticles.map(article => renderArticleCard(article)).join('');
    }

    // Render Popular Articles
    const popularArticlesContainer = document.getElementById('popular-articles');
    if (popularArticlesContainer && articles.length > 0) {
        const popularArticles = articles.slice(0, 3);
        popularArticlesContainer.innerHTML = popularArticles.map(article => renderArticleCard(article)).join('');
    }

    // Render Resources Preview (if resources data exists)
    const resourcesPreviewContainer = document.getElementById('resources-preview');
    if (resourcesPreviewContainer && typeof resources !== 'undefined') {
        const previewResources = resources.slice(0, 4);
        resourcesPreviewContainer.innerHTML = previewResources.map(resource => renderResourceCard(resource)).join('');
    }
});