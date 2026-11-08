(function () {
  var version = 'ko-utf8-71f73ce';
  function versionGameLink(event) {
    var link = event.target && event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var target;
    try { target = new URL(link.href, location.href); } catch (e) { return; }
    if (target.origin !== location.origin || !/\/(dispel|dispel_multi)\/.*\.htm$/i.test(target.pathname)) return;
    var original = link.getAttribute('href');
    if (!original || original.charAt(0) === '#') return;
    target.searchParams.set('v', version);
    var path = /^[a-z][a-z0-9+.-]*:|^\/\//i.test(original) ? target.pathname : original.split(/[?#]/, 1)[0];
    link.setAttribute('href', path + target.search + target.hash);
  }
  ['pointerdown', 'contextmenu', 'click', 'auxclick'].forEach(function (event) {
    document.addEventListener(event, versionGameLink, true);
  });
}());
