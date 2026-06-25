import os, re

OLD = 'brainwave-audio-for-focus.html'
NEW = 'brainwave-audio-for-focus.html'

OLD_TITLE = 'Brainwave Audio for Focus: Can Sound Support BDNF and Cognitive Performance?'
NEW_TITLE = 'Brainwave Audio for Focus: Can Sound Support BDNF and Cognitive Performance?'

OLD_H1 = 'Brainwave Audio for Focus: Can Sound Support BDNF and Cognitive Performance?'
NEW_H1 = 'Brainwave Audio for Focus: Can Sound Support BDNF and Cognitive Performance?'

OLD_CANONICAL = 'https://mindperformancehub.com/articles/brainwave-audio-for-focus.html'
NEW_CANONICAL = 'https://mindperformancehub.com/articles/brainwave-audio-for-focus.html'

OLD_LINK_TEXT = 'Discover Brainwave Audio for Focus'
NEW_LINK_TEXT = 'Discover Brainwave Audio for Focus'

# Also update button text in article callouts
OLD_REVIEW_LINK = 'Discover Brainwave Audio for Focus'
NEW_REVIEW_LINK = 'Discover Brainwave Audio for Focus'

changed = []

for root, dirs, files in os.walk('.'):
    # Skip hidden and node_modules dirs
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules' and d != '__pycache__']
    for filename in files:
        if filename.endswith(('.html', '.py', '.js', '.md')):
            filepath = os.path.join(root, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except:
                continue
            
            original = content
            content = content.replace(OLD, NEW)
            content = content.replace(OLD_CANONICAL, NEW_CANONICAL)
            content = content.replace(OLD_TITLE, NEW_TITLE)
            content = content.replace(OLD_LINK_TEXT, NEW_LINK_TEXT)
            content = content.replace(OLD_REVIEW_LINK, NEW_REVIEW_LINK)
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                changed.append(filepath)
                print(f"Updated: {filepath}")

print(f"\nTotal files updated: {len(changed)}")
