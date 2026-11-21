(function () {
  var STORAGE_KEY = 'minhhy-profile-theme-v3';
  var DEFAULT_THEME = 'crimson';

  var STACK = [
    { name: 'Go', logo: 'go' },
    { name: 'TypeScript', logo: 'typescript' },
    { name: 'Node.js', logo: 'nodedotjs' },
    { name: 'Python', logo: 'python' },
    { name: 'PostgreSQL', logo: 'postgresql' },
    { name: 'Redis', logo: 'redis' },
    { name: 'Docker', logo: 'docker' },
    { name: 'Linux', logo: 'linux' },
  ];

  function renderStackBadges(containerId, bgHex, logoHex) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = STACK.map(function (item) {
      var url =
        'https://img.shields.io/badge/' +
        encodeURIComponent(item.name) +
        '-' +
        bgHex +
        '?style=for-the-badge&logo=' +
        item.logo +
        '&logoColor=' +
        logoHex;
      return '<img src="' + url + '" alt="' + item.name + '" />';
    }).join('');
  }

  function setTheme(themeKey) {
    var key = themeKey === 'monochrome' ? 'monochrome' : DEFAULT_THEME;
    document.documentElement.setAttribute('data-theme', key);

    var toggleLabel = document.getElementById('toggle-label');
    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleLabel) {
      toggleLabel.textContent = key === 'crimson' ? 'monochrome' : 'crimson';
    }
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', String(key === 'monochrome'));
    }

    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch (_) {
      // Ignore storage access restrictions
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'crimson' ? 'monochrome' : 'crimson');
  }

  function init() {
    // Pre-mount both badge layers once so switching crossfades instantaneously with zero flicker
    renderStackBadges('stack-crimson', '140A0F', 'FF1E42');
    renderStackBadges('stack-mono', '09090B', 'FFFFFF');

    var initial = DEFAULT_THEME;
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'crimson' || stored === 'monochrome') {
        initial = stored;
      }
    } catch (_) {
      initial = DEFAULT_THEME;
    }

    setTheme(initial);

    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }

    // Convenient keyboard shortcut: press "T" to crossfade themes
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
