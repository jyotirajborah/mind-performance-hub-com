document.addEventListener('DOMContentLoaded', function() {
    const blogArticlesContainer = document.getElementById('blog-articles');
    const searchInput = document.getElementById('search-input');
    const noResults = document.getElementById('no-results');

    let currentCategory = 'all';
    let currentSubcategory = 'all';
    let searchQuery = '';

    // Get articles from content-data.js
    const articles = window.MPH_CONTENT ? window.MPH_CONTENT.articles : [];
    
    // Subcategory keyword matching
    const subcategoryKeywords = {
        'Memory': ['memory'],
        'Mental Energy': ['energy', 'fatigue', 'stamina'],
        'Sleep': ['sleep'],
        'Learning': ['learn', 'recall', 'repetition', 'spaced'],
        'Brain Optimization': ['brain', 'cognitive', 'nootropic', 'neuroplasticity'],
        'Focus Habits': ['focus', 'mindfulness', 'attention'],
        'Deep Work': ['deep work', 'concentration', 'distraction'],
        'Attention Training': ['attention', 'focus'],
        'Study Techniques': ['study', 'learn', 'retention'],
        'Habit Building': ['habit'],
        'Time Management': ['time', 'productivity', 'schedule'],
        'Goal Setting': ['goal', 'achievement', 'success'],
        'Skill Development': ['learn', 'skill', 'development']
    };
    
    console.log('Articles loaded:', articles.length);

    // Handle expand/collapse and category selection
    const categoryItems = document.querySelectorAll('.category-item');
    const allArticlesLink = document.querySelector('[data-category="all"]');
    
    // All Articles link
    if (allArticlesLink) {
        allArticlesLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove all active classes
            document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            // Collapse all subcategories
            document.querySelectorAll('.subcategory-list').forEach(list => {
                list.style.display = 'none';
            });
            document.querySelectorAll('.expand-icon').forEach(icon => {
                icon.textContent = '+';
            });
            
            currentCategory = 'all';
            currentSubcategory = 'all';
            filterAndRenderArticles();
        });
    }

    categoryItems.forEach(item => {
        const categoryLink = item.querySelector('.category-link');
        const subcategoryList = item.querySelector('.subcategory-list');
        const expandIcon = item.querySelector('.expand-icon');
        const subcategoryLinks = subcategoryList.querySelectorAll('a');

        // Category link click - expand/collapse and show all from that category
        categoryLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.dataset.category;
            const isExpanded = subcategoryList.style.display === 'block';

            // Collapse all other subcategories
            document.querySelectorAll('.subcategory-list').forEach(list => {
                if (list !== subcategoryList) {
                    list.style.display = 'none';
                }
            });
            document.querySelectorAll('.expand-icon').forEach(icon => {
                if (icon !== expandIcon) {
                    icon.textContent = '+';
                }
            });

            // Toggle this subcategory list
            if (isExpanded) {
                subcategoryList.style.display = 'none';
                expandIcon.textContent = '+';
            } else {
                subcategoryList.style.display = 'block';
                expandIcon.textContent = '−';
            }

            // Remove all active classes
            document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');

            // Show all articles from this category
            currentCategory = category;
            currentSubcategory = 'all';
            filterAndRenderArticles();
        });

        // Subcategory link clicks
        subcategoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove all active classes
                document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');

                currentCategory = this.dataset.category;
                currentSubcategory = this.dataset.subcategory;
                filterAndRenderArticles();
            });
        });
    });

    function matchesSubcategory(article, subcategoryName) {
        if (subcategoryName === 'all') return true;
        
        const keywords = subcategoryKeywords[subcategoryName];
        if (!keywords) return false;

        const titleLower = article.title.toLowerCase();
        return keywords.some(keyword => titleLower.includes(keyword));
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