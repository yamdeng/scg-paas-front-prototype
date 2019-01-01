# 프로젝트 import

1. node, visaul code 설치

2. visual code "Settings Sync" 확장 툴 설치

3. visual code 팔렛트 오픈 ---> Sync Download 선택
 -git access token : 337dffea3cbfb98c8bbd3b7eb76c5164d90bd760

4. 라이브러리 설치 : yarn

5. 실행 : yarn start


# scg-paas-front-prototype 프로젝트 작업 히스토리

1. 상위 폴더에서 npx create-react-app scg-paas-front-prototype

2. yarn eject 명령어 실행
 -node_modules 폴더 삭제 : rm -rf
 -라이브러리 재설치 : yarn

3. yarn start로 브라우저 실행 확인하기
 -http://localhost:3000

4. .bable 파일 추가
 -기존 package.json에 정의되어있던 "babel" 정보 삭제
 -.babelrc 파일 생성
 -babel 라이브러리 설치 : yarn add --dev babel-plugin-transform-decorators-legacy
 -IDE 관련 라이브러리 설치 : yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier prettier-eslint
 -리액트 라우터 설치 :yarn add react-router react-router-dom

5. .env 파일 생성 및 PORT 3001로 수정

6. .eslintrc, .eslintignore 파일 생성

7. .prettierrc 파일 생성

8. .vscode 폴더, .vscode/launch.json, .vscode/settings.json 파일 생성

9. vs code IDE에서 디버그 확인하기
 -터미널에서 yarn start 실행
 -vs code IDE에서 디버그 포인트 걸고 [F5] 키 눌러서 디버깅 여부 확인

10. mobx 및 필수 라이브러리 설치
 -yarn add mobx@4.3.1 mobx-react moment lodash shortid stringquery axios recharts react-helmet bootstrap reactstrap@6.5.0 classnames prop-types

11. 기타 라이브러리 설치
 -yarn add mobx-react-router recompose mobx-react-devtools

12. material-ui 설치
 -yarn add @material-ui/core @material-ui/icons @material-ui/styles

13.

