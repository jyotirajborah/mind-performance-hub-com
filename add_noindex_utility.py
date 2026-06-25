pages = [
    'thank-you-brain-song.html',
    'walking-program-download.html',
    'brain-song-pdf-guide.html',
    'contact.html',
    'article.html',
]

for filename in pages:
    try:
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
    except FileNotFoundError:
        print(f"Not found: {filename}")
