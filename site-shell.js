(function () {
  var script = document.currentScript;
  if (!script) return;
  var page = script.getAttribute('data-page');
  if (window.top !== window) {
    function reportPage() { parent.postMessage({type:'abalonet-content-page', page:page}, '*'); }
    window.addEventListener('message', function (event) {
      if (event.source === parent && event.data && event.data.type === 'abalonet-content-request') reportPage();
    });
    reportPage();
    return;
  }
  var shell = script.getAttribute('data-shell');
  if (!page || !shell) return;
  var destination = new URL(shell, window.location.href);
  destination.searchParams.set('page', page);
  var sub = script.getAttribute('data-sub');
  if (!sub) sub = new URLSearchParams(window.location.search).get('sub');
  if (sub) destination.searchParams.set('sub', sub);
  destination.hash = window.location.hash;
  window.location.replace(destination.href);
}());
