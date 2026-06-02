document.addEventListener('DOMContentLoaded', function() {
    const blogArticlesContainer = document.getElementById('blog-articles');
    const searchInput = document.getElementById('search-input');
    const noResults = document.getElementById('no-results');

    let currentCategory = 'all';
    let currentSubcategory = 'all';
    let searchQuery = '';
    let currentPage = 1;
    const articlesPerPage = 10;

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

    // Calculate and display article counts
    function updateCounts() {
        // Total articles
        document.getElementById('count-all').textContent = `(${articles.length})`;

        // Category counts
        const brainHealthCount = articles.filter(a => a.category === 'Brain Health').length;
        const focusCount = articles.filter(a => a.category === 'Focus & Concentration').length;
        const productivityCount = articles.filter(a => a.category === 'Productivity').length;

        document.getElementById('count-brain-health').textContent = `(${brainHealthCount})`;
        document.getElementById('count-focus').textContent = `(${focusCount})`;
        document.getElementById('count-productivity').textContent = `(${productivityCount})`;

        // Subcategory counts
        const subcategoryCounts = {};
        
        document.querySelectorAll('.subcategory-list a').forEach(link => {
            const category = link.dataset.category;
            const subcategory = link.dataset.subcategory;
            
            if (category && subcategory) {
                const count = articles.filter(article => {
                    if (article.category !== category) return false;
                    return matchesSubcategory(article, subcategory);
                }).length;
                
                const countSpan = link.querySelector('.count');
                if (countSpan) {
                    countSpan.textContent = `(${count})`;
                }
            }
        });
    }

    updateCounts();

    // Widget collapse/expand functionality
    document.querySelectorAll('.widget-header').forEach(header => {
        header.addEventListener('click', function() {
            const widget = this.closest('.sidebar-widget');
            const content = widget.querySelector('.widget-content');
            const toggle = this.querySelector('.widget-toggle');
            
            if (content.classList.contains('collapsed')) {
                // Expand
                content.classList.remove('collapsed');
                content.style.maxHeight = 'none';
                toggle.textContent = '−';
            } else {
                // Collapse
                content.classList.add('collapsed');
                toggle.textContent = '+';
            }
        });
    });

    // Generate tag cloud
    function generateTagCloud() {
        const tagCloud = document.getElementById('tag-cloud');
        if (!tagCloud) return;

        // Use the same tags from main.js (SITE_TAGS)
        const tags = window.SITE_TAGS || [
            'Memory', 'Focus', 'Sleep', 'Energy', 'Learning', 
            'Productivity', 'Habits', 'Time Management', 'Deep Work',
            'Brain Health', 'Cognitive', 'Mindfulness', 'Study',
            'Goal Setting', 'Stress', 'Fatigue', 'Neuroplasticity',
            'Nootropics', 'Hydration', 'Exercise', 'Nutrition'
        ];

        // Count how many articles match each tag
        const tagCounts = tags.map(tag => {
            const count = articles.filter(article => 
                article.title.toLowerCase().includes(tag.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(tag.toLowerCase())
            ).length;
            return { tag, count };
        }).filter(item => item.count > 0);

        // Sort by count (most popular first) and limit to top 15
        tagCounts.sort((a, b) => b.count - a.count);
        const topTags = tagCounts.slice(0, 15);

        // Calculate font sizes (min 0.85rem, max 1.4rem)
        const maxCount = Math.max(...topTags.map(t => t.count));
        const minCount = Math.min(...topTags.map(t => t.count));
        
        // Render tags with counts
        tagCloud.innerHTML = topTags.map(item => {
            const size = minCount === maxCount ? 1 :
                0.85 + ((item.count - minCount) / (maxCount - minCount)) * 0.55;
            return `<a href="#" class="tag" data-tag="${item.tag}" style="font-size: ${size}rem">${item.tag} <span class="tag-count">(${item.count})</span></a>`;
        }).join('');

        // Add click handlers
        tagCloud.querySelectorAll('.tag').forEach(tagEl => {
            tagEl.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove all active states
                document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active'));
                tagCloud.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
                
                // Mark this tag as active
                this.classList.add('active');
                
                // Filter by tag keyword
                searchQuery = this.dataset.tag;
                currentCategory = 'all';
                currentSubcategory = 'all';
                currentPage = 1; // Reset to first page
                
                // Collapse all categories
                document.querySelectorAll('.subcategory-list').forEach(list => {
                    list.style.display = 'none';
                });
                document.querySelectorAll('.expand-icon').forEach(icon => {
                    icon.textContent = '+';
                });
                
                filterAndRenderArticles();
            });
        });
    }

    generateTagCloud();

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
            currentPage = 1; // Reset to first page
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

            // Toggle this subcategory list (don't close others)
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
            currentPage = 1; // Reset to first page
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
                currentPage = 1; // Reset to first page
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

        // Calculate pagination
        const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

        // Render results
        if (filteredArticles.length > 0) {
            try {
                const html = paginatedArticles.map(article => {
                    return renderArticleCard(article);
                }).join('');
                
                blogArticlesContainer.innerHTML = html;
                blogArticlesContainer.style.display = 'grid';
                noResults.style.display = 'none';
                
                // Render pagination
                renderPagination(totalPages, filteredArticles.length);
            } catch (error) {
                console.error('Error rendering articles:', error);
                blogArticlesContainer.innerHTML = '<p>Error loading articles. Check console.</p>';
            }
        } else {
            blogArticlesContainer.style.display = 'none';
            noResults.style.display = 'block';
            document.getElementById('pagination').innerHTML = '';
        }
    }

    function renderPagination(totalPages, totalArticles) {
        const paginationContainer = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="pagination-info">Showing ' + 
            ((currentPage - 1) * articlesPerPage + 1) + '-' + 
            Math.min(currentPage * articlesPerPage, totalArticles) + 
            ' of ' + totalArticles + ' articles</div>';
        
        paginationHTML += '<div class="pagination-controls">';
        
        // Previous button
        if (currentPage > 1) {
            paginationHTML += `<button class="pagination-btn" data-page="${currentPage - 1}">« Previous</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            // Show first page, last page, current page, and pages around current
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                const activeClass = i === currentPage ? 'active' : '';
                paginationHTML += `<button class="pagination-btn ${activeClass}" data-page="${i}">${i}</button>`;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += '<span class="pagination-ellipsis">...</span>';
            }
        }
        
        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `<button class="pagination-btn" data-page="${currentPage + 1}">Next »</button>`;
        }
        
        paginationHTML += '</div>';
        paginationContainer.innerHTML = paginationHTML;
        
        // Add click handlers
        paginationContainer.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentPage = parseInt(this.dataset.page);
                filterAndRenderArticles();
                // Scroll to top of articles
                blogArticlesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            currentPage = 1; // Reset to first page
            filterAndRenderArticles();
        });
    }

    // Initial render
    filterAndRenderArticles();
});