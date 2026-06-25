import os, re

OLD = 'https://2ee61kravqdtbu5360r8x9s5cm.hop.clickbank.net'
NEW = 'https://gobrainsong.com/?hopId=b7831111-f811-46f5-8a3c-b8afc7f5e4d5'

files_to_check = ['brain-song.html', 'articles/brainwave-audio-for-focus.html']

for filepath in files_to_check:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    count = content.count(OLD)
    if count:
        content = content.replace(OLD, NEW)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {count} link(s) in {filepath}")
    else:
        print(f"No old links in {filepath}")
