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
        
        // Map heading text to the exact subcategory value used in content-data.js
        // This prevents the same article appearing in multiple subcategories
        const headingToSubcategory = {
            'Memory':                    'Memory',
            'Mental Energy':             'Mental Energy',
            'Sleep & Brain Function':    'Sleep',
            'Learning & Cognitive Skills': 'Learning',
            'Brain Optimization':        'Cognitive Performance',
            // Focus & Concentration
            'Focus Habits':              'Focus Habits',
            'Deep Work':                 'Deep Work',
            'Attention Training':        'Attention',
            'Study & Learning Methods':  'Study Methods',
            'Distraction Management':    'Distraction',
            // Productivity
            'Habit Formation':           'Habits',
            'Time Management':           'Time Management',
            'Goal Setting':              'Goals',
            'Learning & Skill Development': 'Skill Development',
            'Personal Performance':      'Performance'
        };

        // Find the matching subcategory key (partial match on heading)
        let subcategoryValue = null;
        for (const [key, value] of Object.entries(headingToSubcategory)) {
            if (heading.includes(key)) {
                subcategoryValue = value;
                break;
            }
        }

        // Filter strictly by subcategory field — no keyword fallback to prevent duplicates
        let matchingArticles = [];
        if (subcategoryValue) {
            matchingArticles = articles.filter(a =>
                a.category === categoryFilter &&
                a.subcategory === subcategoryValue
            );
        }
        
        console.log(`${heading}: Found ${matchingArticles.length} matching articles`);
        
        // Remove existing ul/ol if present (even hardcoded ones)
        const existingList = card.querySelector('ul, ol');
        if (existingList) {
            existingList.remove();
        }
        
        // Create and append new list with all matching articles
        if (matchingArticles.length > 0) {
            const ol = document.createElement('ol');
            ol.style.marginTop = '10px';
            ol.style.fontSize = '0.9em';
            ol.style.paddingLeft = '1.4em';
            
            matchingArticles.slice(0, 15).forEach(article => {
                const li = document.createElement('li');
                li.style.marginBottom = '4px';
                const a = document.createElement('a');
                a.href = `articles/${article.slug}.html`;
                a.textContent = article.title;
                li.appendChild(a);
                ol.appendChild(li);
            });
            
            card.appendChild(ol);
            console.log(`✓ Populated ${heading} with ${matchingArticles.length} articles`);
        } else {
            console.log(`✗ No articles found for ${heading}`);
        }
    });
}