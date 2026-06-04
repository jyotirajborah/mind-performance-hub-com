import json, re
from collections import Counter

with open('js/content-data.js', encoding='utf-8') as f:
    content = f.read()

json_str = re.search(r'window\.MPH_CONTENT\s*=\s*(\{.*\});', content, re.DOTALL).group(1)
data = json.loads(json_str)
articles = data['articles']

print(f'Total articles: {len(articles)}')
cats = Counter(a['category'] for a in articles)
for cat, count in cats.items():
    print(f'  {cat}: {count}')

print()
subcats = Counter((a['category'], a['subcategory'] or "(none)") for a in articles)
for (cat, sub), count in sorted(subcats.items()):
    print(f'  {cat} > "{sub}": {count}')
