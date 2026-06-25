import os, re, json

articles_dir = 'articles'
files = [f for f in os.listdir(articles_dir) if f.endswith('.html')]

added = 0
already = 0

for filename in sorted(files):
    filepath = os.path.join(articles_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has JSON-LD
    if 'application/ld+json' in content:
        already += 1
        continue

    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1).strip() if title_match else filename.replace('.html', '').replace('-', ' ').title()

    # Extract description
    desc_match = re.search(r'<meta name="description" content="(.*?)"', content)
    desc = desc_match.group(1) if desc_match else title

    # Extract date from article-meta span (e.g. "June 2, 2026")
    date_match = re.search(r'<span>(June|May|April|March|February|January|July|August|September|October|November|December)\s+\d+,\s+202\d</span>', content)
    if date_match:
        from datetime import datetime
        try:
            d = datetime.strptime(date_match.group(0).replace('<span>', '').replace('</span>', ''), '%B %d, %Y')
            pub_date = d.strftime('%Y-%m-%d')
        except:
            pub_date = '2026-06-02'
    else:
        pub_date = '2026-06-02'

    slug = filename.replace('.html', '')
    url = f'https://mindperformancehub.com/articles/{filename}'

    jsonld = f'''    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{title}",
        "description": "{desc}",
        "author": {{ "@type": "Organization", "name": "Mind Performance Hub" }},
        "datePublished": "{pub_date}",
        "dateModified": "{pub_date}",
        "url": "{url}"
    }}
    </script>'''

    # Insert before </head>
    new_content = content.replace('</head>', jsonld + '\n</head>', 1)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        added += 1

print(f"Added JSON-LD to {added} articles")
print(f"Already had JSON-LD: {already}")
