# scg-paas-front-prototype 프로젝트

1. 상위 폴더에서 npx create-react-app scg-paas-front-prototype

2. yarn eject 명령어 실행
 -rm -rf node_modules 폴더 삭제
 -yarn

3. yarn start로 확인하기

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
 -yarn add mobx@4.3.1 mobx-react moment lodash shortid stringquery axios recharts react-helmet bootstrap reactstrap@6.5.0


