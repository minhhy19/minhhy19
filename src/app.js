(function () {
  var STORAGE_KEY = 'minhhy-profile-theme';

  var THEMES = {
    monochrome: {
      label: 'Monochrome · B&W',
      hint: 'Switch to Red & Black',
      hero: './assets/hero.svg',
      linkedin: './assets/btn-linkedin.svg',
      email: './assets/btn-email.svg',
      divider: './assets/divider.svg',
      bento: './assets/bento.svg',
      badgeBg: '09090B',
      badgeLogo: 'FFFFFF',
    },
    crimson: {
      label: 'Crimson · Red & Black',
      hint: 'Switch to Black & White',
      hero: './assets/hero-crimson.svg',
      linkedin: './assets/btn-linkedin-crimson.svg',
      email: './assets/btn-email-crimson.svg',
      divider: './assets/divider-crimson.svg',
      bento: './assets/bento-crimson.svg',
      badgeBg: '140A0F',
      badgeLogo: 'FF1E42',
    },
  };

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

  function applyTheme(themeKey) {
    var key = THEMES[themeKey] ? themeKey : 'monochrome';
    var cfg = THEMES[key];

    document.documentElement.setAttribute('data-theme', key);

    var heroImg = document.getElementById('img-hero');
    var liImg = document.getElementById('img-linkedin');
    var emImg = document.getElementById('img-email');
    var divImg = document.getElementById('img-divider');
    var bentoImg = document.getElementById('img-bento');
    var toggleBtn = document.getElementById('theme-toggle');
    var toggleLabel = document.getElementById('toggle-label');
    var toggleHint = document.getElementById('toggle-hint');
    var stackRow = document.getElementById('tech-stack');

    if (heroImg) heroImg.src = cfg.hero;
    if (liImg) liImg.src = cfg.linkedin;
    if (emImg) emImg.src = cfg.email;
    if (divImg) divImg.src = cfg.divider;
    if (bentoImg) bentoImg.src = cfg.bento;
    if (toggleLabel) toggleLabel.textContent = cfg.label;
    if (toggleHint) toggleHint.textContent = cfg.hint;
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', String(key === 'crimson'));

    if (stackRow) {
      stackRow.innerHTML = STACK.map(function (item) {
        var url =
          'https://img.shields.io/badge/' +
          encodeURIComponent(item.name) +
          '-' +
          cfg.badgeBg +
          '?style=for-the-badge&logo=' +
          item.logo +
          '&logoColor=' +
          cfg.badgeLogo;
        return '<img src="' + url + '" alt="' + item.name + '" />';
      }).join('');
    }

    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch (_) {
      // Ignore storage access restrictions in private/file contexts
    }
  }

  function init() {
    // Always default to monochrome (Black & White) unless user explicitly saved crimson
    var saved = 'monochrome';
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'crimson' || stored === 'monochrome') {
        saved = stored;
      }
    } catch (_) {
      saved = 'monochrome';
    }

    applyTheme(saved);

    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'crimson' ? 'monochrome' : 'crimson');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
