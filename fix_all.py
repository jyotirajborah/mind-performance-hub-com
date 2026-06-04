import json, re

with open('js/content-data.js', encoding='utf-8') as f:
    content = f.read()

json_str = re.search(r'window\.MPH_CONTENT\s*=\s*(\{.*\});', content, re.DOTALL).group(1)
data = json.loads(json_str)
articles = data['articles']

print(f"Articles before: {len(articles)}")

# Fix 1: Tag the 4 remaining empty-subcategory articles
empty_map = {
    'deep-work-focus-guide':      'Deep Work',
    'building-habits-framework':  'Habits',
    'time-management-strategies': 'Time Management',
    'mindfulness-better-focus':   'Focus Habits',
}

for article in articles:
    if article['slug'] in empty_map and not article['subcategory']:
        article['subcategory'] = empty_map[article['slug']]
        print(f"  Tagged: {article['slug']} -> {article['subcategory']}")

# Fix 2: Check if blood-sugar-mental-energy is missing and add it if so
slugs = [a['slug'] for a in articles]
if 'blood-sugar-mental-energy' not in slugs:
    print("  Adding missing: blood-sugar-mental-energy")
    # Find where id=3 should go (between id 2 and 4)
    new_article = {
        "id": 3,
        "title": "Blood Sugar and Mental Energy: The Complete Guide to Glucose Optimization",
        "excerpt": "Learn how blood sugar affects mental energy, focus, and cognitive performance. Science-backed strategies to stabilize glucose for sustained brain power.",
        "category": "Brain Health",
        "subcategory": "Mental Energy",
        "type": "guide",
        "readTime": "10 min read",
        "date": "2026-06-02",
        "slug": "blood-sugar-mental-energy"
    }
    # Insert after id=2
    for i, a in enumerate(articles):
        if a['id'] == 2:
            articles.insert(i+1, new_article)
            break
else:
    print("  blood-sugar-mental-energy already present")

print(f"Articles after: {len(articles)}")

# Write back
new_json = json.dumps(data, indent=2, ensure_ascii=False)
new_content = f'window.MPH_CONTENT = {new_json};\n'
with open('js/content-data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done")
