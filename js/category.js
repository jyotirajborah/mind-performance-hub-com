document.addEventListener('DOMContentLoaded', function() {

    const articles = window.MPH_CONTENT ? window.MPH_CONTENT.articles : [];
    const pageTitle = document.querySelector('.category-hero h1')?.textContent || '';

    // ── 1. Determine current category ──────────────────────────────────────
    let currentCategory = '';
    if (pageTitle.includes('Brain Health'))      currentCategory = 'Brain Health';
    else if (pageTitle.includes('Focus'))        currentCategory = 'Focus & Concentration';
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

    // ── 3. Subcategory heading → subcategory value map ─────────────────────
    const subMap = {
        'Memory':                  'Memory',
        'Mental Energy':           'Mental Energy',
        'Sleep':                   'Sleep',
        'Learning & Cognitive':    'Learning',
        'Brain Optimization':      'Brain Optimization',
        'Focus Habits':            'Focus Habits',
        'Deep Work':               'Deep Work',
        'Attention Training':      'Attention Training',
        'Study':                   'Study Techniques',
        'Distraction':             'Distraction Management',
        'Habit Building':          'Habit Building',
        'Time Management':         'Time Management',
        'Goal Setting':            'Goal Setting',
        'Learning & Skill':        'Skill Development',
        'Personal Performance':    'Personal Performance'
    };

    // ── 4. Populate subcategory cards ──────────────────────────────────────
    document.querySelectorAll('.subcategory-card').forEach(card => {
        const heading = card.querySelector('h3')?.textContent.trim() || '';

        let subcatValue = null;
        for (const [key, val] of Object.entries(subMap)) {
            if (heading.includes(key)) { subcatValue = val; break; }
        }

        // Remove any existing static list
        card.querySelectorAll('ul, ol, .see-all-link').forEach(el => el.remove());

        if (!subcatValue) return;

        const all = articles.filter(a =>
            a.category === currentCategory &&
            a.subcategory === subcatValue
        );

        if (all.length === 0) return;

        // Sort: pillar first, then rest
        all.sort((a, b) => (b.pillar ? 1 : 0) - (a.pillar ? 1 : 0));

        const pillar   = all.filter(a => a.pillar);
        const featured = all.filter(a => !a.pillar).slice(0, 3);
        const rest     = all.filter(a => !a.pillar).slice(3);

        const ul = document.createElement('ul');
        ul.style.cssText = 'list-style:none;padding:0;margin:12px 0 0;';

        // Render pillar
        pillar.forEach(a => {
            ul.appendChild(makeItem(a, true));
        });

        // Render featured (always visible)
        featured.forEach(a => {
            ul.appendChild(makeItem(a, false));
        });

        // Render rest (hidden, shown on expand)
        if (rest.length > 0) {
            const restWrap = document.createElement('div');
            restWrap.style.cssText = 'display:none;';
            restWrap.className = 'rest-articles';
            rest.forEach(a => restWrap.appendChild(makeItem(a, false)));
            ul.appendChild(restWrap);

            // "See all X articles" toggle
            const toggle = document.createElement('li');
            toggle.style.cssText = 'margin-top:8px;padding-left:0;font-size:0.82rem;';
            toggle.innerHTML = '<a href="#" style="color:#2563eb;text-decoration:none" class="see-all-toggle">+ See all ' + all.length + ' articles</a>';
            toggle.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                const isOpen = restWrap.style.display === 'block';
                restWrap.style.display = isOpen ? 'none' : 'block';
                this.textContent = isOpen ? '+ See all ' + all.length + ' articles' : '− Show less';
            });
            ul.appendChild(toggle);
        }

        card.appendChild(ul);
    });
});

function makeItem(a, isPillar) {
    const li = document.createElement('li');
    li.style.cssText = 'margin-bottom:5px;padding-left:16px;position:relative;font-size:0.88rem;';
    if (isPillar) {
        li.style.cssText += 'background:#fffbeb;border-radius:6px;padding:6px 8px 6px 22px;margin-bottom:8px;';
    }
    li.innerHTML =
        '<span style="position:absolute;left:' + (isPillar ? '6px' : '0') + ';top:' + (isPillar ? '7px' : '0') + ';color:' + (isPillar ? '#f59e0b' : '#2563eb') + ';font-weight:700;font-size:' + (isPillar ? '0.9rem' : '0.8rem') + '">' + (isPillar ? '★' : '→') + '</span>' +
        '<a href="articles/' + a.slug + '.html" style="color:#1e3a8a;text-decoration:none;line-height:1.4;' + (isPillar ? 'font-weight:700;' : '') + '">' + a.title + '</a>' +
        (isPillar ? ' <span style="font-size:0.68rem;background:#fef3c7;color:#92400e;padding:1px 5px;border-radius:8px;margin-left:4px;vertical-align:middle">Start Here</span>' : '');
    return li;
}
