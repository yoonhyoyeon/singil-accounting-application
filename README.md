# 🧾 Singil Accounting Application

> **신길고등학교 매점 영업일보 자동화 웹 애플리케이션 (외주 개발 프로젝트)**  
> 📆 개발 일시: 2019.12  
> 🧑‍💻 포지션: 프론트엔드 개발 & UI/UX 디자인  
> 🛠️ 기술 스택: Vue.js, Axios, Chart.js

---

## 📌 프로젝트 개요

신길고등학교 매점에서는 매일 **여러 사이트(아스템즈, 여신금융협회 등)**에서 카드사별 매출 데이터를 수작업으로 수집해 **Excel 양식에 직접 기입**하고 있었습니다.  
이 작업은 반복적이고 시간이 오래 걸렸으며, 오류 발생 가능성도 높았습니다.

이에 따라 다음과 같은 기능을 갖춘 **자동화 웹 애플리케이션**을 외주 프로젝트로 기획 및 개발하였습니다.

### 🎯 주요 목표
- 아즈템즈, 여신금융협회에서 매출 데이터를 자동 수집 (크롤링 기반)
- 엑셀 양식 자동 생성 및 다운로드 기능
- 시각적 매출 통계 제공 (차트, 표 등)
- 웹 기반으로 접근성과 효율성 향상

---

## ✨ 핵심 기능

### 🔐 사용자 인증
- 로그인 및 회원가입 기능
- 계정 정보 수정 / 비밀번호 변경

### 📈 매출 데이터 시각화
- 기간별 매출 조회 (표/차트)
- 카드사별/결제 수단별 통계 시각화
- 동기화된 데이터를 한눈에 확인 가능

### 📥 Excel 자동 생성
- 원하는 날짜를 선택하여 매출 Excel 자동 다운로드
- 실제 영업일보 양식과 동일하게 포맷팅

### 🔄 실시간 동기화
- 아스템즈 및 여신금융협회 사이트와 데이터 동기화
- 동기화 상태 실시간 확인 및 관리

---

## 🖼️ 실행 화면

### 🔑 로그인 및 회원가입
<img src="https://github.com/user-attachments/assets/036275d4-92a2-4683-9592-5d94b0a7d298" width="600" />

### 📊 매출 현황 대시보드
<img src="https://github.com/user-attachments/assets/e2e3b422-db77-4bef-8459-ce53d0295eed" width="600" />

### 📅 엑셀 다운로드 날짜 선택 팝업
<img src="https://github.com/user-attachments/assets/ccbb9dfc-a6c1-4452-a494-e25700b37140" width="600" />

### 💳 카드 매출 조회 (일별/카드사별)
<img src="https://github.com/user-attachments/assets/923ee2f3-0c40-46f4-8035-ed30afa6924a" width="600" />
<img src="https://github.com/user-attachments/assets/1435ee6a-5323-411c-a40c-9f0cdf18c370" width="600" />

### 🚌 티머니 및 캐시비 매출
<img src="https://github.com/user-attachments/assets/093db6d7-ff45-45b5-9b76-0ddd48bd0c21" width="600" />
<img src="https://github.com/user-attachments/assets/938d0dfd-3571-4444-8e4a-65cccadc5763" width="600" />

### 🔄 데이터 동기화 & 상태 확인
<img src="https://github.com/user-attachments/assets/6702ded3-665d-4a06-92ce-5dfb8b033463" width="600" />
<img src="https://github.com/user-attachments/assets/72078a2e-bc2b-4665-8386-0de5bb1b63ac" width="600" />
<img src="https://github.com/user-attachments/assets/80123896-7fbe-46bc-a277-5518c5826e42" width="600" />

### ⚙️ 계정 설정
<img src="https://github.com/user-attachments/assets/2d6c0c81-56d8-4bd0-94ac-99880ec6951c" width="600" />
<img src="https://github.com/user-attachments/assets/ee937de1-0f19-4514-a8a8-e5240c94d37a" width="600" />

---

## ⚙️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend Framework** | Vue.js |
| **HTTP 통신** | Axios |
| **차트 시각화** | Chart.js |

---

## 🚀 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 프로덕션 빌드
npm run build

# 4. E2E 테스트
npm run e2e

# 5. 전체 테스트 실행
npm test