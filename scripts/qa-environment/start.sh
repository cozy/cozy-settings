#!/bin/bash
#
# Starts a long lived Cozy Stack + CouchDB + Mailpit stack with Settings installed, for manual or
# agent driven exploratory QA. Each start recreates it from scratch.
#
#   scripts/qa-environment/build.sh    # once, and whenever the code under test changes
#   scripts/qa-environment/start.sh
#   QA_USERS="dave erin" scripts/qa-environment/start.sh   # extra accounts
#
# Accounts (instance / password): alice.cozy.localhost / alice1234, bob.cozy.localhost / bob1234,
# charlie.cozy.localhost / charlie1234, plus QA_USERS (<uid>1234). Settings is served on
# http://<uid>-settings.cozy.localhost:<port>/.
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

QA_PROJECT="${QA_PROJECT:-cozy-settings-qa}"
QA_USERS="${QA_USERS:-}"
# Published on 127.0.0.1 only. The stack listens on the same port inside the network.
export QA_STACK_PORT="${QA_STACK_PORT:-18900}"
export QA_MAIL_PORT="${QA_MAIL_PORT:-18901}"
ROOT_DOMAIN="cozy.localhost"
USERS="alice bob charlie $QA_USERS"

# Features of Settings hidden behind a flag that work without an external service
FLAGS='{
  "settings.2fa.enabled": true,
  "settings.delete.enabled": true,
  "settings.permissions-dashboard": true
}'

compose() {
  docker compose -p "$QA_PROJECT" -f "$SCRIPT_DIR/docker-compose.yaml" "$@"
}

stack() {
  compose exec -T cozystack cozy-stack "$@"
}

if [ ! -f "$REPO_DIR/build/manifest.webapp" ]; then
  echo "The build of Settings is missing, build it first: scripts/qa-environment/build.sh" >&2
  exit 1
fi

echo "==> Starting the stack as compose project '$QA_PROJECT'"
compose up -d --wait --wait-timeout 300

echo "==> Waiting for cozy-stack"
for _ in $(seq 1 60); do
  if curl -sf "http://127.0.0.1:$QA_STACK_PORT/version" >/dev/null; then
    ready=true
    break
  fi
  sleep 2
done
if [ "${ready:-false}" != "true" ]; then
  echo "cozy-stack did not start within 2 minutes, see: docker compose -p $QA_PROJECT logs" >&2
  exit 1
fi

echo "==> Creating the QA accounts"
for uid in $USERS; do
  domain="$uid.$ROOT_DOMAIN:$QA_STACK_PORT"
  name="${uid^}"
  stack instances add "$domain" \
    --passphrase "${uid}1234" --email "$uid@$ROOT_DOMAIN" --public-name "$name" \
    --locale en --tz Europe/Paris >/dev/null
  stack apps install settings file:///app/settings --domain "$domain" >/dev/null
  stack features flags --domain "$domain" "$FLAGS" >/dev/null
  # Something to list and revoke in Connected devices. It hides the clients registered through
  # /auth/register until they get a token (pending), and the clients of the client-oauth command
  # have no kind: the kind is set afterwards, with the client's registration access token.
  for device in "mobile:Android:$name's phone" "desktop:Linux:$name's laptop"; do
    IFS=: read -r kind os label <<<"$device"
    registration="$(stack instances client-oauth "$domain" http://localhost/ "$label" \
      github.com/cozy/cozy-qa --json)"
    python3 -c '
import json, sys
c = json.load(sys.stdin)
c.update(client_kind=sys.argv[1], client_os=sys.argv[2])
print(c["client_id"], c["registration_access_token"])
print(json.dumps({k: c[k] for k in ("client_id", "client_secret", "client_name", "redirect_uris",
                                    "software_id", "client_kind", "client_os")}))
' "$kind" "$os" <<<"$registration" | {
      read -r client_id token
      curl -sf -o /dev/null -X PUT -H "Host: $domain" -H "Authorization: Bearer $token" \
        -H 'Content-Type: application/json' -H 'Accept: application/json' --data @- \
        "http://127.0.0.1:$QA_STACK_PORT/auth/register/$client_id"
    }
  done
  echo "    $uid: http://$uid-settings.$ROOT_DOMAIN:$QA_STACK_PORT/ / ${uid}1234"
done

cat <<INFO

==> The QA environment is up

  Settings: http://alice-settings.$ROOT_DOMAIN:$QA_STACK_PORT/  (bob-settings, charlie-settings)
  Login:    http://alice.$ROOT_DOMAIN:$QA_STACK_PORT/auth/login  (alice1234, bob1234, charlie1234)
  Emails:   http://127.0.0.1:$QA_MAIL_PORT  (Mailpit)

From a container (e.g. Playwright), join the network '${QA_PROJECT}_default' and use:
  --host-resolver-rules="MAP *.$ROOT_DOMAIN cozystack"
and open Mailpit at http://mailpit:8025.

Stop it with: scripts/qa-environment/stop.sh
INFO
