# Mind Performance Hub

A modern, SEO-focused authority website dedicated to brain health, focus, concentration, productivity, and personal performance.

## Overview

Mind Performance Hub is a content-first platform designed to help students, professionals, entrepreneurs, and lifelong learners improve their cognitive performance through practical, research-informed content.

## Features

- **Modern, Clean Design**: Professional blue accent color with white background
- **Mobile-First Responsive**: Optimized for all devices
- **SEO Optimized**: Clean URLs, schema markup, meta tags, and semantic HTML
- **Fast Loading**: Minimal dependencies, optimized CSS and JavaScript
- **Content Categories**:
  - Brain Health (Memory, Cognitive Wellness, Mental Energy, Sleep)
  - Focus & Concentration (Deep Work, Attention Management, Study Techniques)
  - Productivity & Self-Improvement (Habits, Time Management, Learning)
- **Blog System**: Search, filtering, and category organization
- **Resources Page**: Curated tools, books, courses with affiliate support
- **Article Template**: Table of contents, social sharing, related articles
- **Legal Pages**: Privacy Policy, Terms of Service, Disclaimer, Affiliate Disclosure

## Structure

```
mind-performance-hub/
├── index.html                  # Homepage
├── blog.html                   # Blog listing page
├── article.html                # Article template
├── brain-health.html           # Brain Health category
├── focus-concentration.html    # Focus & Concentration category
├── productivity.html           # Productivity category
├── resources.html              # Resources page
├── about.html                  # About page
├── contact.html                # Contact page
├── privacy-policy.html         # Privacy Policy
├── terms-of-service.html       # Terms of Service
├── disclaimer.html             # Disclaimer
├── affiliate-disclosure.html   # Affiliate Disclosure
├── css/
│   ├── styles.css             # Main stylesheet
│   ├── blog.css               # Blog-specific styles
│   ├── category.css           # Category page styles
│   ├── article.css            # Article page styles
│   ├── page.css               # General page styles
│   └── resources.css          # Resources page styles
└── js/
    ├── main.js                # Core functionality
    ├── home.js                # Homepage scripts
    ├── blog.js                # Blog functionality
    ├── category.js            # Category page scripts
    ├── article.js             # Article page scripts
    └── contact.js             # Contact form handling
```

## Getting Started

1. Open `index.html` in a web browser to view the homepage
2. Navigate through the site using the main navigation menu
3. All pages are fully functional with sample content

## Customization

### Adding Articles

Edit `js/main.js` and add new article objects to the `articles` array:

```javascript
{
    id: 7,
    title: "Your Article Title",
    excerpt: "Brief description",
    category: "Brain Health", // or "Focus & Concentration" or "Productivity"
    readTime: "8 min read",
    date: "2026-05-31",
    slug: "your-article-slug"
}
```

### Adding Resources

Edit `js/main.js` and add new resource objects to the `resources` array:

```javascript
{
    id: 5,
    title: "Resource Name",
    type: "Book", // or "Tool", "App", "Course"
    description: "Resource description",
    link: "https://affiliate-link.com",
    category: "Category Name"
}
```

### Styling

- Primary color: `#2563eb` (Professional Blue)
- Modify CSS variables in `css/styles.css` under `:root` to change colors
- All styles are organized by component for easy customization

## SEO Features

- Semantic HTML5 structure
- Meta descriptions on all pages
- Open Graph tags for social sharing
- Schema.org markup (WebSite schema on homepage)
- Clean, descriptive URLs
- Breadcrumb navigation
- Mobile-responsive design
- Fast loading times

## Monetization Support

- Affiliate link integration throughout
- Product recommendation boxes
- Resource listings with affiliate disclosure
- Clear affiliate notices on relevant pages
- Comparison table support (can be added to articles)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies (no jQuery, Bootstrap, etc.)
- Minimal CSS and JavaScript
- Optimized for Core Web Vitals
- Fast initial page load
- Efficient DOM manipulation

## Future Enhancements

To scale to 500+ articles, consider:

1. **Backend Integration**: Connect to a CMS or database
2. **Static Site Generator**: Use tools like Hugo, Jekyll, or Next.js
3. **Search Enhancement**: Implement full-text search with Algolia or similar
4. **Image Optimization**: Add lazy loading and responsive images
5. **Analytics**: Integrate Google Analytics or similar
6. **XML Sitemap**: Generate automatically for better SEO
7. **RSS Feed**: Add for blog subscribers
8. **Performance Monitoring**: Track Core Web Vitals

## License

This project is provided as-is for use in building your authority website.

## Support

For questions or issues, refer to the contact page or modify the contact form to connect to your email service.
