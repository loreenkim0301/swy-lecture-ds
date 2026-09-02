/*!
 * swy-lecture-ds — behavior layer (no dependencies)
 * data-sw-* 속성으로 동작. 여러 개 붙여도 서로 충돌하지 않도록 설계.
 */
(function () {
  'use strict';

  /* ---------- 복사 버튼: data-sw-copy 를 가진 버튼이 자신의 다음 형제 텍스트를 복사 ---------- */
  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    cb(ok);
  }

  function bindCopyButtons(root) {
    root.querySelectorAll('[data-sw-copy]').forEach(function (btn) {
      if (btn.__swBound) return;
      btn.__swBound = true;
      btn.addEventListener('click', function () {
        var targetSel = btn.getAttribute('data-sw-copy');
        var box = targetSel ? document.querySelector(targetSel) : btn.nextElementSibling;
        if (!box) return;
        var text = box.innerText || box.textContent;
        var orig = btn.textContent;
        function done(ok) {
          btn.textContent = ok ? '복사됨' : '복사 실패';
          setTimeout(function () { btn.textContent = orig; }, 1500);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text, done); });
        } else {
          fallbackCopy(text, done);
        }
      });
    });
  }

  /* ---------- 전체화면 모달: data-sw-modal-open="#id" / data-sw-modal-close ---------- */
  function bindModals(root) {
    root.querySelectorAll('[data-sw-modal-open]').forEach(function (openBtn) {
      if (openBtn.__swBound) return;
      openBtn.__swBound = true;
      var modal = document.querySelector(openBtn.getAttribute('data-sw-modal-open'));
      if (!modal) return;
      function open() { modal.hidden = false; document.body.style.overflow = 'hidden'; }
      function close() { modal.hidden = true; document.body.style.overflow = ''; }
      openBtn.addEventListener('click', open);
      modal.querySelectorAll('[data-sw-modal-close]').forEach(function (c) { c.addEventListener('click', close); });
      modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
    });
  }

  /* ---------- 사이드바 스크롤스파이: .sw-sidebar nav a[href^="#"] ---------- */
  function bindScrollSpy(scope) {
    var links = Array.prototype.slice.call(scope.querySelectorAll('.sw-sidebar nav a[href^="#"]'));
    var items = links.map(function (link) {
      var id = decodeURIComponent(link.getAttribute('href').slice(1));
      var target = document.getElementById(id);
      return target ? { link: link, target: target } : null;
    }).filter(Boolean);
    if (!items.length) return;

    function setActive(activeLink) {
      links.forEach(function (l) { l.classList.remove('sw-active', 'sw-active-parent'); });
      if (!activeLink) return;
      activeLink.classList.add('sw-active');
      var li = activeLink.closest('li');
      while (li) {
        var parentLi = li.parentElement && li.parentElement.closest('li');
        if (parentLi) {
          var parentLink = parentLi.querySelector(':scope > a');
          if (parentLink) parentLink.classList.add('sw-active-parent');
        }
        li = parentLi;
      }
    }

    function updateActive() {
      var triggerY = window.scrollY + 110;
      var current = items[0];
      for (var i = 0; i < items.length; i++) {
        if (items[i].target.getBoundingClientRect().top + window.scrollY <= triggerY) {
          current = items[i];
        } else {
          break;
        }
      }
      setActive(current.link);
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { updateActive(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', updateActive);
    updateActive();
  }

  /* ---------- 모바일/태블릿 사이드바: nav 링크 클릭 시 자동 닫기 ---------- */
  function bindSidebarAutoClose(scope) {
    var toggle = scope.querySelector('.sw-sidebar-toggle-input');
    if (!toggle) return;
    scope.querySelectorAll('.sw-sidebar nav a').forEach(function (a) {
      a.addEventListener('click', function () { toggle.checked = false; });
    });
  }

  function init() {
    document.querySelectorAll('.sw-scope').forEach(function (scope) {
      bindCopyButtons(scope);
      bindModals(scope);
      bindScrollSpy(scope);
      bindSidebarAutoClose(scope);
    });
    // 모달은 .sw-scope 바깥(body 최상위)에 둘 수도 있으므로 document 전체도 한 번 더 바인딩
    bindCopyButtons(document);
    bindModals(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
