import re

BASE_URL = "https://mindperformancehub.com"

static_pages = [
    ('index.html', '/'),
    ('blog.html', '/blog.html'),
    ('brain-health.html', '/brain-health.html'),
    ('focus-concentration.html', '/focus-concentration.html'),
    ('productivity.html', '/productivity.html'),
    ('resources.html', '/resources.html'),
    ('about.html', '/about.html'),
    ('contact.html', '/contact.html'),
]

changed = 0
for filename, path in static_pages:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'rel="canonical"' in content:
        print(f"  Skipping {filename} (already has canonical)")
        continue

    url = f"{BASE_URL}{path}"
    canonical_tag = f'    <link rel="canonical" href="{url}">\n'
    new_content = content.replace('</head>', canonical_tag + '</head>', 1)

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1
        print(f"  Fixed: {filename}")

print(f"\nAdded canonical to {changed} static pages")
