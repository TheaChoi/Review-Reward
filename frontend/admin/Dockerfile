#frontend/admin/Dockerfile
FROM node:latest
LABEL Kyungeun Choi <kechoi@ntwglobal.com>

# 작업 폴더를 만들고 npm 설치
RUN mkdir -p /usr/src/rr/frontend/admin
WORKDIR /usr/src/rr/frontend/admin
COPY package.json /usr/src/rr/frontend/admin/package.json
RUN npm install 

EXPOSE 9000
# 소스를 작업폴더로 복사하고 앱 실행
COPY . /usr/src/rr/frontend/admin
CMD ["npm", "start"]

