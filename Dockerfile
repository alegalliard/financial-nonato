# The builder from node image
FROM node:alpine as builder

# build-time variables 
# prod|sandbox its value will be come from outside 
ARG env=prod

WORKDIR /app
COPY ./dist  /app

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]