---
inclusion: manual
---

# Blog Post Automation Workflow

## Overview
When creating or updating blog posts on Mind Performance Hub, the system is fully automated. You only need to add the article HTML file and update content-data.js - everything else happens automatically.

## Automated Features

### 1. **Dynamic Content Loading**
All article metadata is stored in `js/content-data.js`. When you add a new article:
- Article cards automatically appear on the blog page
- Home page shows latest articles
- Category pages filter and display relevant articles
- No manual HTML updates needed

### 2. **Category & Subcategory System**
Articles are automatically:
- Filtered by category (Brain Health, Focus & Concentration, Productivity)
- Matched to subcategories using keyword detection
- Displayed in correct subcategory cards on category pages
- Shown in collapsible category sidebar on blog page

### 3. **Tag Cloud & Article Tags**
- Tag cloud dynamically generates from `SITE_TAGS` in `main.js`
- Tags appear below each article card (below date/time)
- Tags are automatically matched based on article title and excerpt
- All tags are consistent across the site

### 4. **Breadcrumb Navigation**
Each article card shows "Category > Subcategory" automatically based on:
- Explicit subcategory field in content-data.js
- Or keyword matching from article title

## Workflow for Adding a New Blog Post

### Step 1: Create the Article HTML File
- Create: `articles/your-article-slug.html`
- Use existing article HTML as template
- Include proper meta tags, title, content

### Step 2: Update content-data.js
Add entry to `js/content-data.js`:

```javascript
{
  "id": 45,
  "title": "Your Article Title",
  "excerpt": "Brief description...",
  "category": "Brain Health", // or "Focus & Concentration" or "Productivity"
  "subcategory": "Memory", // optional, will auto-detect if omitted
  "type": "article", // or "guide", "comparison"
  "readTime": "8 min read",
  "date": "2026-06-02",
  "slug": "your-article-slug"
}
```

### Step 3: Run the Extraction Script (Optional Alternative)
If you prefer automation, run:
```bash
python extract_articles.py
```
This reads all HTML files in `/articles` and regenerates `content-data.js` automatically.

### Step 4: Commit and Push
```bash
git add articles/your-article-slug.html js/content-data.js
git commit -m "Add new article: Your Article Title"
git push
```

## What Happens Automatically

After pushing:
1. ✅ **Blog page**: Article appears in the main grid
2. ✅ **Home page**: Shows in "Latest Articles" section
3. ✅ **Category page**: Appears in correct category and subcategory card
4. ✅ **Sidebar filters**: Category/subcategory filters include it
5. ✅ **Tag cloud**: Updates if new keywords are detected
6. ✅ **Article tags**: Relevant tags appear below card metadata
7. ✅ **Search**: Article is searchable by title and excerpt
8. ✅ **Breadcrumb**: Shows "Category > Subcategory" on card

## Valid Categories & Subcategories

### Brain Health
- Memory
- Mental Energy
- Sleep
- Learning
- Brain Optimization

### Focus & Concentration
- Focus Habits
- Deep Work
- Attention Training
- Study Techniques
- Distraction Management

### Productivity
- Habit Building
- Time Management
- Goal Setting
- Skill Development
- Personal Performance

## Site Tags (SITE_TAGS)
These 21 tags are used for tag cloud and article card tags:
- Memory, Focus, Sleep, Energy, Learning
- Productivity, Habits, Time Management, Deep Work
- Brain Health, Cognitive, Mindfulness, Study
- Goal Setting, Stress, Fatigue, Neuroplasticity
- Nootropics, Hydration, Exercise, Nutrition

Tags are automatically matched from article title and excerpt.

## Critical Rules for AI Assistant

When the user asks to "write a blog post" or "add an article":

1. **Create the HTML file** in `/articles/` folder
2. **Add metadata entry** to `js/content-data.js`
3. **Verify category** is one of: Brain Health, Focus & Concentration, Productivity
4. **Use SITE_TAGS** for keyword matching (no new tags)
5. **Auto-detect subcategory** based on title keywords if not specified
6. **Use proper date format**: YYYY-MM-DD
7. **Generate slug**: lowercase-with-hyphens

## DO NOT Manually Update

These files are dynamically generated and should NOT be manually edited:
- ❌ blog.html article grid
- ❌ index.html article grid
- ❌ brain-health.html article lists
- ❌ focus-concentration.html article lists
- ❌ productivity.html article lists
- ❌ Tag cloud markup (auto-generated)
- ❌ Subcategory card lists (auto-populated)

## Troubleshooting

**Article not appearing?**
1. Check `js/content-data.js` has correct entry
2. Verify category name matches exactly
3. Check slug matches HTML filename
4. Clear browser cache

**Tags not showing?**
1. Check title/excerpt contains keywords from SITE_TAGS
2. Max 4 tags per article automatically selected
3. Tags must match tag cloud keywords exactly

**Subcategory not detected?**
1. Add explicit `subcategory` field to content-data.js entry
2. Or include subcategory keywords in article title
3. Check keyword matching logic in `js/main.js`

## File Structure Reference

```
/articles/
  ├── your-article-slug.html (new article)
/js/
  ├── content-data.js (add metadata here)
  ├── main.js (SITE_TAGS, renderArticleCard)
  ├── blog.js (tag cloud, filtering)
  ├── category.js (subcategory population)
/css/
  ├── styles.css (article card styles, tags)
  ├── blog.css (tag cloud, sidebar)
  ├── article.css (individual article page)
```

## Summary

✅ **One action**: Add article HTML + update content-data.js
✅ **Everything else is automatic**: Categories, tags, filters, breadcrumbs, sidebar
✅ **No manual updates**: Blog page, home page, category pages all update automatically
✅ **Consistent tags**: SITE_TAGS ensures tag uniformity across the site
✅ **Dynamic filtering**: Search, categories, subcategories, and tags all work automatically
