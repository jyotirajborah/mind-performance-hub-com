import os
import re
from pathlib import Path
from datetime import datetime

def extract_metadata_from_html(filepath):
    """Extract metadata from HTML article file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    metadata = {}
    
    # Extract title from h1 tag or schema.org headline
    h1_match = re.search(r'<h1>([^<]+)</h1>', content)
    if h1_match:
        metadata['title'] = h1_match.group(1).strip()
    else:
        # Try schema.org headline as fallback
        schema_headline = re.search(r'"headline":\s*"([^"]+)"', content)
        if schema_headline:
            metadata['title'] = schema_headline.group(1).strip()
    
    # Extract description from meta tag
    desc_match = re.search(r'<meta name="description" content="([^"]+)"', content)
    if desc_match:
        metadata['description'] = desc_match.group(1).strip()
    
    # Extract category from article-category span
    cat_match = re.search(r'<span class="article-category">([^<]+)</span>', content)
    if cat_match:
        category_text = cat_match.group(1).strip()
        # Split on " - " if present
        if ' - ' in category_text:
            parts = category_text.split(' - ')
            metadata['category'] = parts[0].strip()
            metadata['subcategory'] = parts[1].strip() if len(parts) > 1 else ""
        else:
            metadata['category'] = category_text
            metadata['subcategory'] = ""
    
    # Extract date from meta
    date_match = re.search(r'<span>([A-Za-z]+\s+\d+,\s+\d{4})</span>', content)
    if date_match:
        date_str = date_match.group(1)
        # Convert "May 15, 2026" to "2026-05-15"
        try:
            dt = datetime.strptime(date_str, "%B %d, %Y")
            metadata['date'] = dt.strftime("%Y-%m-%d")
        except:
            metadata['date'] = "2026-06-02"
    
    # Extract read time
    readtime_match = re.search(r'<span>(\d+\s+min\s+read)</span>', content)
    if readtime_match:
        metadata['readTime'] = readtime_match.group(1).strip()
    
    # Extract from schema.org JSON-LD if available
    schema_match = re.search(r'"datePublished":\s*"([^"]+)"', content)
    if schema_match:
        metadata['date'] = schema_match.group(1).strip()
    
    return metadata

def categorize_article(title, category, subcategory):
    """Determine article type based on title and content"""
    title_lower = title.lower()
    
    if 'guide' in title_lower or 'how to' in title_lower:
        return 'guide'
    elif ' vs ' in title_lower or ' versus ' in title_lower:
        return 'comparison'
    elif 'review' in title_lower:
        return 'review'
    else:
        return 'article'

def generate_slug(filename):
    """Generate slug from filename"""
    return filename.replace('.html', '')

# Get all article files
articles_dir = Path('articles')
article_files = sorted(articles_dir.glob('*.html'))

articles_data = []
article_id = 1

for article_file in article_files:
    print(f"Processing: {article_file.name}")
    metadata = extract_metadata_from_html(article_file)
    slug = generate_slug(article_file.name)
    
    if metadata.get('title'):
        article_type = categorize_article(
            metadata['title'], 
            metadata.get('category', ''), 
            metadata.get('subcategory', '')
        )
        
        article_entry = {
            "id": article_id,
            "title": metadata.get('title', 'Untitled'),
            "excerpt": metadata.get('description', ''),
            "category": metadata.get('category', 'Brain Health'),
            "subcategory": metadata.get('subcategory', ''),
            "type": article_type,
            "readTime": metadata.get('readTime', '6 min read'),
            "date": metadata.get('date', '2026-06-02'),
            "slug": slug
        }
        
        articles_data.append(article_entry)
        article_id += 1

# Sort by date descending
articles_data.sort(key=lambda x: x['date'], reverse=True)

# Re-assign IDs after sorting
for idx, article in enumerate(articles_data, 1):
    article['id'] = idx

# Generate JavaScript file
js_content = 'window.MPH_CONTENT = {\n  "articles": [\n'

for i, article in enumerate(articles_data):
    js_content += '    {\n'
    js_content += f'      "id": {article["id"]},\n'
    js_content += f'      "title": "{article["title"]}",\n'
    js_content += f'      "excerpt": "{article["excerpt"]}",\n'
    js_content += f'      "category": "{article["category"]}",\n'
    js_content += f'      "subcategory": "{article["subcategory"]}",\n'
    js_content += f'      "type": "{article["type"]}",\n'
    js_content += f'      "readTime": "{article["readTime"]}",\n'
    js_content += f'      "date": "{article["date"]}",\n'
    js_content += f'      "slug": "{article["slug"]}"\n'
    js_content += '    }'
    
    if i < len(articles_data) - 1:
        js_content += ','
    js_content += '\n'

js_content += '  ]\n};\n'

# Write to file
output_path = Path('js/content-data.js')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"\n✓ Generated {output_path}")
print(f"✓ Total articles: {len(articles_data)}")
print(f"✓ Date range: {articles_data[-1]['date']} to {articles_data[0]['date']}")
