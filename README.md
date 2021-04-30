**GITHUB :  https://github.com/TheaChoi/R-R**

In the project directory, you can run:

~~**Docker사용:**
```
1. 빌드 및 실행
docker-compose up -d --build

2. 데이터베이스 접속하여 Account, sessions 컬렉션 생성
    docker exec -it [mongo 컨테이너id] bash
    mongo
    use rr
    db.createCollection("Account")
    db.createCollection("sessions")
    db.createCollection("Review")

3. 웹페이지
- client: http://localhost:3000
- admin: http://localhost:9000
- api(backend): http://localhost:4000/api (hello가 뜨면 정상작동)

(
  nginX 설정 시
  - client: http://localhost:8080/client/
  - admin: http://localhost:8080/admin/
  - api(backend): http://localhost:8080/api/  ("hello.."가 웹페이지에 뜨면 정상작동)
)

4. 관리자 생성
    http://localhost:4000/admin/account/signup   
    POST로 JSON 보내기.
    ex)
    {
    "username": "test",
    "password": "test"
    }
    

```
~~
~~
### 1. Client Front 
```
cd frontend/client `npm start`
```
**port: 3000**
development mode 실행 
***
### 2. Admin Front 
```
cd frontend/admin `npm start`
```
**port: 9000**
development mode 실행 
***
### 3. API backend 
```
cd backend/api `nodemon --watch app.js`
```
**port: 4000**
***

=======
# GECL

