import re

# Count articles from all_162_articles_data.py
with open('all_162_articles_data.py', 'r', encoding='utf-8') as f:
    python_content = f.read()
    
python_articles = re.findall(r"'filename':\s*'([^']+)'", python_content)

print(f"Articles in all_162_articles_data.py: {len(python_articles)}")
print("\nFirst 10 articles from Python file:")
for i, article in enumerate(python_articles[:10], 1):
    print(f"  {i}. {article}")

# Based on your pasted Excel data, count the categories
excel_data = """
Brain Health - Memory: 25 articles
Brain Health - Mental Energy: 20 articles  
Brain Health - Sleep: 15 articles
Brain Health - Learning: 20 articles
Brain Health - Cognitive Performance: 15 articles
Focus & Concentration - Focus Habits: 15 articles
Focus & Concentration - Deep Work: 15 articles
Focus & Concentration - Attention Training: 10 articles
Focus & Concentration - Distraction Management: 10 articles
Productivity & Self-Improvement - Time Management: 20 articles
Productivity & Self-Improvement - Goal Setting: 10 articles
Productivity & Self-Improvement - Habit Building: 20 articles
Productivity & Self-Improvement - Personal Performance: 10 articles
"""

# Extract numbers and sum
numbers = re.findall(r': (\d+) articles', excel_data)
total_excel = sum(int(n) for n in numbers)

print(f"\n\nTotal articles in your Excel (based on pasted data): {total_excel}")
print(f"\nBreakdown by category from Excel:")
print("- Brain Health Memory: 25")
print("- Brain Health Mental Energy: 20")
print("- Brain Health Sleep: 15")
print("- Brain Health Learning: 20")
print("- Brain Health Cognitive Performance: 15")
print("- Focus & Concentration Focus Habits: 15")
print("- Focus & Concentration Deep Work: 15")
print("- Focus & Concentration Attention Training: 10")
print("- Focus & Concentration Distraction Management: 10")
print("- Productivity Time Management: 20")
print("- Productivity Goal Setting: 10")
print("- Productivity Habit Building: 20")
print("- Productivity Personal Performance: 10")
print(f"\nTotal: {total_excel}")

print(f"\n{'='*60}")
print(f"COMPARISON:")
print(f"Excel file: {total_excel} articles")
print(f"Python file: {len(python_articles)} articles")
print(f"Match: {'YES ✅' if total_excel == len(python_articles) else 'NO ❌'}")
