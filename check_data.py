import json

# Read content-data.js
with open('js/content-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON data
data_str = content.replace('window.MPH_CONTENT = ', '').rstrip(';')
data = json.loads(data_str)

articles = data['articles']

# Check for issues
print(f"Total articles: {len(articles)}")
print(f"\nUnique categories: {set(a['category'] for a in articles)}")

# Check for duplicates
slugs = [a['slug'] for a in articles]
duplicates = [s for s in set(slugs) if slugs.count(s) > 1]
if duplicates:
    print(f"\n⚠️ Duplicate slugs found: {duplicates}")
else:
    print("\n✓ No duplicate slugs")

# Check for missing required fields
print("\n🔍 Checking for missing fields:")
for i, article in enumerate(articles):
    missing = []
    for field in ['id', 'title', 'excerpt', 'category', 'slug', 'date', 'readTime']:
        if field not in article or not article[field]:
            missing.append(field)
    if missing:
        print(f"  Article {i+1} ({article.get('title', 'NO TITLE')}): Missing {missing}")

# Show sample of articles
print("\n📋 First 10 articles:")
for article in articles[:10]:
    print(f"  {article['id']}. {article['title']}")
    print(f"     Category: {article['category']} | Slug: {article['slug']}")
