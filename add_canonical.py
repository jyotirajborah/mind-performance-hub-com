import os, re

BASE_URL = "https://mindperformancehub.com"
articles_dir = 'articles'
files = [f for f in os.listdir(articles_dir) if f.endswith('.html')]

changed = 0
for filename in sorted(files):
    filepath = os.path.join(articles_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if canonical already exists
    if 'rel="canonical"' in content:
        continue

    slug = filename.replace('.html', '')
    canonical_url = f"{BASE_URL}/articles/{filename}"

    # Insert canonical + og:url after <meta charset> line
    canonical_tag = f'    <link rel="canonical" href="{canonical_url}">\n    <meta property="og:url" content="{canonical_url}">\n'

    # Insert before </head>
    new_content = content.replace('</head>', canonical_tag + '</head>', 1)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1

print(f"Added canonical tags to {changed} articles")
