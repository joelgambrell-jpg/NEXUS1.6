<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />

<link rel="stylesheet" href="nexus-core.css" />
<link rel="stylesheet" href="nexus-core.print.css" media="print" />

<title data-i18n="redirect.title">Redirecting…</title>

<style>
/* ===== NEXUS Shared Header ===== */
.nx-header-wrap{
  background: rgba(0,0,0,0.35);
  border-bottom: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(8px);
}
.nx-header{
  max-width: 1100px;
  margin: 0 auto;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.nx-header img{
  height: 54px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
}
.nx-lang-toggle{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 12px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.18);
  background:rgba(10,15,36,0.82);
  color:#fff;
  font-weight:800;
  font-size:12px;
  line-height:1;
  cursor:pointer;
  user-select:none;
  white-space:nowrap;
}
.nx-lang-toggle:hover{
  background:rgba(18,25,54,0.92);
}
</style>

<style>
.nx-footer{
  margin-top: 40px;
  padding: 18px 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  background: rgba(0,0,0,0.35);
  border-top: 1px solid rgba(255,255,255,0.18);
}
</style>

<link rel="stylesheet" href="assets/css/nexus-core.css">
</head>

<body>
<div class="nexus-page">

<div id="nxSessionBanner" class="nx-session-banner">
  <div class="nx-left">
    <span class="nx-pill"><span data-i18n="session.equipment">Equipment</span>: <span data-nx-eq>(none)</span></span>
    <span class="nx-pill"><span data-i18n="session.role">Role</span>: <span data-nx-role>viewer</span></span>
    <span class="nx-pill" data-nx-status data-i18n="session.ready">Ready</span>
  </div>
  <div class="nx-right">
    <label style="font-weight:800;font-size:12px;opacity:.95;">
      <span data-i18n="session.setRole">Set Role</span>
      <select id="nxRoleSelect" onchange="NEXUS.setRole(this.value)">
        <option value="viewer" data-i18n="role.viewer">viewer</option>
        <option value="tech" data-i18n="role.tech">tech</option>
        <option value="foreman" data-i18n="role.foreman">foreman</option>
        <option value="superintendent" data-i18n="role.superintendent">superintendent</option>
        <option value="admin" data-i18n="role.admin">admin</option>
      </select>
    </label>
  </div>
</div>

<script>
(function(){
  try{
    var sel=document.getElementById("nxRoleSelect");
    if(sel && window.NEXUS && typeof window.NEXUS.getRole==="function"){
      sel.value = window.NEXUS.getRole();
    }
  }catch(e){}
})();
</script>

<script>
(function(){
  try{
    if (window.buttons && typeof window.buttons.push === "function") {
      window.buttons.push({
        label: (window.NX_I18N && typeof window.NX_I18N.t === "function")
          ? window.NX_I18N.t("torque.sop")
          : "Torque Application SOP",
        href: (typeof window.getEqLink === "function"
          ? (window.getEqLink("torqueSop") || "#")
          : "#"),
        external: true
      });
    }
  }catch(e){}
})();
</script>

<a class="nx-back-btn" href="#" onclick="return NEXUS_back();" data-i18n="nav.back">← Back</a>

<div class="nx-header-wrap">
  <div class="nx-header">
    <img src="nexus.png" alt="NEXUS" />
    <button
      type="button"
      id="nxLangToggle"
      class="nx-lang-toggle"
      onclick="return NEXUS_toggleLanguage();"
      aria-label="Toggle Language"
    >EN | ES</button>
  </div>
</div>

<script>
(function(){
  function applyRoleOptionLabels(){
    try{
      var sel = document.getElementById("nxRoleSelect");
      if(!sel) return;
      var opts = sel.querySelectorAll("option[data-i18n]");
      opts.forEach(function(opt){
        var key = opt.getAttribute("data-i18n");
        if(window.NX_I18N && typeof window.NX_I18N.t === "function"){
          opt.textContent = window.NX_I18N.t(key);
        }
      });
    }catch(e){}
  }

  function updateLangToggleLabel(){
    try{
      var btn = document.getElementById("nxLangToggle");
      if(!btn) return;
      var lang = (window.NX_I18N && typeof window.NX_I18N.getLang === "function")
        ? window.NX_I18N.getLang()
        : (localStorage.getItem("nexus_lang") || "en");
      btn.textContent = (lang === "es") ? "ES | EN" : "EN | ES";
    }catch(e){}
  }

  window.NEXUS_toggleLanguage = function(){
    try{
      var current = (window.NX_I18N && typeof window.NX_I18N.getLang === "function")
        ? window.NX_I18N.getLang()
        : (localStorage.getItem("nexus_lang") || "en");
      var next = current === "es" ? "en" : "es";

      if(window.NX_I18N && typeof window.NX_I18N.setLang === "function"){
        window.NX_I18N.setLang(next);
      }else{
        localStorage.setItem("nexus_lang", next);
      }

      updateLangToggleLabel();
      applyRoleOptionLabels();
    }catch(e){}
    return false;
  };

  window.NEXUS_applyLocalPageTranslations = function(){
    try{
      if(window.NX_I18N && typeof window.NX_I18N.apply === "function"){
        window.NX_I18N.apply(document);
      }
      applyRoleOptionLabels();
      updateLangToggleLabel();
      document.documentElement.lang =
        (window.NX_I18N && typeof window.NX_I18N.getLang === "function")
          ? window.NX_I18N.getLang()
          : (localStorage.getItem("nexus_lang") || "en");
    }catch(e){}
  };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){
      window.NEXUS_applyLocalPageTranslations();
    });
  }else{
    window.NEXUS_applyLocalPageTranslations();
  }
})();
</script>

<script>
const qs = new URLSearchParams(location.search);
const eq = (qs.get('eq') || '').trim();
const u = new URL('form.html', location.href);
u.searchParams.set('id','torque');
if (eq) u.searchParams.set('eq', eq);
location.replace(u.pathname.split('/').pop() + u.search);
</script>

<script>
(function(){
  window.NEXUS_back = function(){
    try{
      if (document.referrer && document.referrer.indexOf(location.host) !== -1){
        history.back();
        return false;
      }
    }catch(e){}
    const qs = new URLSearchParams(location.search);
    const eq = qs.get("eq");
    location.href = eq
      ? `equipment.html?eq=${encodeURIComponent(eq)}`
      : "equipment.html";
    return false;
  };
})();
</script>

<footer class="nx-footer">
  <span data-i18n="footer.copyright">© 2026 NEXUS Data Science — Built for ACE Electric — All Rights Reserved</span>
</footer>

<script src="assets/js/nexus-core.js"></script>
<script src="assets/js/nexus-firebase-bridge.js"></script>
<script src="assets/js/nexus-i18n.js"></script>

</div>
</body>
</html>
