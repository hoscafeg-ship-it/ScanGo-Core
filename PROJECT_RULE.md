# ScanGo Core 개발 규칙서

## 1. 프로젝트 목표

ScanGo Core는 당일 출고 리스트를 확인하고, 체크박스로 선택한 주문을 한 번에 출고완료 처리하는 출고 전용 모듈이다.

이 프로젝트는 나중에 HDT ERP 시스템의 출고관리 기능으로 그대로 연결할 수 있도록 만든다.

---

## 2. 핵심 원칙

- 급하게 기능을 붙이지 않는다.
- 데이터가 꼬이지 않는 구조를 우선한다.
- 화면, 데이터, 업무 로직, API를 분리한다.
- 한 파일에는 한 가지 역할만 넣는다.
- 나중에 ERP에서도 재사용할 수 있는 부품으로 만든다.

---

## 3. 폴더 역할

### components
재사용 가능한 UI 부품을 넣는다.

예:
- Button
- Badge
- Checkbox
- SearchBar
- OrderCard

### pages
실제 화면 단위를 넣는다.

예:
- home
- scan
- history

### services
Google Sheet, 서버 통신 등 외부 연결 코드를 넣는다.

### store
현재 주문 목록, 선택 상태, 필터 상태 같은 앱 내부 데이터를 관리한다.

### data
테스트용 더미 데이터 또는 임시 데이터를 넣는다.

### styles
전체 디자인 규칙과 공통 CSS를 관리한다.

### utils
날짜, 숫자, 텍스트 처리 같은 공통 도구 함수를 넣는다.

### config
앱 설정값을 관리한다.

---

## 4. 파일 이름 규칙

컴포넌트 파일은 대문자로 시작한다.

좋은 예:
- Button.js
- OrderCard.js
- SearchBar.js

나쁜 예:
- button.js
- ordercard.js
- list.js

---

## 5. 코드 작성 규칙

- 한 파일은 가능하면 150줄을 넘기지 않는다.
- 같은 코드가 반복되면 함수로 분리한다.
- UI에서 Google Sheet를 직접 호출하지 않는다.
- Google Sheet 연결은 services 폴더에서만 한다.
- 주문 데이터 변경은 store를 통해서만 한다.

---

## 6. 데이터 흐름

기본 흐름은 아래와 같다.

Google Sheet  
→ services  
→ store  
→ page  
→ components  
→ user action  
→ store  
→ services  
→ Google Sheet

---

## 7. 1차 개발 범위

이번 1차 버전에서는 아래 기능까지만 만든다.

- 당일 출고 리스트 표시
- 검색
- 출고대기 / 출고완료 필터
- 체크박스 선택
- 선택 건수 표시
- 선택 출고완료 버튼
- 처리 완료 화면

바코드 스캔은 2차 버전에서 붙인다.

---

## 8. UI/UX 목표

- 모바일에서 한 손으로 사용하기 편해야 한다.
- 체크박스와 출고완료 버튼은 크게 만든다.
- 주문번호, 수령인, 상품명, 수량이 한눈에 보여야 한다.
- 출고대기와 출고완료 상태는 색상 배지로 구분한다.
- 선택된 주문은 시각적으로 명확히 표시한다.
- 하단 액션바는 항상 화면 아래에 고정한다.

---

## 9. Git 사용 규칙

기능 단위로 커밋한다.

예:
- init project structure
- add project rules
- add design tokens
- add mock order data
- add order list ui
- add checkbox selection
- add batch shipment action