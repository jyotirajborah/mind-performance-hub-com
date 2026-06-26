document.addEventListener('DOMContentLoaded', function() {

    const articles = window.MPH_CONTENT ? window.MPH_CONTENT.articles : [];
    const pageTitle = document.querySelector('.category-hero h1')?.textContent || '';

    // ── 1. Determine current category ──────────────────────────────────────
    let currentCategory = '';
    if (pageTitle.includes('Brain Health'))   currentCategory = 'Brain Health';
    else if (pageTitle.includes('Focus'))     currentCategory = 'Focus & Concentration';
    else if (pageTitle.includes('Productivity')) currentCategory = 'Productivity';

    // ── 2. Populate "Latest Articles" grid ─────────────────────────────────
    const grid = document.getElementById('category-articles');
    if (grid && currentCategory) {
        const filtered = articles.filter(a => a.category === currentCategory);
        if (filtered.length > 0) {
            grid.innerHTML = filtered.map(a => renderArticleCard(a)).join('');
        } else {
            grid.innerHTML = '<p style="text-align:center;color:#6b7280">No articles available yet. Check back soon!</p>';
        }
    }

    // ── 3. Populate subcategory cards ───────────────────────────────────────
    // Map: card h3 text (partial) → subcategory value in content-data.js
    const subMap = {
        // Brain Health
        'Memory':                      'Memory',
        'Mental Energy':               'Mental Energy',
        'Sleep':                       'Sleep',
        'Learning & Cognitive':        'Learning',
        'Brain Optimization':          'Brain Optimization',
        // Focus & Concentration
        'Focus Habits':                'Focus Habits',
        'Deep Work':                   'Deep Work',
        'Attention Training':          'Attention Training',
        'Study':                       'Study Techniques',
        'Distraction':                 'Distraction Management',
        // Productivity & Self-Improvement
        'Habit Building':              'Habit Building',
        'Time Management':             'Time Management',
        'Goal Setting':                'Goal Setting',
        'Learning & Skill':            'Skill Development',
        'Personal Performance':        'Personal Performance'
    };

    document.querySelectorAll('.subcategory-card').forEach(card => {
        const heading = card.querySelector('h3')?.textContent.trim() || '';

        // Find matching subcategory key
        let subcatValue = null;
        for (const [key, val] of Object.entries(subMap)) {
            if (heading.includes(key)) { subcatValue = val; break; }
        }

        // Remove any existing list (static HTML or previous JS run)
        card.querySelectorAll('ul, ol').forEach(el => el.remove());

        if (!subcatValue) return;

        const matched = articles.filter(a =>
            a.category === currentCategory &&
            a.subcategory === subcatValue
        );

        if (matched.length === 0) return;

        // Sort: pillar first, then supporting
        matched.sort((a, b) => (b.pillar ? 1 : 0) - (a.pillar ? 1 : 0));

        const ul = document.createElement('ul');
        ul.style.cssText = 'list-style:none;padding:0;margin:10px 0 0;';

        matched.forEach(a => {
            const li = document.createElement('li');
            li.style.cssText = 'margin-bottom:5px;padding-left:14px;position:relative;font-size:0.88rem;';
            const isPillar = a.pillar === true;
            li.innerHTML =
                '<span style="position:absolute;left:0;color:' + (isPillar ? '#f59e0b' : '#2563eb') + ';font-weight:700">' + (isPillar ? '★' : '→') + '</span>' +
                '<a href="articles/' + a.slug + '.html" style="color:#2563eb;text-decoration:none;line-height:1.4;' + (isPillar ? 'font-weight:700' : '') + '">' +
                a.title + '</a>' +
                (isPillar ? ' <span style="font-size:0.7rem;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:10px;margin-left:4px">Pillar</span>' : '');
            ul.appendChild(li);
        });

        card.appendChild(ul);
    });
});
