# AGENT.md - `isa-util` (`util-helper`)

이 문서는 AI 어시스턴트(Agent)와 개발자가 `isa-util` 프로젝트의 구조, 모듈 구성, 개발 표준 및 빌드/테스트 파이프라인을 빠르게 파악하고 유지보수할 수 있도록 정리한 기술 가이드입니다.

---

## 1. 프로젝트 개요 (Project Overview)

- **패키지명**: `isa-util` (저장소명: `util-helper`)
- **버전**: `1.0.26`
- **라이선스**: MIT
- **주요 목적**: 브라우저 및 Node.js/타입스크립트 환경에서 자주 사용되는 필수 유틸리티 기능들을 가볍고 직관적인 모듈 형태로 제공하는 라이브러리
- **설계 원칙**:
  - 의존성 제로(Zero-dependency runtime) 지향
  - 독립적인 기능 단위 모듈화 및 직관적인 네임스페이스 / named export 지원
  - Web 표준 API(SubtleCrypto, IndexedDB, URLSearchParams 등) 활용 및 타입 안정성 보장

---

## 2. 디렉터리 구조 및 아키텍처

```text
util-helper/
├── .gitignore
├── .npmignore
├── LICENSE
├── README.md               # 사용자 대상 상세 가이드 및 예제
├── AGENT.md                # 에이전트 및 유지보수용 아키텍처 문서
├── babel.config.json       # Babel 트랜스파일 설정 (@babel/env, preset-typescript, minified)
├── package.json            # 패키지 메타데이터 및 빌드/테스트 스크립트
├── tsconfig.json           # TypeScript 컴파일러 옵션
├── yarn.lock
└── src/
    ├── index.ts            # 엔트리포인트 (모든 유틸리티 재내보내기)
    ├── index.test.ts       # 루트 테스트
    ├── api/                # 비동기 제어, 플랫폼 감지, 작업 큐
    │   ├── debounce/
    │   ├── throttle/
    │   ├── sleep/
    │   ├── getPlatform/
    │   ├── jobQueue/
    │   └── flushQueue/
    ├── dom/                # DOM 조작 헬퍼
    │   ├── addClass/
    │   ├── removeClass/
    │   ├── hasClass/
    │   └── toggleClass/
    ├── export/             # 데이터/파일 내보내기
    │   └── download/
    ├── format/             # 데이터 및 문자열 변환/포맷팅
    │   ├── addComma/
    │   ├── camelCase/
    │   ├── pascalCase/
    │   ├── snakeCase/
    │   ├── formatClass/    # cx (clsx 대안)
    │   ├── formatDate/
    │   └── timeAgo/
    ├── import/             # 외부 리소스 로딩
    │   └── loadCDN/
    ├── querystring/        # URL Query String 파싱 및 동기화
    │   ├── getQuery/
    │   └── setQuery/
    ├── security/           # Web Crypto 기반 암호화/키 생성
    │   └── crypto/
    ├── storage/            # 스토리지 추상화 계층
    │   ├── getLocalStorage/
    │   ├── setLocalStorage/
    │   ├── removeLocalStorage/
    │   └── idb/            # IndexedDB Promise 래퍼 (core, cursor, types)
    └── typecheck/          # 타입 및 환경 판별 유틸
        ├── isArray/ isBlob/ isBrowser/ isDarkMode/ isFalsy/ isFunction/
        ├── isMobile/ isNode/ isNull/ isNumber/ isObject/ isString/
        ├── isSymbol/ isToday/ isTouchDevice/ isTruthy/ isUndefined/
        └── index.ts
```

---

## 3. 핵심 모듈별 상세 기능 명세

### 3.1 `src/api` (비동기 및 실행 제어)
- `debounce(fn, delay)`: 지정된 시간 동안 연속 호출이 없을 때 마지막 함수를 실행.
- `throttle(fn, interval)`: 지정된 시간 간격마다 최대 1회만 실행 보장.
- `sleep(ms)`: 지정된 밀리초 후 resolve되는 Promise 반환.
- `getPlatform()`: `navigator.userAgent` 분석을 통해 OS, 브라우저명, 모바일 여부 반환.
- `JobQueue<T>`: 비동기 작업(`processJob`)을 순차적으로 큐에 적재하여 실행하는 큐 매니저.
- `FlushQueue`: ID 기반 비동기 작업을 중복 방지하여 대기열에 쌓고, 디바운스 및 순차(`flush(false)`)/병렬(`flush(true)`) 일괄 실행 지원.

### 3.2 `src/dom` (DOM 조작)
- `addClass(element, ...classNames)`: 요소에 클래스 추가.
- `removeClass(element, ...classNames)`: 요소에서 클래스 제거.
- `hasClass(element, className)`: 특정 클래스 보유 여부 확인.
- `toggleClass(element, className, force?)`: 클래스 토글.

### 3.3 `src/export` (다운로드)
- `download(blob | string, filename, mimeType)`: 브라우저에서 동적으로 `<a>` 태그를 생성해 Blob 또는 텍스트 데이터를 파일로 다운로드 트리거.

### 3.4 `src/format` (포맷팅 및 문자열 조작)
- `addComma(number | string)`: 정수/실수 단위에 천 단위 구분자(`,`) 추가.
- `camelCase(str)`, `pascalCase(str)`, `snakeCase(str)`: 특수문자, 공백, 하이픈, 언더스코어가 포함된 문자열을 케이스 규칙에 맞춰 변환.
- `formatClass` (별칭: `cx`): 문자열, 불리언 키를 가진 객체, 중첩 배열을 받아 유효한 CSS 클래스 문자열로 결합 (clsx/classnames 호환).
- `formatDate(date, formatStr)`: `YYYY`, `MM`, `DD`, `HH`, `mm`, `ss` 포맷 기반 날짜 문자열 변환.
- `timeAgo(date)`: 현재 시각 기준으로 경과 시간을 자연어 형식("방금 전", "N분 전" 등)으로 계산.

### 3.5 `src/import` (동적 스크립트 임포트)
- `loadCDN(id, src)`: 중복 로드를 방지하며 특정 CDN 스크립트 태그를 DOM에 삽입하고 로드 완료를 Promise로 반환.

### 3.6 `src/querystring` (URL 쿼리 처리)
- `getQuery()`: 현재 브라우저 `window.location.search` 기반의 `URLSearchParams` 인스턴스 반환.
- `setQuery(params, replace?)`: `history.pushState` 또는 `history.replaceState`를 통해 페이지 리로드 없이 브라우저 URL 쿼리 파라미터를 갱신.

### 3.7 `src/security` (Web Crypto 보안 유틸리티)
- PBKDF2(100,000 iterations, SHA-256)를 사용해 입력된 비밀번호와 솔트로부터 AES-GCM 256비트 대칭키 생성 (`generateKey`).
- `encryptData(data, password, salt)`: IV(12바이트)를 생성하여 AES-GCM 암호화 후 `{ iv, encryptedData }` 반환.
- `decryptData(encryptedData, iv, password, salt)`: 암호화된 데이터를 복호화하여 원본 문자열 복원.
- `generateSalt()`, `generatePassword(length)`: 암호학적으로 안전한 랜덤 솔트 및 패스워드 생성.
- `generatePasswordWithSaltAndEncrypt`, `decryptPasswordWithSalt`: 키 생성과 암/복호화 과정을 한 번에 수행하는 통합 헬퍼.

### 3.8 `src/storage` (로컬 저장소 및 IndexedDB)
- **LocalStorage**:
  - `getLocalStorage(key, defaultValue?)`: JSON 파싱 실패 및 예외 처리를 포함한 안전한 읽기.
  - `setLocalStorage(key, value)`: 값의 JSON 직렬화 저장.
  - `removeLocalStorage(key)`: 키 삭제.
- **IndexedDB (`idb`)**:
  - `openDB(name, { version, schema })`: DB 인스턴스 캐싱 관리 및 버전 변경 시 기존 연결 자동 해제로 `blocked` 방지.
  - `get(dbName, store, key)`, `put(dbName, store, value, key?)`, `remove`, `clear`, `count`, `getAll`: Promise 기반의 단일 트랜잭션 CRUD.
  - `cursor(dbName, store, options, onCursor)`: 범위(`IDBKeyRange`) 및 방향에 따른 스트림 커서 순회 기능 제공.

### 3.9 `src/typecheck` (타입 및 런타임 환경 검사)
- 타입 판별: `isArray`, `isBlob`, `isFunction`, `isNull`, `isNumber`, `isObject`, `isString`, `isSymbol`, `isUndefined`, `isTruthy`, `isFalsy`
- 환경/플랫폼 판별:
  - `isBrowser`: `window` 객체 존재 여부 확인.
  - `isNode`: `process.versions.node` 존재 여부 확인.
  - `isDarkMode`: `window.matchMedia('(prefers-color-scheme: dark)')` 판별.
  - `isTouchDevice`: 터치 이벤트 및 `maxTouchPoints` 지원 여부 확인.
  - `isMobile`: UserAgent 및 터치 기반 모바일 디바이스 감지.
  - `isToday(date)`: 주어진 날짜가 오늘인지 비교.

---

## 4. 빌드 및 개발 환경 가이드

### 4.1 필수 패키지 관리자 및 환경
- Node.js 18+ 권장
- 패키지 매니저: `yarn` (v1.22+)
  > **Note for Windows PowerShell**: Windows 환경에서 `.ps1` 스크립트 실행 권한 정책 문제가 발생할 경우 `cmd.exe /c "yarn <command>"` 형식으로 실행하십시오.

### 4.2 주요 명령어

| 명령어 | 내용 |
|---|---|
| `yarn test` | Jest 테스트 실행 (기본 `jest --watchAll`) |
| `cmd.exe /c "yarn jest --watchAll=false"` | 전체 테스트 1회 일괄 실행 |
| `yarn publish:npm` | `dist` 폴더 삭제 후 Babel로 TS -> JS 트랜스파일 (테스트 파일 제외) |
| `yarn publish:type` | `tsc`로 `.d.ts` 타입 정의 파일만 `dist`에 생성 |
| `yarn build` | `publish:npm` + `publish:type` 일괄 빌드 |

---

## 5. 테스트 및 품질 현황

- **테스트 러너**: Jest 29 (`ts-jest`, `babel-jest`, `jest-environment-jsdom`, `fake-indexeddb`)
- **테스트 구성**: 각 모듈별 서브 디렉터리 내에 `*.test.ts` 파일이 함께 위치하는 Co-location 구조.
- **테스트 현황**:
  - 총 **71개 Test Suite**, **271개 Test** 모두 통과 (100% Pass).
  - Web Crypto API, IndexedDB(fake-indexeddb), DOM(jsdom), UserAgent 모킹 등이 완비되어 있음.

---

## 6. 에이전트 작업 원칙 및 컨벤션

1. **단일 책임 및 모듈 분리**:
   - 새로운 유틸리티를 추가할 때는 관련된 상위 도메인(`api`, `format`, `dom`, `storage` 등) 하위에 별도 디렉터리를 만들고, `<기능명>.ts`와 `<기능명>.test.ts`를 함께 작성합니다.
   - 해당 디렉터리의 `index.ts`와 `src/index.ts`에 export를 연결합니다.
2. **테스트 필수 원칙**:
   - 코드를 수정하거나 기능을 추가한 뒤에는 반드시 `yarn jest --watchAll=false`로 테스트 통과 여부를 검증합니다.
3. **런타임 의존성 최소화**:
   - 프로젝트 런타임 `dependencies`는 빈 객체(`{}`) 상태를 유지합니다. 외부 라이브러리 추가 대신 표준 웹 API 및 순수 알고리즘을 사용합니다.
4. **브라우저/Node 호환성 방어 코드**:
   - 브라우저 전역 객체(`window`, `document`, `navigator`, `crypto`, `indexedDB`)를 직접 다룰 때는 SSR/Node 환경에서 런타임 에러가 발생하지 않도록 방어 로직(`typeof window !== 'undefined'`, `globalThis` 등)을 고려해야 합니다.

---

## 7. 보안 취약점 및 결함 개선 이력 (Changelog & Security Hardening)

### 7.1 보안 취약점 조치 (Security Hardening)
- **CWE-338 (PRNG 취약점 해결)**: `src/security/crypto/crypto.ts`의 `generatePassword()`에서 사용되던 예측 가능한 `Math.random()`을 제거하고, Web Crypto API의 CSPRNG(`crypto.getRandomValues()`) 및 모듈로 바이어스 제거 알고리즘을 적용하여 암호학적으로 안전한 키/비밀번호 생성 구현.
- **솔트 엔트로피 손실 및 인코딩 결함 수정**: `generateSalt()`에서 유효하지 않은 UTF 문자열 및 null 바이트를 유발하던 `String.fromCharCode` 변환 방식을 32자리 Hex(16진수) 문자열 포맷으로 개선.
- **`loadCDN` DOM 인젝션 및 경합(Race Condition) 방어**:
  - `document.head.querySelector('#' + id)`의 CSS 특수문자 파싱 예외(DOMException)를 해결하기 위해 `document.getElementById(id)`로 교체.
  - 여러 비동기 호출이 동시에 동일 ID의 스크립트를 로드할 때 발생하는 Promise 조기 resolve 버그를 내부 `loadingScripts` Promise 캐시 맵으로 방어.
  - `options` 속성 주입 시 `dataset` 및 boolean 속성(`async`, `defer`, `noModule`)을 표준 스펙에 맞게 안전하게 바인딩.

### 7.2 런타임 버그 및 호환성 개선
- **SSR/Node 환경 크래시 방지**:
  - `src/typecheck/isMobile/isMobile.ts`: 기본 매개변수 `navigator.userAgent` 참조 시 Node/SSR 환경에서 발생하던 `ReferenceError: navigator is not defined` 예외 방어.
  - `src/typecheck/isTouchDevice/isTouchDevice.ts`: 잘못된 조건식 `!isBrowser` (함수 참조)를 `!isBrowser()` (함수 호출)로 수정하여 Node 환경에서 `window` 참조 크래시 방지.
- **DOM 및 스토리지 예외 방어**:
  - `src/dom/removeClass/removeClass.ts`: `null`/`undefined` 요소 전달 시 `TypeError: Cannot read properties of null` 크래시를 방지하는 가드 조건문 추가.
  - `src/api/debounce/debounce.ts`: 연속 재호출 시 이전 `debounceId`를 명시적으로 `clearTimeout`하여 타이머 누수 및 잠재적 중복 실행 버그 방지.
  - `src/format/timeAgo/timeAgo.ts`: 미래 시각 입력 시 음수(`-10 seconds ago`)가 노출되는 버그 및 `Invalid Date` 입력 예외 방어.
  - `src/storage/idb/core.ts`: `put` 함수에 선택적 `key` 파라미터(`put(dbName, store, value, key?)`)를 지원하여 `keyPath`가 없는 스토어에서도 데이터 저장이 가능하도록 개선.
  - `src/querystring/setQuery/setQuery.ts`: 쿼리스트링 갱신 시 `replace?: boolean` 옵션 지원 및 빈 쿼리스트링 처리 보완.
  - `src/storage/setLocalStorage/setLocalStorage.ts`: 오타 변수명 `isBroswer` -> `isBrowser` 수정.

### 7.3 중복 코드 제거 및 구조적 개선 (Deduplication & Refactoring)
- **`pascalCase` 중복 정규식 로직 제거**: `src/format/pascalCase/pascalCase.ts`에서 `camelCase`와 100% 동일하던 정규식 토큰화 로직을 제거하고, `camelCase`를 import하여 첫 글자만 대문자화하도록 단축 재사용 (DRY 원칙 달성).
- **IndexedDB Promise 보일러플레이트 중복 제거**: `src/storage/idb/core.ts`의 `get`, `put`, `del`, `clear` 4개 함수에서 반복되던 `new Promise((resolve, reject) => { req.onsuccess ... req.onerror ... })` 코드를 단일 `promisifyRequest` 헬퍼로 통합하여 30줄 이상의 중복 코드 제거.
- **DOM class 조작 최적화**:
  - `src/dom/addClass/addClass.ts` 및 `removeClass.ts`: 브라우저 표준 `classList.add`/`remove`와 중복되는 사전 `classList.contains()` 체크를 제거하여 불필요한 DOM 연산 방지.
  - 공백으로 구분된 다중 클래스 문자열(`'btn btn-primary'`) 및 가변 인자(`...classNames`)를 안전하게 처리하도록 개선.
- **`getPlatform` 규칙 선언형 테이블 리팩토링**:
  - `src/api/getPlatform/getPlatform.ts`: 수십 줄의 중복 `if-else` 문자열 검사를 `BROWSER_RULES` 및 `OS_RULES` 규칙 테이블로 추상화하여 중복 제거.
  - `// @ts-nocheck` 제거 및 엄격한 TypeScript 타입 적용, 오타 변수 `platfrom` ➡️ `platform` 정리.
- **`addComma` 유연성 확장**: 숫자형뿐만 아니라 문자열 숫자(`"1234567"`)도 유연하게 처리하고, 빈 값/NaN 입력에 대해 안전하게 방어하도록 보완.

### 7.4 번들링 최적화 및 비동기 API 확장 (Modernization & DX)
- **Tree-shaking 지원 (`sideEffects: false`)**: `package.json`에 `sideEffects: false`를 명시하여 Vite, Webpack, Rollup 등 최신 번들러에서 사용되지 않는 유틸리티 코드를 완벽하게 제거(Dead-code elimination)하도록 지원.
- **npm 배포 아티팩트 정밀화 (`files` 필드)**: `package.json`의 `files` 목록(`["dist", "README.md", "LICENSE"]`)을 명시하여 불필요한 설정 파일/소스 유출을 방지하고 패키지 설치 용량 최소화.
- **`sleep` AbortSignal 취소 지원**: `src/api/sleep/sleep.ts`에 `AbortSignal` 매개변수를 추가하여 React 컴포넌트 unmount, 비동기 작업 취소 시 불필요한 대기 없이 즉각적으로 타이머를 해제하고 중단할 수 있도록 개선.
- **`JobQueue` 상태 제어 API 확장**: `src/api/jobQueue/jobQueue.ts`에 대기열 크기 확인(`size()`), 큐 비우기(`clear()`), 현재 작업 중 여부(`isProcessing()`) 메서드를 추가하여 큐 상태 관리를 편리하게 개선.
- **테스트 스크립트 분리**: CI/CD 환경을 위한 `yarn test` (`--watchAll=false`)와 로컬 개발용 `yarn test:watch` (`--watchAll`)로 분리.

### 7.5 고급 패키지 구성 및 CI/CD 구축
- **서브패스 임포트 지원 (`exports` 필드)**: `package.json`에 도메인별 진입점(`isa-util/api`, `isa-util/storage`, `isa-util/format` 등)을 선언하여 세부 모듈 단위의 직접 import 및 타입 추론 지원.
- **GitHub Actions CI 워크플로우 구축**: `.github/workflows/ci.yml`을 추가하여 Node.js 18, 20, 22 매트릭스 상에서 단위 테스트 및 빌드를 자동 검증하는 CI 파이프라인 구성.
- **`download` 유틸리티 입력 타입 확장**: `src/export/download/download.ts`에서 기존 `Blob` 외에도 `string`, `ArrayBuffer`, `TypedArray`를 모두 허용하고, MIME 타입 자동 추론 및 파일명 경로 조작 방어 sanitize를 적용.

### 7.6 필수 도메인별 신규 유틸리티 함수 12종 추가 (New Feature Additions)
외부 런타임 의존성 제로(`dependencies: {}`) 원칙을 엄격하게 준수하며, 단위 테스트 및 TypeScript 타입을 완비한 유틸리티 12종을 추가 구현:
1. **`src/api/retry`**: 지수 백오프(exponential backoff)와 재시도 조건 콜백(`retryIf`), 실패 시 호출(`onError`)을 지원하는 강력한 비동기 재시도 유틸리티.
2. **`src/api/timeout`**: 비동기 Promise에 최대 실행 제한 시간을 지정하고, 초과 시 타임아웃 에러를 발생시키는 유틸리티.
3. **`src/dom/copyToClipboard`**: 최신 `navigator.clipboard.writeText`를 우선 사용하고 비보안 컨텍스트나 구형 환경을 위한 `document.execCommand('copy')` 폴백이 내장된 클립보드 복사 유틸리티.
4. **`src/dom/scrollToTop`**: `window` 또는 임의의 스크롤 컨테이너 요소를 부드럽게(`smooth`) 또는 즉시(`auto`) 최상단으로 스크롤하는 유틸리티.
5. **`src/format/formatBytes`**: 바이트 크기를 사람이 읽기 쉬운 규격(`B`, `KB`, `MB`, `GB`, `TB` 등)으로 변환하는 유틸리티.
6. **`src/format/mask`**: 이메일, 한국 휴대폰 번호, 사용자 지정 정규식 패턴을 개인정보 보호용 마스킹(`*`) 처리하는 유틸리티.
7. **`src/format/truncate`**: 긴 문자열을 지정된 길이에 맞춰 자르고 말줄임표(`...`)를 붙여주는 유틸리티.
8. **`src/storage/cookie`**: 브라우저 쿠키를 안전하게 읽고, 쓰고, 삭제하는 `getCookie`, `setCookie`, `removeCookie` 함수군.
9. **`src/storage/sessionStorage`**: JSON 직렬화/역직렬화 및 SSR/시크릿 모드 예외 방어가 내장된 `getSessionStorage`, `setSessionStorage`, `removeSessionStorage` 함수군.
10. **`src/typecheck/isEmpty`**: 문자열, 배열, 객체, Set, Map, 빈 값(`null`/`undefined`)이 비어있는지 검사하는 타입 가드 유틸리티.
11. **`src/typecheck/isEmail`**: 이메일 주소 형식의 유효성을 검사하는 타입 가드 유틸리티.
12. **`src/typecheck/isUrl`**: URL 주소(HTTP, HTTPS 등)의 유효성을 엄격하게 검증하는 타입 가드 유틸리티.

### 7.7 라이브러리 완성도 강화를 위한 신규 도메인 및 고급 유틸리티 15종 추가 (Full Suite Extension)
`Array`, `Object`, `Concurrency`, `Formatting/XSS`, `DOM` 전 영역에 걸쳐 현대적 TypeScript 유틸리티를 전면 보강:
1. **`src/array/chunk`**: 배열을 지정된 크기 단위의 하위 배열로 분할 (페이지네이션 및 청크 분할 처리).
2. **`src/array/unique`**: 원시값 및 사용자 정의 iteratee 함수(키 선택자)를 지원하는 고성능 중복 제거.
3. **`src/array/groupBy`**: 배열 요소를 특정 키/조건 함수를 기준으로 객체 형태로 그룹화.
4. **`src/array/shuffle`**: 원본 불변(Immutable) 원칙을 지키는 피셔-예이츠(Fisher-Yates) 기반 무작위 배열 셔플.
5. **`src/array/range`**: `start`, `end`, `step` 및 양수/음수 증감을 모두 지원하는 파이썬 스타일 숫자 범위 배열 생성기.
6. **`src/object/pick`**: 객체에서 특정 키만 타입 안전하게 추출.
7. **`src/object/omit`**: 객체에서 특정 키를 제외한 새로운 객체 생성.
8. **`src/object/deepClone`**: `WeakMap` 순환 참조 캐시와 `Date`, `RegExp`, `Map`, `Set` 인스턴스 복사를 완벽 지원하는 깊은 복사.
9. **`src/object/deepMerge`**: 프로토타입 오염(`__proto__`, `constructor`, `prototype`)을 원천 차단한 안전한 중첩 객체 깊은 병합.
10. **`src/api/concurrency` (`pMap`)**: 동시 실행 수(`concurrency`) 제한을 두고 비동기 작업을 병렬 처리하며, 결과 배열의 원래 순서를 보장하는 고성능 비동기 매퍼.
11. **`src/api/once`**: 함수가 최초 1회만 실행되도록 제한하고 이후 호출 시 첫 번째 실행 결과를 반환하는 래퍼.
12. **`src/format/kebabCase`**: camelCase, PascalCase, snake_case 및 공백 문자열을 kebab-case로 변환.
13. **`src/format/snakeCase` 개선**: camelCase/PascalCase 단어 경계 분리 지원 보강.
14. **`src/format/escapeHtml` & `unescapeHtml`**: HTML 특수문자(`&`, `<`, `>`, `"`, `'`)를 엔티티로 변환하여 XSS를 방어하고 복원하는 유틸리티.
15. **`src/dom/isInViewport`**: 뷰포트 내 요소 노출 여부(부분 노출 / 전체 노출 `fullyInView`, `offset` 마진)를 판별하는 SSR 안전 DOM 유틸리티.
16. **`src/dom/lockScroll`**: 모달 다이얼로그나 드로어 오픈 시 배경 스크롤을 `overflow: hidden`으로 잠그고 닫힐 때 이전 스타일을 복원하는 SSR 안전 유틸리티.
