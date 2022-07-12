#!/bin/sh
set -e

host="strapi"
shift

until curl -I "$host"; do
    >&2 echo "Strapi is unavailable - sleeping"
    sleep 1
done

>&2 echo "Strapi is up - executing command"
exec "$@"
