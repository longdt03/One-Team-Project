npm install -g bower
bower install ng-websocket

in: /www/lib/ng-websocket/ng-websocket.js:
delete line 122 then add these lines:

if (cfg.mock) {
                me.$$ws = new $$mockWebsocket(cfg.mock, $http);
            }
            else if (cfg.protocols) {
                me.$$ws = new WebSocket(cfg.url, cfg.protocols);
            }
            else {
                me.$$ws = new WebSocket(cfg.url);
            }