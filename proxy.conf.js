const PROXY_CONFIG = {
  "/api/session": {
    "target": "http://localhost:3000/",
    //"target": "https://tracking-security-mx-tracking-cards-web-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {"^/api/session" : "/api/session"}
  },
  "/api/cards/status": {
    "target": "http://localhost:3000/",
    //"target": "https://tracking-security-mx-tracking-cards-web-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/cards/status": "/api/cards/status"
    }
  }
};

module.exports = PROXY_CONFIG;
