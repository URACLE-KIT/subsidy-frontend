# 내가 받을 수 있는 보조금을 한눈에 볼 수 있는 보조금앱 보조알리미  
### 목차
1. 프로젝트 소개
2. 팀원 구성
3. 개발 환경
4. 프로젝트 구조
5. 개발 기간
6. 페이지별 기능
<br />

## 1. 프로젝트 소개
- 보조알리미는 자신에게 해당하는 보조금 정보를 한 곳에서 모아볼 수 있는 어플리캐이션입니다.
- 관심있는 정책은 스크랩하여 마이페이지에서 확인할 수 있습니다.
- 조건(태그)에 맞는 보조금 신청을 알아볼 수 있고, 그 후에 후기를 작성할 수 있습니다.
   

## 2. 팀원 구성
- 프론트엔드 : 박수현(팀장), 원종현, 이찬영   
- 백엔드 : 김인찬
<br />
<br />

## 3. 개발 환경
- Front : React, JavaScript
- Back-end : SpringBoot
- 버전 및 이슈관리 : Github, Github Desktop
<br />

## 4. 프로젝트 구조
├── README.md <br />
├── README.old.md <br />
├── .env <br />
├── .gitignore <br />
├── package-lock.json <br />
├── package.json <br />
│ <br />
├── public <br />
│　　　├── index.html <br />
│　　　├── manifest.json <br />
│　　　├── robots.txt <br />
│　　　├── favicon.ico <br />
│　　　├── image1.jpg <br />
│　　　└── morpheus <br />
│　　　　　　├── mcore.extends.js <br />
│　　　　　　├── mcore.min.js <br />
│　　　　　　└── wnInterface.js <br />
└── src <br />
　　　├── App.js <br />
　　　├── index.css <br />
　　　├── index.js <br />
　　　├── layout <br />
　　　│　　　├── Footer.js <br />
　　　│　　　├── Header.js <br />
　　　│　　　├── Menu.js <br />
　　　│　　　└── Modal.js <br />
　　　└── pages <br />
　　　　　　├── Custom.js <br />
　　　　　　├── Detail.js <br />
　　　　　　├── Latest.js <br />
　　　　　　├── Login.js <br />
　　　　　　├── Main.js <br />
　　　　　　├── Mycustom.js <br />
　　　　　　├── Mypage.js <br />
　　　　　　├── Profile.js <br />
　　　　　　├── Required.js <br />
　　　　　　├── Review.js <br />
　　　　　　├── Scrap.js <br />
　　　　　　├── Setting.js <br /> 
　　　　　　├── Signup.js <br />
　　　　　　└── Write.js <br />

<br />
<br />

## 5. 개발기간
| 단계   | 기획 | 분석 | 설계 | 구현  | 테스트 | 배포 | 완료 | 합계  |
|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 완료일자 | 10.24 | 10.25 | 10.27 | 11.22 | 11.25 | 11.26 | 11.28 |  |
| 예상시간 | 1일 | 1일 | 3일 | 28일 | 3일  | 1일 | 2일 | 39일 |
| 소요시간 | 1일 | 1일 | 3일 | 28일 | 3일  | 1일 | 2일 | 39일 |
<br />

## 6. 어플 기능
1. **회원 관리**
   1. 회원가입 (비회원)
   2. 회원 정보 수정
   3. 회원 탈퇴
   4. 로그인
   5. 로그아웃
   6. 맞춤 정보 등록 <br /><br />
  
2. **지원금 리스트 관리**
   1. 지원금 조회 (비회원)
   2. 지원금 검색 (비회원)
   3. 지원금 필터링 (비회원) <br /><br />
  
3. **게시글 관리**
   1. 후기 작성
   2. 후기 조회 (비회원)
   3. 후기 수정
   4. 후기 삭제
   5. 후기 댓글 작성
   6. 후기 댓글 수정
   7. 후기 댓글 삭제 <br /><br />
  
4. **스크랩 관리**
   1. 스크랩 등록
   2. 스크랩 조회
   3. 스크랩 삭제 <br /><br />










