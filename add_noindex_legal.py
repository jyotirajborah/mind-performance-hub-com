legal_pages = [
    'privacy-policy.html',
    'terms-of-service.html',
    'disclaimer.html',
    'affiliate-disclosure.html',
]

for filename in legal_pages:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'name="robots"' in content:
        print(f"Already has robots tag: {filename}")
        continue

    content = content.replace(
        '<meta name="viewport"',
        '<meta name="robots" content="noindex, follow">\n    <meta name="viewport"',
        1
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Added noindex to: {filename}")
