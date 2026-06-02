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

// Shared tag list used across the site
const SITE_TAGS = [
    'Memory', 'Focus', 'Sleep', 'Energy', 'Learning', 
    'Productivity', 'Habits', 'Time Management', 'Deep Work',
    'Brain Health', 'Cognitive', 'Mindfulness', 'Study',
    'Goal Setting', 'Stress', 'Fatigue', 'Neuroplasticity',
    'Nootropics', 'Hydration', 'Exercise', 'Nutrition'
];

// Render Article Card
function renderArticleCard(article) {
    const articleUrl = article.url || `articles/${article.slug}.html`;
    
    // Determine subcategory from article title or explicit subcategory field
    const subcategoryKeywords = {
        'Memory': ['memory', 'remember', 'retention', 'recall'],
        'Mental Energy': ['energy', 'fatigue', 'stamina', 'caffeine', 'alert', 'vigor'],
        'Sleep': ['sleep', 'insomnia', 'rest'],
        'Learning': ['learn', 'repetition', 'spaced', 'study'],
        'Brain Optimization': ['brain', 'cognitive', 'nootropic', 'neuroplasticity', 'optimization', 'performance', 'mental'],
        'Focus Habits': ['focus', 'mindfulness', 'attention'],
        'Deep Work': ['deep work', 'concentration'],
        'Study Techniques': ['study', 'retention'],
        'Habit Building': ['habit'],
        'Time Management': ['time', 'productivity', 'schedule'],
        'Goal Setting': ['goal', 'achievement'],
        'Skill Development': ['skill', 'development']
    };
    
    // Detect subcategory
    let detectedSubcategory = article.subcategory || '';
    if (!detectedSubcategory) {
        const titleLower = article.title.toLowerCase();
        for (const [subcat, keywords] of Object.entries(subcategoryKeywords)) {
            if (keywords.some(keyword => titleLower.includes(keyword))) {
                detectedSubcategory = subcat;
                break;
            }
        }
    }
    
    // Build breadcrumb tag
    const breadcrumb = detectedSubcategory 
        ? `${article.category} > ${detectedSubcategory}`
        : article.category;
    
    // Assign category-specific color classes
    let categoryClass = 'category-brain-health';
    if (article.category === 'Focus & Concentration') {
        categoryClass = 'category-focus';
    } else if (article.category === 'Productivity') {
        categoryClass = 'category-productivity';
    }
    
    // Extract relevant tags from title and excerpt (using SITE_TAGS only)
    const titleAndExcerpt = (article.title + ' ' + article.excerpt).toLowerCase();
    const matchedTags = SITE_TAGS.filter(tag => 
        titleAndExcerpt.includes(tag.toLowerCase())
    ).slice(0, 4); // Limit to 4 tags per card
    
    const tagsHtml = matchedTags.length > 0 
        ? `<div class="article-tags">${matchedTags.map(tag => 
            `<span class="article-tag">${tag}</span>`
          ).join('')}</div>`
        : '';
    
    return `
        <article class="article-card">
            <div class="article-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
            <div class="article-content">
                <span class="article-breadcrumb ${categoryClass}">${breadcrumb}</span>
                <h3><a href="${articleUrl}">${article.title}</a></h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span>${article.readTime}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
                ${tagsHtml}
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

// Make SITE_TAGS globally available
window.SITE_TAGS = SITE_TAGS;
