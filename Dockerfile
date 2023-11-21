from node:19 as build

workdir /app

copy . .

run yarn && yarn build


from nginx

workdir /usr/share/nginx/html

run rm -rf ./*
copy --from=build /app/build .