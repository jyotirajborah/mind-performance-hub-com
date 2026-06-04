#!/usr/bin/env python3
"""
Generate content-data.js mapping for all actual article HTML files
"""

import os
import json
from datetime import datetime, timedelta

# Map actual article files to their metadata
articles = [
    # Memory Cluster (26 articles)
    {"file": "improve-memory-science-backed.html", "title": "10 Science-Backed Ways to Improve Your Memory", "category": "Brain Health", "subcategory": "Memory", "readTime": "8 min read", "type": "article"},
    {"file": "what-is-memory-and-how-does-it-work.html", "title": "What Is Memory and How Does It Work?", "category": "Brain Health", "subcategory": "Memory", "readTime": "7 min read", "type": "article"},
    {"file": "working-memory-explained.html", "title": "Working Memory Explained: Your Brain's RAM", "category": "Brain Health", "subcategory": "Memory", "readTime": "7 min read", "type": "article"},
    {"file": "short-term-vs-long-term-memory.html", "title": "Short-Term vs Long-Term Memory: Key Differences", "category": "Brain Health", "subcategory": "Memory", "readTime": "8 min read", "type": "comparison"},
    {"file": "causes-of-memory-loss.html", "title": "Common Causes of Memory Loss and What to Do", "category": "Brain Health", "subcategory": "Memory", "readTime": "9 min read", "type": "article"},
    {"file": "signs-of-poor-memory.html", "title": "Warning Signs of Poor Memory You Shouldn't Ignore", "category": "Brain Health", "subcategory": "Memory", "readTime": "7 min read", "type": "article"},
    {"file": "memory-and-aging.html", "title": "Memory and Aging: What's Normal and What's Not", "category": "Brain Health", "subcategory": "Memory", "readTime": "8 min read", "type": "article"},
    {"file": "neuroplasticity-and-memory.html", "title": "Neuroplasticity and Memory: How Your Brain Adapts", "category": "Brain Health", "subcategory": "Memory", "readTime": "9 min read", "type": "article"},
    {"file": "sleep-and-memory-formation.html", "title": "Sleep and Memory Formation: The Critical Connection", "category": "Brain Health", "subcategory": "Memory", "readTime": "8 min read", "type": "article"},
    {"file": "exercise-and-memory.html", "title": "How Exercise Boosts Memory and Brain Health", "category": "Brain Health", "subcategory": "Memory", "readTime": "7 min read", "type": "article"},
    {"file": "stress-and-memory.html", "title": "How Stress Affects Memory and What You Can Do", "category": "Brain Health", "subcategory": "Memory", "readTime": "8 min read", "type": "article"},
    {"file": "foods-that-support-memory.html", "title": "Foods That Support Memory and Cognitive Function", "category": "Brain Health", "subcategory": "Memory", "readTime": "9 min read", "type": "article"},
    {"file": "brain-foods-backed-by-science.html", "title": "Brain Foods Backed by Science", "category": "Brain Health", "subcategory": "Memory", "readTime": "10 min read", "type": "article"},
    {"file": "hydration-and-brain-function.html", "title": "Hydration and Brain Function: Why Water Matters", "category": "Brain Health", "subcategory": "Memory", "readTime": "6 min read", "type": "article"},
    {"file": "vitamins-for-memory.html", "title": "Essential Vitamins for Memory and Brain Health", "category": "Brain Health", "subcategory": "Memory", "readTime": "9 min read", "type": "article"},
    {"file": "memory-exercises-for-adults.html", "title": "Effective Memory Exercises for Adults", "category": "Brain Health", "subcategory": "Memory", "readTime": "10 min read", "type": "article"},
    {"file": "memory-exercises-for-students.html", "title": "Memory Exercises for Students: Study Smarter", "category": "Brain Health", "subcategory": "Memory", "readTime": "9 min read", "type": "article"},
    {"file": "memory-palace-method.html", "title": "The Memory Palace Method: Complete Guide", "category": "Brain Health", "subcategory": "Memory", "readTime": "11 min read", "type": "guide"},
    {"file": "memory-techniques-used-by-champions.html", "title": "Memory Techniques Used by World Champions", "category": "Brain Health", "subcategory": "Memory", "readTime": "10 min read", "type": "article"},
    {"file": "spaced-repetition-guide.html", "title": "Spaced Repetition: The Ultimate Learning Technique", "category": "Brain Health", "subcategory": "Memory", "readTime": "12 min read", "type": "guide"},
    {"file": "active-recall-guide.html", "title": "Active Recall: Transform Your Learning", "category": "Brain Health", "subcategory": "Memory", "readTime": "10 min read", "type": "guide"},
    
    # Mental Energy Cluster (17 articles completed)
    {"file": "boost-mental-energy-naturally.html", "title": "How to Boost Mental Energy Naturally: 12 Proven Strategies", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "10 min read", "type": "article"},
    {"file": "overcome-brain-fog-mental-clarity.html", "title": "Overcome Brain Fog: Restore Mental Clarity", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "9 min read", "type": "article"},
    {"file": "caffeine-optimization-guide.html", "title": "Caffeine Optimization Guide for Peak Mental Performance", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "11 min read", "type": "guide"},
    {"file": "mitochondria-cellular-energy.html", "title": "Mitochondria and Cellular Energy: Powering Your Brain", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "9 min read", "type": "article"},
    {"file": "blood-sugar-mental-energy.html", "title": "Blood Sugar and Mental Energy: The Connection", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "10 min read", "type": "article"},
    {"file": "adaptogens-mental-stamina.html", "title": "Adaptogens for Mental Stamina and Resilience", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "11 min read", "type": "article"},
    {"file": "light-exposure-circadian-energy.html", "title": "Light Exposure and Circadian Energy Optimization", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "9 min read", "type": "article"},
    {"file": "nootropics-cognitive-enhancers-guide.html", "title": "Nootropics and Cognitive Enhancers: Complete Guide", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "13 min read", "type": "guide"},
    {"file": "managing-energy-crashes-guide.html", "title": "Managing Energy Crashes: Prevention and Recovery", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "10 min read", "type": "guide"},
    {"file": "stress-adrenal-health-energy.html", "title": "Stress, Adrenal Health, and Mental Energy", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "11 min read", "type": "article"},
    {"file": "sustainable-energy-systems-guide.html", "title": "Building Sustainable Energy Systems for Life", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "12 min read", "type": "guide"},
    {"file": "exercise-mental-energy-connection.html", "title": "Exercise and Mental Energy: The Connection", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "9 min read", "type": "article"},
    {"file": "hydration-brain-performance.html", "title": "Hydration and Brain Performance: Stay Sharp", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "7 min read", "type": "article"},
    {"file": "breathing-techniques-mental-energy.html", "title": "Breathing Techniques for Mental Energy: Complete Guide", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "10 min read", "type": "guide"},
    {"file": "circadian-energy-patterns.html", "title": "Understanding Your Natural Energy Patterns: Circadian and Ultradian Rhythms", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "11 min read", "type": "article"},
    {"file": "mental-vs-physical-fatigue.html", "title": "Mental Fatigue vs Physical Fatigue: Understanding the Difference", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "10 min read", "type": "article"},
    {"file": "energy-draining-habits.html", "title": "Energy-Draining Habits to Eliminate: Breaking Free from Energy Vampires", "category": "Brain Health", "subcategory": "Mental Energy", "readTime": "10 min read", "type": "article"},
    
    # Productivity Cluster (5 articles)
    {"file": "time-management-strategies.html", "title": "Time Management Strategies That Actually Work", "category": "Productivity & Self-Improvement", "subcategory": "Productivity", "readTime": "12 min read", "type": "guide"},
    {"file": "building-habits-framework.html", "title": "Building Habits That Stick: A Science-Based Framework", "category": "Productivity & Self-Improvement", "subcategory": "Habits", "readTime": "14 min read", "type": "guide"},
    
    # Focus & Concentration Cluster (3 articles)
    {"file": "mindfulness-better-focus.html", "title": "Mindfulness for Better Focus and Concentration", "category": "Focus & Concentration", "subcategory": "Mindfulness", "readTime": "10 min read", "type": "article"},
    {"file": "deep-work-focus-guide.html", "title": "Deep Work: The Complete Focus Guide", "category": "Focus & Concentration", "subcategory": "Deep Work", "readTime": "15 min read", "type": "guide"},
    
    # Sleep Cluster (1 article)
    {"file": "sleep-cognitive-performance.html", "title": "Sleep and Cognitive Performance: The Critical Link", "category": "Brain Health", "subcategory": "Sleep", "readTime": "11 min read", "type": "article"},
]

# Generate JSON data
start_date = datetime(2026, 6, 2)
output = {"articles": []}

for idx, article in enumerate(articles):
    slug = article["file"].replace(".html", "")
    date = start_date - timedelta(days=idx)
    
    output["articles"].append({
        "id": idx + 1,
        "title": article["title"],
        "excerpt": f"A comprehensive guide to {article['title'].lower()} with practical strategies and science-backed insights.",
        "category": article["category"],
        "subcategory": article["subcategory"],
        "type": article["type"],
        "readTime": article["readTime"],
        "date": date.strftime("%Y-%m-%d"),
        "slug": slug,
        "url": f"articles/{article['file']}"
    })

print(f"Generated {len(output['articles'])} article mappings")
print("\nFirst 3 articles:")
for art in output['articles'][:3]:
    print(f"  - {art['title']} ({art['slug']})")
