/**
 * ============================================================
 * Mark Institute of Technology — Centralized Navigation Bar
 * ============================================================
 * Automatically resolves paths across all folder levels:
 * - public/ (home, about, programs, faculty, admissions, events, contact)
 * - student/ (login, portal, lessons, playground, quiz)
 * - admin/ (admin-login, admin-portal)
 * - root / (index.html)
 * ============================================================
 */
const NAV_CONFIG = {
  brandName: "Mark Institute of Technology",
  brandHref: "home.html",
  links: [
    { label: "Home", href: "home.html" },
    { label: "About", href: "about.html" },
    { label: "Programs", href: "programs.html" },
    { label: "Faculty", href: "faculty.html" },
    { label: "Admissions", href: "admissions.html" },
    { label: "Events", href: "events.html" },
    { label: "Contact", href: "contact.html" },
    { label: "Login", href: "student/login.html" }
  ]
};

(function() {
  const path = window.location.pathname.replace(/\\/g, '/');
  const isPublic = path.includes('/public/');
  const isStudent = path.includes('/student/');
  const isAdmin = path.includes('/admin/');

  // 1. Generate and mount the centralized navbar
  function renderNavbar() {
    const topbars = document.querySelectorAll('.topbar, #topbar');
    if (!topbars.length) return;

    let currentFile = path.split('/').pop().toLowerCase();
    if (!currentFile || currentFile === 'index.html') {
      currentFile = 'home.html';
    }

    // Resolve Brand link
    let brandUrl;
    if (isPublic) {
      brandUrl = 'home.html';
    } else if (isStudent || isAdmin) {
      brandUrl = '../public/home.html';
    } else {
      brandUrl = 'public/home.html';
    }

    const linksHtml = NAV_CONFIG.links.map(link => {
      let targetHref;
      const isLoginLink = (link.label.toLowerCase() === 'login');

      if (isLoginLink) {
        if (isStudent) {
          targetHref = 'login.html';
        } else if (isPublic || isAdmin) {
          targetHref = '../student/login.html';
        } else {
          targetHref = 'student/login.html';
        }
      } else {
        // Public pages (home, about, programs, etc.)
        if (isPublic) {
          targetHref = link.href;
        } else if (isStudent || isAdmin) {
          targetHref = '../public/' + link.href;
        } else {
          targetHref = 'public/' + link.href;
        }
      }

      const targetFile = link.href.split('/').pop().toLowerCase();
      const isActive = (currentFile === targetFile);
      return `<a href="${targetHref}"${isActive ? ' class="active"' : ''}>${link.label}</a>`;
    }).join('\n    ');

    const content = `
  <a href="${brandUrl}" class="brand">
    <div class="brand-mark"></div>
    <div class="brand-name">${NAV_CONFIG.brandName}</div>
  </a>
  <nav>
    ${linksHtml}
  </nav>`;

    topbars.forEach(bar => {
      bar.innerHTML = content;
    });
  }

  // Render immediately if .topbar already exists in DOM, or wait for DOMContentLoaded
  if (document.querySelector('.topbar, #topbar')) {
    renderNavbar();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }

  // Global helper
  window.CentralNav = {
    config: NAV_CONFIG,
    render: renderNavbar
  };
})();
