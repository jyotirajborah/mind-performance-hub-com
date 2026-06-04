import pandas as pd

# Read the Excel file
excel_file = 'MindPerformanceHub_Editorialized_Master_Database.csv'
df = pd.read_csv(excel_file)

print("="*80)
print("AFFILIATE OFFERS ANALYSIS")
print("="*80)

if 'Affiliate Offer' in df.columns:
    # Get all non-empty affiliate offers
    affiliate_offers = df['Affiliate Offer'].dropna()
    
    # Get unique affiliate offers
    unique_offers = affiliate_offers.unique()
    
    print(f"\nTotal articles in Excel: {len(df)}")
    print(f"Articles with affiliate offers: {len(affiliate_offers)}")
    print(f"Unique affiliate offers: {len(unique_offers)}")
    
    print("\n" + "="*80)
    print("LIST OF UNIQUE AFFILIATE OFFERS")
    print("="*80)
    
    for i, offer in enumerate(sorted(unique_offers), 1):
        # Count how many articles use this offer
        count = len(df[df['Affiliate Offer'] == offer])
        print(f"\n{i}. {offer}")
        print(f"   Used in: {count} articles")
    
    # Show breakdown by category
    print("\n" + "="*80)
    print("AFFILIATE OFFERS BY CATEGORY")
    print("="*80)
    
    if 'Category' in df.columns:
        for category in df['Category'].unique():
            if pd.notna(category):
                cat_df = df[df['Category'] == category]
                cat_offers = cat_df['Affiliate Offer'].dropna()
                print(f"\n{category}: {len(cat_offers)} articles with offers")
                
                # Show unique offers in this category
                unique_cat_offers = cat_offers.unique()
                for offer in unique_cat_offers:
                    count = len(cat_df[cat_df['Affiliate Offer'] == offer])
                    print(f"  • {offer}: {count} articles")
else:
    print("\n'Affiliate Offer' column not found in Excel file")
    print("\nAvailable columns:")
    for col in df.columns:
        print(f"  - {col}")
