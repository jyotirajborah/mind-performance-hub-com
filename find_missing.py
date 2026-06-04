import json, re

with open('js/content-data.js', encoding='utf-8') as f:
    content = f.read()

json_str = re.search(r'window\.MPH_CONTENT\s*=\s*(\{.*\});', content, re.DOTALL).group(1)
data = json.loads(json_str)
articles = data['articles']

ids = sorted(a['id'] for a in articles)
print(f"Total: {len(articles)}")
print(f"IDs present: {ids}")

# Find gaps
for i in range(1, 63):
    if i not in ids:
        print(f"MISSING ID: {i}")
