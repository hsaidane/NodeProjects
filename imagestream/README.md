Note on how to test this app.
# node app.js
- Start redis:
# redis-server.exe redis.windows.conf
- Add new badges using curl command:
$curl -X POST http://localhost:8080 -H "Content-Type:application/json" -d "[{\"badge_id\": \"badgeHs1\"}]"
- Verify current redis server data.
$ curl http://localhost:8080/badges

- redis-cli
$ redis-cli
