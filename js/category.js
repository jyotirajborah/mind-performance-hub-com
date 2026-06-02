document.addEventListener('DOMContentLoaded', function() {
    const categoryArticlesContainer = document.getElementById('category-articles');
    
    // Get articles from content-data.js
    const articles = window.MPH_CONTENT ? window.MPH_CONTENT.articles : [];
    
    if (categoryArticlesContainer && articles.length > 0) {
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

        console.log(`${pageTitle}: Found ${categoryArticles.length} articles`);

        // Render articles
        if (categoryArticles.length > 0) {
            categoryArticlesContainer.innerHTML = categoryArticles.map(article => 
                renderArticleCard(article)
            ).join('');
        } else {
            categoryArticlesContainer.innerHTML = '<p style="text-align: center; color: var(--text-light);">No articles available yet. Check back soon!</p>';
        }
    }
    
    // Auto-populate subcategory lists with article links
    populateSubcategoryLists(articles);
});

function populateSubcategoryLists(articles) {
    // Find all subcategory cards that have empty or minimal lists
    const subcategoryCards = document.querySelectorAll('.subcategory-card');
    
    subcategoryCards.forEach(card => {
        const heading = card.querySelector('h3')?.textContent.trim();
        const existingList = card.querySelector('ul');
        
        // Map subcategory headings to content-data subcategories
        let subcategoryFilter = '';
        if (heading.includes('Memory')) subcategoryFilter = 'Memory';
        else if (heading.includes('Mental Energy')) subcategoryFilter = 'Mental Energy';
        else if (heading.includes('Sleep')) subcategoryFilter = 'Sleep';
        else if (heading.includes('Learning')) subcategoryFilter = 'Learning';
        
        if (subcategoryFilter) {
            const matchingArticles = articles.filter(a => 
                a.subcategory === subcategoryFilter || 
                (heading.includes('Sleep') && a.title.toLowerCase().includes('sleep'))
            ).slice(0, 10); // Show first 10
            
            if (matchingArticles.length > 0 && !existingList) {
                const ul = document.createElement('ul');
                ul.style.marginTop = '10px';
                ul.style.fontSize = '0.9em';
                
                matchingArticles.forEach(article => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = `articles/${article.slug}.html`;
                    a.textContent = article.title;
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                
                card.appendChild(ul);
            }
        }
    });
}