window.Router = (function(){
  function parseHash(){
    let hash = window.location.hash || "#/dashboard";
    hash = hash.replace(/^#/, "");
    const [path, queryStr] = hash.split("?");
    const parts = path.split("/").filter(Boolean); // e.g. ['aula','mendel']
    const params = {};
    if (queryStr){
      queryStr.split("&").forEach(pair => {
        const [k,v] = pair.split("=");
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v||"");
      });
    }
    return { parts, params };
  }

  function currentRoute(){
    const { parts, params } = parseHash();
    return { route: parts[0] || "dashboard", sub: parts[1], params };
  }

  function navigate(path){
    window.location.hash = path;
  }

  return { parseHash, currentRoute, navigate };
})();
