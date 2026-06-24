with open('walking-program-download.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix "12-week program" references
content = content.replace(
    "What's In Your Program",
    "What's In Your Guide"
)
content = content.replace(
    "Your 12-Week Schedule at a Glance",
    "Walking Method — Session Reference"
)
content = content.replace(
    "Weeks 1-4: Base Building",
    "Phase 1: Base Building"
)
content = content.replace(
    "Weeks 5-8: Intensification",
    "Phase 2: Intensification"
)
content = content.replace(
    "Weeks 9-12: Peak Conditioning",
    "Phase 3: Peak Conditioning"
)
content = content.replace(
    "12-week walking schedule",
    "Walking method overview"
)
content = content.replace(
    "3 sample session scripts",
    "Treadmill &amp; outdoor session scripts"
)
content = content.replace(
    "Complete 12-week progressive walking schedule",
    "Walking method &amp; session overview"
)

with open('walking-program-download.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
