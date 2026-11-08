(function () {
  var file = location.pathname.split('/').pop();
  var section = file === 'dispel.htm' ? 'dispel' : file === 'dispel_multi.htm' ? 'dispel_multi' : null;
  function safeSub(value) {
    return /^\.\.\/dispel(?:_multi)?\/(?:[A-Za-z0-9_% -]+\/)*[A-Za-z0-9_% -]+\.htm$/i.test(value || '');
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (section && document.querySelector('frameset')) {
      var content = document.querySelector('frame[name="contents"]');
      var sub = new URLSearchParams(location.search).get('sub');
      if (content && safeSub(sub)) content.src = sub;
      var currentSub = safeSub(sub) ? sub : '';
      function report(value) {
        currentSub = value || '';
        parent.postMessage({type:'abalonet-game-state', page:section+'/'+file, sub:currentSub}, '*');
      }
      window.addEventListener('message', function (event) {
        if (content && event.source === content.contentWindow && event.data && event.data.type === 'abalonet-game-content' && safeSub(event.data.sub)) report(event.data.sub);
        else if (event.source === parent && event.data && event.data.type === 'abalonet-game-state-request') report(currentSub);
      });
      report(safeSub(sub) ? sub : '');
    } else {
      var match = location.pathname.match(/\/(dispel(?:_multi)?)\/(.+\.htm)$/i);
      if (match) {
        var path = '../' + match[1] + '/' + match[2];
        if (safeSub(path)) parent.postMessage({type:'abalonet-game-content', sub:path}, '*');
      }
    }
  });
}());
