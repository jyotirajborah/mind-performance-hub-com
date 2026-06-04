import pandas as pd

# Read the Excel file
excel_file = '[final] MindPerformanceHub_Editorialized_Master_Database_v2.xlsx'
df = pd.read_excel(excel_file)

print("="*80)
print("EXCEL FILE ANALYSIS")
print("="*80)
print(f"\nTotal articles in Excel: {len(df)}")

# Get all primary keywords
if 'Primary Keyword' in df.columns:
    keywords = df['Primary Keyword'].dropna().tolist()
    print(f"\nTotal keywords: {len(keywords)}")
    
    print("\n" + "="*80)
    print("ALL PRIMARY KEYWORDS IN EXCEL")
    print("="*80)
    
    for i, keyword in enumerate(keywords, 1):
        # Get the article title for this row
        article_title = df.iloc[i-1]['Article Title'] if 'Article Title' in df.columns else 'N/A'
        category = df.iloc[i-1]['Category'] if 'Category' in df.columns else 'N/A'
        cluster = df.iloc[i-1]['Cluster'] if 'Cluster' in df.columns else 'N/A'
        
        print(f"\n{i}. {keyword}")
        print(f"   Title: {article_title}")
        print(f"   Category: {category} > {cluster}")

# Check for the specific articles mentioned by user
print("\n\n" + "="*80)
print("CHECKING SPECIFIC ARTICLES")
print("="*80)

search_terms = [
    "active recall",
    "deep work",
    "caffeine",
    "dopamine",
    "mental energy",
    "brain fog",
    "sleep deprivation",
    "mnemonic",
    "habits"
]

for term in search_terms:
    matches = df[df['Primary Keyword'].str.contains(term, case=False, na=False)]
    print(f"\n'{term}' found in {len(matches)} rows:")
    if len(matches) > 0:
        for idx, row in matches.iterrows():
            print(f"  - {row['Primary Keyword']} (Article: {row['Article Title']})")
