document.addEventListener('DOMContentLoaded', function() {
    const blogArticlesContainer = document.getElementById('blog-articles');
    const searchInput = document.getElementById('search-input');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const subcategoryList = document.getElementById('subcategory-list');
    const noResults = document.getElementById('no-results');

    let currentCategory = 'all';
    let currentSubcategory = 'all';
    let searchQuery = '';

    // Get articles from content-data.js
    const articles = window.MPH_CONTENT ? window.MPH_CONTENT.articles : [];
    
    // Subcategory definitions
    const subcategories = {
        'Brain Health': [
            { name: 'Memory', keywords: ['memory'] },
            { name: 'Mental Energy', keywords: ['energy', 'fatigue', 'stamina'] },
            { name: 'Sleep', keywords: ['sleep'] },
            { name: 'Learning', keywords: ['learn', 'recall', 'repetition', 'spaced'] },
            { name: 'Brain Optimization', keywords: ['brain', 'cognitive', 'nootropic', 'neuroplasticity'] }
        ],
        'Focus & Concentration': [
            { name: 'Focus Habits', keywords: ['focus', 'mindfulness', 'attention'] },
            { name: 'Deep Work', keywords: ['deep work', 'concentration', 'distraction'] },
            { name: 'Attention Training', keywords: ['attention', 'focus'] },
            { name: 'Study Techniques', keywords: ['study', 'learn', 'retention'] }
        ],
        'Productivity': [
            { name: 'Habit Building', keywords: ['habit'] },
            { name: 'Time Management', keywords: ['time', 'productivity', 'schedule'] },
            { name: 'Goal Setting', keywords: ['goal', 'achievement', 'success'] },
            { name: 'Skill Development', keywords: ['learn', 'skill', 'development'] }
        ]
    };
    
    // Debug logging
    console.log('MPH_CONTENT exists:', !!window.MPH_CONTENT);
    console.log('Articles loaded:', articles.length);

    function updateSubcategoryList() {
        if (currentCategory === 'all') {
            subcategoryList.innerHTML = '';
            return;
        }

        const subs = subcategories[currentCategory] || [];
        const html = '<li><a href="#" data-subcategory="all" class="active">All ' + currentCategory + '</a></li>' +
            subs.map(sub => 
                `<li><a href="#" data-subcategory="${sub.name}">${sub.name}</a></li>`
            ).join('');
        
        subcategoryList.innerHTML = html;

        // Add event listeners to subcategory links
        const subcategoryLinks = subcategoryList.querySelectorAll('a');
        subcategoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                subcategoryLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                currentSubcategory = this.dataset.subcategory;
                filterAndRenderArticles();
            });
        });
    }

    function matchesSubcategory(article, subcategoryName) {
        if (subcategoryName === 'all') return true;
        
        const subDef = subcategories[currentCategory]?.find(s => s.name === subcategoryName);
        if (!subDef) return false;

        const titleLower = article.title.toLowerCase();
        return subDef.keywords.some(keyword => titleLower.includes(keyword));
    }

    function filterAndRenderArticles() {
        let filteredArticles = articles;

        // Filter by category
        if (currentCategory !== 'all') {
            filteredArticles = filteredArticles.filter(article => 
                article.category === currentCategory
            );
        }

        // Filter by subcategory
        if (currentSubcategory !== 'all') {
            filteredArticles = filteredArticles.filter(article =>
                matchesSubcategory(article, currentSubcategory)
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
                    return renderArticleCard(article);
                }).join('');
                
                blogArticlesContainer.innerHTML = html;
                blogArticlesContainer.style.display = 'grid';
                noResults.style.display = 'none';
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
            currentSubcategory = 'all'; // Reset subcategory when category changes
            updateSubcategoryList();
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
    updateSubcategoryList();
    filterAndRenderArticles();
});