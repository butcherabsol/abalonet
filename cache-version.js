(function () {
  var version = 'ko-utf8-43fc443';
  function versionGameLink(event) {
    var link = event.target && event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var target;
    try { target = new URL(link.href, location.href); } catch (e) { return; }
    if (target.origin !== location.origin || !/\/(dispel|dispel_multi)\/.*\.htm$/i.test(target.pathname)) return;
    target.searchParams.set('v', version);
    link.href = target.href;
  }
  ['pointerdown', 'contextmenu', 'click', 'auxclick'].forEach(function (event) {
    document.addEventListener(event, versionGameLink, true);
  });
}());
