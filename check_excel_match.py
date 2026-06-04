import json
import re

# Read Excel data (Python file)
with open('all_162_articles_data.py', 'r', encoding='utf-8') as f:
    excel_content = f.read()

# Extract all filenames from Excel
excel_filenames = re.findall(r"'filename':\s*'([^']+)'", excel_content)
excel_slugs = [f.replace('.html', '') for f in excel_filenames]

# Read blog data (JS file)
with open('js/content-data.js', 'r', encoding='utf-8') as f:
    blog_content = f.read()

# Extract all slugs from blog
blog_slugs = re.findall(r'"slug":\s*"([^"]+)"', blog_content)

# Compare
in_both = [slug for slug in blog_slugs if slug in excel_slugs]
not_in_excel = [slug for slug in blog_slugs if slug not in excel_slugs]

print(f"Total in Excel: {len(excel_slugs)}")
print(f"Total on Blog: {len(blog_slugs)}")
print(f"\nArticles from Excel ON live blog: {len(in_both)}")
print(f"Articles on blog NOT in Excel: {len(not_in_excel)}")
print(f"\nArticles NOT in Excel:")
for article in not_in_excel:
    print(f"  - {article}")
