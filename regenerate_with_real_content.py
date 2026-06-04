import os
from datetime import datetime, timedelta
from all_162_articles_data import ARTICLES

def create_article_html(data):
    """Generate article HTML from data dictionary"""
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{data['meta_description']}">
    <meta name="keywords" content="{data['keywords']}">
    <meta property="og:title" content="{data['real_seo_title']}">
    <meta property="og:description" content="{data['meta_description']}">
    <meta property="og:type" content="article">
    <title>{data['real_seo_title']} | Mind Performance Hub</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/article.css">
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{data['title']}",
        "description": "{data['meta_description']}",
        "author": {{
            "@type": "Organization",
            "name": "Mind Performance Hub"
        }},
        "datePublished": "{data['date']}",
        "dateModified": "{data['date']}"
    }}
    </script>
</head>
<body>
    <header class="header">
        <nav class="nav container">
            <a href="../index.html" class="logo">Mind Performance Hub</a>
            <button class="nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-menu">
