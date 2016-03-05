import httpProxy from 'http-proxy';

const proxyServer = httpProxy.createProxyServer({});

export default function proxy(target) {
  return (req, res, next) => proxyServer.web(req, res, { target }, err => {
    next(err);
  });
}
