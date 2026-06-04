import json, re

# Read content-data.js
with open('js/content-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON
json_str = re.search(r'window\.MPH_CONTENT\s*=\s*(\{.*\});', content, re.DOTALL).group(1)
data = json.loads(json_str)

# Mapping: slug -> correct subcategory
subcategory_map = {
    # Mental Energy
    'adaptogens-mental-stamina':        'Mental Energy',
    'blood-sugar-mental-energy':        'Mental Energy',
    'boost-mental-energy-naturally':    'Mental Energy',
    'breathing-techniques-mental-energy': 'Mental Energy',
    'caffeine-optimization-guide':      'Mental Energy',
    'circadian-energy-patterns':        'Mental Energy',
    'energy-draining-habits':           'Mental Energy',
    'exercise-mental-energy-connection':'Mental Energy',
    'hydration-brain-performance':      'Mental Energy',
    'light-exposure-circadian-energy':  'Mental Energy',
    'managing-energy-crashes-guide':    'Mental Energy',
    'mental-vs-physical-fatigue':       'Mental Energy',
    'mitochondria-cellular-energy':     'Mental Energy',
    'nootropics-cognitive-enhancers-guide': 'Mental Energy',
    'nutrition-timing-peak-energy':     'Mental Energy',
    'overcome-brain-fog-mental-clarity':'Mental Energy',
    'stress-adrenal-health-energy':     'Mental Energy',
    'sustainable-energy-systems-guide': 'Mental Energy',
    'dopamine-mental-energy':           'Mental Energy',

    # Sleep
    'sleep-cognitive-performance':      'Sleep',
    'sleep-and-memory-formation':       'Sleep',  # moved from Memory to Sleep

    # Learning
    'active-recall-guide':              'Learning',  # was Memory — fix the duplicate
    'spaced-repetition-guide':          'Learning',  # was Memory — fix the duplicate
    'improve-memory-science-backed':    'Learning',

    # Cognitive Performance (Brain Optimization)
    'neuroplasticity-and-memory':       'Cognitive Performance',
}

changed = 0
for article in data['articles']:
    slug = article['slug']
    if slug in subcategory_map:
        old = article['subcategory']
        new = subcategory_map[slug]
        if old != new:
            print(f"  [{slug}] subcategory: '{old}' → '{new}'")
            article['subcategory'] = new
            changed += 1

print(f"\nTotal changes: {changed}")

# Write back
new_json = json.dumps(data, indent=2, ensure_ascii=False)
new_content = f'window.MPH_CONTENT = {new_json};\n'
with open('js/content-data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ content-data.js updated")
