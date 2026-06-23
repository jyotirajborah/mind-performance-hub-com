import os, re

SUFFIX = " | Mind Performance Hub"
MAX_LEN = 65
articles_dir = 'articles'
files = [f for f in os.listdir(articles_dir) if f.endswith('.html')]

changed = 0
for filename in sorted(files):
    filepath = os.path.join(articles_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'<title>(.*?)</title>', content)
    if not match:
        continue

    title = match.group(1)
    if len(title) <= MAX_LEN:
        continue

    # Try removing the suffix first
    if SUFFIX in title:
        short_title = title.replace(SUFFIX, '')
        if len(short_title) <= MAX_LEN:
            new_content = content.replace(f'<title>{title}</title>', f'<title>{short_title}</title>')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            changed += 1
            print(f"  Fixed ({len(title)}→{len(short_title)}): {short_title}")
            continue

    # If still too long after removing suffix, truncate at last word before limit
    if SUFFIX in title:
        base = title.replace(SUFFIX, '')
    else:
        base = title

    if len(base) > MAX_LEN:
        truncated = base[:MAX_LEN].rsplit(' ', 1)[0]
        new_content = content.replace(f'<title>{title}</title>', f'<title>{truncated}</title>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed += 1
        print(f"  Truncated ({len(title)}→{len(truncated)}): {truncated}")

print(f"\nTotal fixed: {changed} articles")
