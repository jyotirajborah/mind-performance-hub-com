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

// Sample Articles Data
const articles = [
    {
        id: 1,
        title: "10 Science-Backed Ways to Improve Your Memory",
        excerpt: "Discover proven techniques to enhance your memory retention and recall abilities.",
        category: "Brain Health",
        readTime: "8 min read",
        date: "2026-05-28",
        image: "",
        slug: "improve-memory-science-backed"
    },
    {
        id: 2,
        title: "The Ultimate Guide to Deep Work and Focus",
        excerpt: "Learn how to achieve peak concentration and eliminate distractions for maximum productivity.",
        category: "Focus & Concentration",
        readTime: "12 min read",
        date: "2026-05-25",
        image: "",
        slug: "deep-work-focus-guide"
    },
    {
        id: 3,
        title: "Building Habits That Stick: A Practical Framework",
        excerpt: "Master the art of habit formation with this evidence-based approach.",
        category: "Productivity",
        readTime: "10 min read",
        date: "2026-05-22",
        image: "",
        slug: "building-habits-framework"
    },
    {
        id: 4,
        title: "How Sleep Affects Your Cognitive Performance",
        excerpt: "Understanding the critical relationship between quality sleep and brain function.",
        category: "Brain Health",
        readTime: "7 min read",
        date: "2026-05-20",
        image: "",
        slug: "sleep-cognitive-performance"
    },
    {
        id: 5,
        title: "Time Management Strategies for Peak Productivity",
        excerpt: "Practical techniques to optimize your time and accomplish more with less stress.",
        category: "Productivity",
        readTime: "9 min read",
        date: "2026-05-18",
        image: "",
        slug: "time-management-strategies"
    },
    {
        id: 6,
        title: "Mindfulness Techniques for Better Focus",
        excerpt: "Simple mindfulness practices to enhance your attention and concentration.",
        category: "Focus & Concentration",
        readTime: "6 min read",
        date: "2026-05-15",
        image: "",
        slug: "mindfulness-better-focus"
    }
];

// Sample Resources Data
const resources = [
    {
        id: 1,
        title: "Deep Work by Cal Newport",
        type: "Book",
        description: "Essential reading on achieving focused success in a distracted world.",
        link: "#",
        category: "Focus"
    },
    {
        id: 2,
        title: "Notion - All-in-One Workspace",
        type: "Tool",
        description: "Powerful productivity tool for notes, tasks, and knowledge management.",
        link: "#",
        category: "Productivity"
    },
    {
        id: 3,
        title: "Headspace - Meditation App",
        type: "App",
        description: "Guided meditation and mindfulness for mental clarity and focus.",
        link: "#",
        category: "Brain Health"
    },
    {
        id: 4,
        title: "Learning How to Learn",
        type: "Course",
        description: "Popular Coursera course on effective learning techniques.",
        link: "#",
        category: "Learning"
    }
];

// Render Article Card
function renderArticleCard(article) {
    return `
        <article class="article-card">
            <div class="article-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
            <div class="article-content">
                <span class="article-category">${article.category}</span>
                <h3><a href="article.html?slug=${article.slug}">${article.title}</a></h3>
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
