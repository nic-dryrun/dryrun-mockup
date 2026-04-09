(function() {
  var KEY = 'dryrun_auth';
  var PASS = 'dryrun';
  if (sessionStorage.getItem(KEY) === 'true') return;

  // Hide page content
  document.documentElement.style.visibility = 'hidden';

  document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.style.visibility = 'hidden';

    var overlay = document.createElement('div');
    overlay.id = 'auth-gate';
    overlay.innerHTML = '<div style="position:fixed;inset:0;z-index:99999;background:#f6f8fa;display:flex;align-items:center;justify-content:center;font-family:Inter,-apple-system,sans-serif;">' +
      '<div style="background:#fff;border:1px solid #d0d7de;border-radius:12px;padding:36px 32px;max-width:380px;width:100%;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.08);">' +
        '<div style="width:48px;height:48px;border-radius:50%;background:#f0eeff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">' +
          '<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M16 2L4 9v14l12 7 12-7V9L16 2z" stroke="#7c6ef0" stroke-width="1.5" fill="none"/><path d="M13 16l2 2 4-4" stroke="#7c6ef0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</div>' +
        '<div style="font-size:18px;font-weight:700;color:#1a1d23;margin-bottom:4px;">DryRun Security</div>' +
        '<div style="font-size:13px;color:#8b919e;margin-bottom:20px;">Enter password to view mockups</div>' +
        '<input id="gate-pw" type="password" placeholder="Password" autofocus style="width:100%;padding:10px 14px;border:1px solid #d0d7de;border-radius:8px;font-size:14px;font-family:inherit;margin-bottom:12px;outline:none;text-align:center;" />' +
        '<button id="gate-btn" style="width:100%;padding:10px;border:none;border-radius:8px;background:#7c6ef0;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">Enter</button>' +
        '<div id="gate-err" style="font-size:12px;color:#cf222e;margin-top:10px;display:none;">Incorrect password</div>' +
      '</div>' +
    '</div>';

    document.body.appendChild(overlay);

    function tryAuth() {
      var pw = document.getElementById('gate-pw').value;
      if (pw === PASS) {
        sessionStorage.setItem(KEY, 'true');
        overlay.remove();
        document.documentElement.style.visibility = 'visible';
      } else {
        document.getElementById('gate-err').style.display = 'block';
        document.getElementById('gate-pw').value = '';
        document.getElementById('gate-pw').focus();
      }
    }

    document.getElementById('gate-btn').addEventListener('click', tryAuth);
    document.getElementById('gate-pw').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') tryAuth();
    });
  });
})();
