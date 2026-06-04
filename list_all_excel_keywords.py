import pandas as pd

# Read the Excel file
excel_file = 'MindPerformanceHub_Editorialized_Master_Database_v2.xlsx'
df = pd.read_excel(excel_file)

print("="*80)
print("ALL KEYWORDS IN EXCEL FILE")
print("="*80)
print(f"\nTotal articles in Excel: {len(df)}\n")

# Print all keywords grouped by category
if 'Category' in df.columns and 'Primary Keyword' in df.columns:
    categories = df['Category'].unique()
    
    for category in categories:
        if pd.notna(category):
            cat_articles = df[df['Category'] == category]
            print(f"\n{'='*80}")
            print(f"{category.upper()} ({len(cat_articles)} articles)")
            print("="*80)
            
            for idx, row in cat_articles.iterrows():
                keyword = row['Primary Keyword']
                cluster = row['Cluster'] if 'Cluster' in df.columns else 'N/A'
                if pd.notna(keyword):
                    print(f"  • {keyword} (Cluster: {cluster})")
