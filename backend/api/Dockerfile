#backend/api/Dockerfile
#어떤 이미지로부터 새로운 이미지를 생성할지를 지정
FROM node:latest
LABEL Kyungeun Choi <kechoi@ntwglobal.com>

# 작업 폴더를 만들고 npm 설치
RUN mkdir -p /usr/src/rr/backend/api
RUN mkdir -p /usr/src/rr/backend/datas
WORKDIR /usr/src/rr/backend/api
COPY package.json /usr/src/rr/backend/api/package.json
RUN npm install

# 소스를 작업폴더로 복사하고 앱 실행
COPY . /usr/src/rr/backend/api
CMD ["node", "app.js"]