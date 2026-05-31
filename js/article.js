document.addEventListener('DOMContentLoaded', function() {
    // Get article slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    // Find article by slug
    const article = articles.find(a => a.slug === slug);

    if (article) {
        // Update page title and meta
        document.title = `${article.title} - Mind Performance Hub`;
        document.querySelector('meta[name="description"]').content = article.excerpt;

        // Update article content
        document.getElementById('article-breadcrumb').textContent = article.title;
        document.getElementById('article-category').textContent = article.category;
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-date').textContent = formatDate(article.date);
        document.getElementById('article-read-time').textContent = article.readTime;

        // Sample article content
        document.getElementById('article-content').innerHTML = `
            <h2 id="introduction">Introduction</h2>
            <p>${article.excerpt}</p>
            <p>This is a sample article demonstrating the article template structure. In a real implementation, you would load the full article content from a database or CMS.</p>

            <h2 id="main-content">Main Content</h2>
            <p>Here you would include the main body of your article with detailed information, research findings, practical tips, and actionable advice.</p>
            
            <h3>Key Points</h3>
            <ul>
                <li>Point one with detailed explanation</li>
                <li>Point two with supporting evidence</li>
                <li>Point three with practical application</li>
            </ul>

            <h2 id="conclusion">Conclusion</h2>
            <p>Summarize the key takeaways and provide next steps for readers to implement what they've learned.</p>
        `;

        // Load related articles
        const relatedArticles = articles
            .filter(a => a.category === article.category && a.id !== article.id)
            .slice(0, 3);

        if (relatedArticles.length > 0) {
            document.getElementById('related-articles').innerHTML = relatedArticles
                .map(a => `
                    <div class="article-card">
                        <div class="article-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 150px;"></div>
                        <div class="article-content">
                            <h3><a href="article.html?slug=${a.slug}">${a.title}</a></h3>
                            <div class="article-meta">
                                <span>${a.readTime}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
        }
    } else {
        // Article not found
        document.getElementById('article-content').innerHTML = '<p>Article not found. <a href="blog.html">Return to blog</a>.</p>';
    }
});

// Share functionality
function shareArticle(platform) {
    const url = window.location.href;
    const title = document.getElementById('article-title').textContent;
    
    let shareUrl = '';
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}
