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
    console.log('populateSubcategoryLists called with', articles.length, 'articles');
    
    // Find all subcategory cards
    const subcategoryCards = document.querySelectorAll('.subcategory-card');
    console.log('Found', subcategoryCards.length, 'subcategory cards');
    
    subcategoryCards.forEach(card => {
        const heading = card.querySelector('h3')?.textContent.trim();
        console.log('Processing card:', heading);
        
        // Get current page category
        const pageTitle = document.querySelector('.category-hero h1')?.textContent || '';
        let categoryFilter = '';
        
        if (pageTitle.includes('Brain Health')) {
            categoryFilter = 'Brain Health';
        } else if (pageTitle.includes('Focus')) {
            categoryFilter = 'Focus & Concentration';
        } else if (pageTitle.includes('Productivity')) {
            categoryFilter = 'Productivity';
        }
        
        console.log('Category filter:', categoryFilter);
        
        // Filter articles based on subcategory heading
        let matchingArticles = [];
        
        if (heading.includes('Memory')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                (a.subcategory === 'Memory' || a.title.toLowerCase().includes('memory'))
            );
        } else if (heading.includes('Mental Energy')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                (a.subcategory === 'Mental Energy' || a.title.toLowerCase().includes('energy') || a.title.toLowerCase().includes('fatigue'))
            );
        } else if (heading.includes('Sleep')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                (a.subcategory === 'Sleep' || a.title.toLowerCase().includes('sleep'))
            );
        } else if (heading.includes('Learning')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                (a.subcategory === 'Learning' || a.title.toLowerCase().includes('learn') || 
                 a.title.toLowerCase().includes('recall') || a.title.toLowerCase().includes('repetition'))
            );
        } else if (heading.includes('Brain Optimization')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                (a.title.toLowerCase().includes('brain') || a.title.toLowerCase().includes('cognitive') || 
                 a.title.toLowerCase().includes('nootropic') || a.title.toLowerCase().includes('neuroplasticity'))
            );
        } else if (heading.includes('Focus Habits')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                a.title.toLowerCase().includes('focus')
            );
        } else if (heading.includes('Deep Work')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                (a.title.toLowerCase().includes('deep work') || a.title.toLowerCase().includes('concentration'))
            );
        } else if (heading.includes('Habit')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                a.title.toLowerCase().includes('habit')
            );
        } else if (heading.includes('Time Management')) {
            matchingArticles = articles.filter(a => 
                a.category === categoryFilter && 
                a.title.toLowerCase().includes('time')
            );
        }
        
        console.log(`${heading}: Found ${matchingArticles.length} matching articles`);
        
        // Remove existing ul if present (even hardcoded ones)
        const existingList = card.querySelector('ul');
        if (existingList) {
            existingList.remove();
            console.log(`Removed existing list from ${heading}`);
        }
        
        // Create and append new list with all matching articles
        if (matchingArticles.length > 0) {
            const ul = document.createElement('ul');
            ul.style.marginTop = '10px';
            ul.style.fontSize = '0.9em';
            
            matchingArticles.slice(0, 15).forEach(article => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `articles/${article.slug}.html`;
                a.textContent = article.title;
                li.appendChild(a);
                ul.appendChild(li);
            });
            
            card.appendChild(ul);
            console.log(`✓ Populated ${heading} with ${matchingArticles.length} articles`);
        } else {
            console.log(`✗ No articles found for ${heading}`);
        }
    });
}