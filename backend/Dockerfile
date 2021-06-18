FROM node:14-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV='production'

CMD ["node", "./src/server.js"]

# BUILD
# docker build -t neandher/devwebii-api:v1 .

# RUN
# docker run -p 3000:3000 -d neandher/devwebii-api:v1

# STOP
# docker stop 4a3784e65843

# REMOVE
# docker rm 4a3784e65843
# docker image rm 4a3784e65843

# EXEC
# docker exec -it 4a3784e65843 /bin/bash

# PUSH
# docker push neandher/devwebii-api:v1