// Homepage specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Render Latest Articles
    const latestArticlesContainer = document.getElementById('latest-articles');
    if (latestArticlesContainer && typeof articles !== 'undefined') {
        const latestArticles = articles.slice(0, 3);
        latestArticlesContainer.innerHTML = latestArticles.map(article => renderArticleCard(article)).join('');
    }

    // Render Popular Articles
    const popularArticlesContainer = document.getElementById('popular-articles');
    if (popularArticlesContainer && typeof articles !== 'undefined') {
        const popularArticles = articles.slice(0, 3);
        popularArticlesContainer.innerHTML = popularArticles.map(article => renderArticleCard(article)).join('');
    }

    // Render Resources Preview
    const resourcesPreviewContainer = document.getElementById('resources-preview');
    if (resourcesPreviewContainer && typeof resources !== 'undefined') {
        const previewResources = resources.slice(0, 4);
        resourcesPreviewContainer.innerHTML = previewResources.map(resource => renderResourceCard(resource)).join('');
    }
});
