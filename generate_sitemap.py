import json, re
from datetime import date

BASE_URL = "https://mindperformancehub.com"
TODAY = date.today().isoformat()

with open('js/content-data.js', encoding='utf-8') as f:
    content = f.read()

json_str = re.search(r'window\.MPH_CONTENT\s*=\s*(\{.*\});', content, re.DOTALL).group(1)
data = json.loads(json_str)
articles = data['articles']

urls = []

# Static pages
static_pages = [
    ("",              "1.0", "weekly"),
    ("blog.html",     "0.9", "daily"),
    ("brain-health.html",   "0.9", "weekly"),
    ("focus-concentration.html", "0.9", "weekly"),
    ("productivity.html",   "0.9", "weekly"),
    ("resources.html",      "0.8", "weekly"),
    ("about.html",          "0.6", "monthly"),
    ("contact.html",        "0.5", "monthly"),
    ("affiliate-disclosure.html", "0.3", "yearly"),
    ("privacy-policy.html", "0.3", "yearly"),
    ("terms-of-service.html","0.3", "yearly"),
    ("disclaimer.html",     "0.3", "yearly"),
]

for path, priority, freq in static_pages:
    url = f"{BASE_URL}/{path}"
    urls.append(f"""  <url>
    <loc>{url}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

# Article pages
for article in sorted(articles, key=lambda a: a['date'], reverse=True):
    url = f"{BASE_URL}/articles/{article['slug']}.html"
    lastmod = article.get('date', TODAY)
    urls.append(f"""  <url>
    <loc>{url}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>""")

sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>"""

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap)

print(f"sitemap.xml generated: {len(urls)} URLs ({len(articles)} articles + {len(static_pages)} static pages)")
