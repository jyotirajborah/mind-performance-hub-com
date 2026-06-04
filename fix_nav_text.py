import os, re

articles_dir = 'articles'
files = [f for f in os.listdir(articles_dir) if f.endswith('.html')]

fixes = {
    # Short nav text → correct full text (in anchor tags only)
    r'(<a href="\.\.\/focus-concentration\.html"[^>]*>)Focus(</a>)': r'\1Focus &amp; Concentration\2',
    r'(<a href="\.\.\/focus-concentration\.html"[^>]*>)Focus &amp; Concentration(</a>)': r'\1Focus &amp; Concentration\2',  # already correct, skip
    r'(<a href="\.\.\/productivity\.html"[^>]*>)Productivity(</a>)': r'\1Productivity &amp; Self-Improvement\2',
}

changed_files = 0
for filename in sorted(files):
    filepath = os.path.join(articles_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix Focus nav item
    content = re.sub(
        r'(<a href="\.\.\/focus-concentration\.html"[^>]*>)Focus(</a>)',
        r'\1Focus &amp; Concentration\2',
        content
    )
    
    # Fix Productivity nav item
    content = re.sub(
        r'(<a href="\.\.\/productivity\.html"[^>]*>)Productivity(</a>)',
        r'\1Productivity &amp; Self-Improvement\2',
        content
    )
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        changed_files += 1
        print(f"Fixed: {filename}")

print(f"\nTotal files fixed: {changed_files}")
