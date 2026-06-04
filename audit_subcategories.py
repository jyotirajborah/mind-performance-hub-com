import json, re

with open('js/content-data.js', encoding='utf-8') as f:
    content = f.read()

json_str = re.search(r'window\.MPH_CONTENT\s*=\s*(\{.*\});', content, re.DOTALL).group(1)
data = json.loads(json_str)
articles = data['articles']

from collections import Counter
print(f"Total: {len(articles)}\n")

subcats = Counter(a['subcategory'] or '(EMPTY)' for a in articles)
print("Subcategory distribution:")
for sub, count in sorted(subcats.items()):
    print(f"  '{sub}': {count}")

print("\nArticles with EMPTY subcategory:")
for a in articles:
    if not a['subcategory']:
        print(f"  [{a['id']}] {a['slug']} | {a['category']}")
