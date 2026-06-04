import json, re

with open('js/content-data.js', encoding='utf-8') as f:
    content = f.read()

json_str = re.search(r'window\.MPH_CONTENT\s*=\s*(\{.*\});', content, re.DOTALL).group(1)
data = json.loads(json_str)
articles = data['articles']

# Insert ID 3 after ID 2
id3 = {
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

for i, a in enumerate(articles):
    if a['id'] == 2:
        articles.insert(i + 1, id3)
        print(f"Inserted ID 3 at position {i+1}")
        break

print(f"Total articles: {len(articles)}")

new_json = json.dumps(data, indent=2, ensure_ascii=False)
with open('js/content-data.js', 'w', encoding='utf-8') as f:
    f.write(f'window.MPH_CONTENT = {new_json};\n')

print("Done")
