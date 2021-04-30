#frontend/client/Dockerfile
FROM node:latest
LABEL Kyungeun Choi <kechoi@ntwglobal.com>

# 작업 폴더를 만들고 npm 설치
# RUN rm -rf /usr/src/rr/frontend/client
RUN mkdir -p /usr/src/rr/frontend/client
WORKDIR /usr/src/rr/frontend/client
COPY package.json /usr/src/rr/frontend/client/package.json
RUN npm install 

# EXPOSE 3000
# 소스를 작업폴더로 복사하고 앱 실행
COPY . /usr/src/rr/frontend/client
CMD ["npm", "start"]
