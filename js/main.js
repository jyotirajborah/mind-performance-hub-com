// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

const articles = window.MPH_CONTENT?.articles || [];
const resources = window.MPH_CONTENT?.resources || [];

// Render Article Card
function renderArticleCard(article) {
    const articleUrl = article.url || `article.html?slug=${article.slug}`;
    const subcategory = article.subcategory ? `<span>${article.subcategory}</span>` : '';
    return `
        <article class="article-card">
            <div class="article-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
            <div class="article-content">
                <span class="article-category">${article.category}</span>
                ${subcategory ? `<div class="article-subcategory">${subcategory}</div>` : ''}
                <h3><a href="${articleUrl}">${article.title}</a></h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span>${article.readTime}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
            </div>
        </article>
    `;
}

// Render Resource Card
function renderResourceCard(resource) {
    return `
        <div class="resource-card">
            <span class="resource-type">${resource.type}</span>
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.link}" class="resource-link" target="_blank" rel="noopener">View Resource →</a>
        </div>
    `;
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { articles, resources, renderArticleCard, renderResourceCard };
}
