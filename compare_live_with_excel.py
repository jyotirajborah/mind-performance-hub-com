import pandas as pd
import re
from difflib import SequenceMatcher

# Read the Excel file
excel_file = '[final] MindPerformanceHub_Editorialized_Master_Database_v2.xlsx'
df = pd.read_excel(excel_file)

# Print column names to verify structure
print("Excel columns:", df.columns.tolist())
print(f"\nTotal articles in Excel: {len(df)}")
print("\n" + "="*80)

# Get the primary keywords or article titles from Excel
# Adjust column name based on what's actually in the Excel file
if 'Primary Keyword' in df.columns:
    excel_keywords = df['Primary Keyword'].dropna().tolist()
elif 'Article Title' in df.columns:
    excel_keywords = df['Article Title'].dropna().tolist()
else:
    print("Available columns:", df.columns.tolist())
    excel_keywords = []

# 62 live articles from content-data.js
live_articles = [
    "Active Recall Guide: The Ultimate Study Method",
    "Adaptogens for Mental Stamina: Complete Evidence-Based Guide",
    "Blood Sugar and Mental Energy: The Complete Guide to Glucose Optimization",
    "How to Boost Mental Energy Naturally: 12 Proven Strategies",
    "Brain Foods Backed by Science",
    "Breathing Techniques for Mental Energy: Complete Breathwork Guide",
    "The Complete Guide to Caffeine Optimization for Peak Mental Performance",
    "Causes of Memory Loss (And What You Can Do About It)",
    "Understanding Your Natural Energy Patterns: Circadian and Ultradian Rhythms",
    "Energy-Draining Habits to Eliminate: Breaking Free from Energy Vampires",
    "Exercise and Memory: The Ultimate Brain Booster",
    "Exercise and Mental Energy: The Complete Connection Guide",
    "Foods That Support Memory (Science-Backed Nutrition Guide)",
    "Hydration and Brain Function: Essential for Memory",
    "Hydration and Brain Performance: The Complete Guide",
    "Light Exposure and Circadian Energy: The Complete Optimization Guide",
    "Managing Energy Crashes: Prevention and Recovery Strategies",
    "Memory and Aging: What's Normal and What You Can Control",
    "Memory Exercises for Adults: 10 Proven Techniques",
    "Memory Exercises for Students: Ace Your Exams",
    "Memory Palace Method: Complete Guide",
    "Memory Techniques Used by Champions",
    "Mental Fatigue vs Physical Fatigue: Understanding the Difference",
    "Mitochondrial Health: The Foundation of Mental Energy and Cognitive Performance",
    "Neuroplasticity and Memory: Your Brain's Superpower",
    "Nootropics and Cognitive Enhancers: Evidence-Based Guide",
    "Nutrition Timing for Peak Mental Energy",
    "How to Overcome Brain Fog and Restore Mental Clarity",
    "Short-Term vs Long-Term Memory: Complete Comparison",
    "Signs of Poor Memory: When to Worry",
    "Sleep and Memory Formation: The Ultimate Guide",
    "Spaced Repetition Guide: Remember Everything",
    "Stress, Adrenal Health, and Mental Energy: Complete Recovery Guide",
    "Stress and Memory: How to Protect Your Brain",
    "Building Sustainable Energy Systems for Peak Performance",
    "Vitamins for Memory: Evidence-Based Guide",
    "What Is Memory and How Does It Work?",
    "Working Memory Explained: Your Brain's RAM",
    "10 Science-Backed Ways to Improve Your Memory",
    "The Ultimate Guide to Deep Work and Focus",
    "Building Habits That Stick: A Practical Framework",
    "How Sleep Affects Your Cognitive Performance",
    "Time Management Strategies for Peak Productivity",
    "Mindfulness Techniques for Better Focus",
    "How Dopamine Impacts Your Mental Energy and Motivation",
    "Sleep Stages and Brain Function: Complete Guide",
    "REM Sleep and Memory Consolidation",
    "Effects of Sleep Deprivation on Cognition",
    "The Cognitive Benefits of Napping",
    "Melatonin and Sleep Quality",
    "Sleep Disorders and Cognitive Impact",
    "Optimizing Your Sleep Environment",
    "Caffeine and Sleep: Finding the Balance",
    "Sleep Tracking for Cognitive Insights",
    "Sleep Supplements for Brain Health",
    "Sleep Temperature Optimization",
    "Sleep Position and Brain Health",
    "Advanced Memory Enhancement Techniques",
    "The Complete Guide to Mnemonic Devices",
    "Visual Memory Training Exercises",
    "How to Improve Auditory Memory",
    "Understanding Semantic Memory"
]

def normalize_text(text):
    """Normalize text for comparison"""
    if pd.isna(text):
        return ""
    text = str(text).lower()
    # Remove special characters and extra spaces
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def similarity_score(text1, text2):
    """Calculate similarity between two texts"""
    return SequenceMatcher(None, normalize_text(text1), normalize_text(text2)).ratio()

def find_best_match(live_title, excel_list):
    """Find the best match in Excel for a live article"""
    best_match = None
    best_score = 0
    
    for excel_item in excel_list:
        score = similarity_score(live_title, excel_item)
        if score > best_score:
            best_score = score
            best_match = excel_item
    
    return best_match, best_score

# Find matches
matches = []
no_matches = []

print("\nCOMPARING 62 LIVE ARTICLES WITH EXCEL PLAN")
print("="*80)

for live_article in live_articles:
    best_match, score = find_best_match(live_article, excel_keywords)
    
    # Consider it a match if similarity is above 45%
    if score >= 0.45:
        matches.append({
            'live_article': live_article,
            'excel_match': best_match,
            'similarity': f"{score*100:.1f}%"
        })
    else:
        no_matches.append(live_article)

# Print results
print(f"\n✅ ARTICLES FROM EXCEL PLAN: {len(matches)}")
print("="*80)
for i, match in enumerate(matches, 1):
    print(f"\n{i}. Live: {match['live_article']}")
    print(f"   Excel: {match['excel_match']}")
    print(f"   Match: {match['similarity']}")

print(f"\n\n❌ ARTICLES NOT FROM EXCEL PLAN: {len(no_matches)}")
print("="*80)
for i, article in enumerate(no_matches, 1):
    print(f"{i}. {article}")

print(f"\n\n{'='*80}")
print("SUMMARY")
print("="*80)
print(f"Total live articles: {len(live_articles)}")
print(f"Articles matching Excel plan: {len(matches)}")
print(f"Articles NOT in Excel plan: {len(no_matches)}")
print(f"\nPercentage from Excel: {(len(matches)/len(live_articles)*100):.1f}%")
