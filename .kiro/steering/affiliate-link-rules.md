# Affiliate Link Rules

## Rule: Always use rel="nofollow sponsored" on affiliate/hop links

Every outgoing affiliate link (ClickBank hop links, any paid/commission link) MUST include both attributes:

```html
rel="nofollow sponsored"
```

### Full required format:
```html
<a href="https://your-hop-link.hop.clickbank.net" target="_blank" rel="nofollow sponsored">
    Link Text
</a>
```

### Why this is required:
- Google and Bing require `rel="sponsored"` to identify paid/affiliate links
- `rel="nofollow"` prevents passing PageRank to affiliate domains
- Without these attributes, the site can receive unnatural link penalties
- Protects `mindperformancehub.com` domain authority

### Applies to:
- All ClickBank hop links (current: `https://85bd0ji-yf5zdzd-21ke4d0eyz.hop.clickbank.net`)
- Any future affiliate links added to the site
- Links in: landing pages, bridge pages, thank-you pages, articles, PDF guides

### Never use:
```html
<!-- WRONG - missing rel attributes -->
<a href="https://hop-link.clickbank.net" target="_blank">

<!-- WRONG - only nofollow, missing sponsored -->
<a href="https://hop-link.clickbank.net" target="_blank" rel="nofollow">
```
