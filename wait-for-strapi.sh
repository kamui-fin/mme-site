#!/bin/sh
set -e

host="$1"
shift

until curl -I "$host"; do
    >&2 echo "Strapi is unavailable - sleeping"
    sleep 1
done

>&2 echo "Strapi is up - executing command"
exec "$@"
