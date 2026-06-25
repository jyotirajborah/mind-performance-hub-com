import os

NEW = 'https://85bd0ji-yf5zdzd-21ke4d0eyz.hop.clickbank.net'

old_links = [
    'https://2ee61kravqdtbu5360r8x9s5cm.hop.clickbank.net',
    'https://gobrainsong.com/?hopId=b7831111-f811-46f5-8a3c-b8afc7f5e4d5',
]

files = ['brain-song.html', 'articles/brainwave-audio-for-focus.html']

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    total = 0
    for old in old_links:
        count = content.count(old)
        if count:
            content = content.replace(old, NEW)
            total += count
            print(f"  [{filepath}] replaced {count}x: {old[:50]}...")
    if total:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Saved {filepath} ({total} replacements)\n")
    else:
        print(f"  No changes in {filepath}\n")

print("Done.")
