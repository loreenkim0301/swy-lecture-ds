# swy-lecture-ds

강의 교안 · 기술 블로그 · 실습 문서에 최적화된 **드롭인(drop-in) 디자인 시스템**입니다.
PC·태블릿·모바일 3단 반응형을 기본으로 하고, 빌드 도구 없이 CSS/JS 파일 하나씩만 연결하면 바로 적용됩니다.

> **v0.1.0-draft** — 아직 초안입니다. [`loreenkim0301/swy-lecturenote`](https://github.com/loreenkim0301/swy-lecturenote) 강의 사이트에서 실사용 중인 디자인 시스템을 추출해 재구성했습니다.

## 왜 만들었나

기획자/강사가 AI 코딩 도구로 교안이나 실습 문서를 만들 때마다 카드, 안내 박스, 사이드바 목차, 코드/프롬프트 복사 박스를 매번 새로 짜지 않아도 되게 하는 것이 목표입니다.

## 빠른 시작

### 방법 1 — CDN (빌드 도구 불필요, 가장 빠름)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swy-lecture-ds/dist/swy-lecture-ds.min.css">
<script src="https://cdn.jsdelivr.net/npm/swy-lecture-ds/dist/sw-ds.js" defer></script>
```

> npm 배포(`npm publish`) 전까지는 jsdelivr의 GitHub 모드로 대체할 수 있습니다:
> `https://cdn.jsdelivr.net/gh/loreenkim0301/swy-lecture-ds@main/dist/swy-lecture-ds.min.css`

### 방법 2 — npm

```bash
npm install swy-lecture-ds
```

```css
@import "swy-lecture-ds/dist/swy-lecture-ds.css";
```

### 사용법

모든 스타일은 `.sw-scope` 클래스 안에서만 적용됩니다. **호스트 페이지의 다른 영역은 건드리지 않습니다.**

```html
<div class="sw-scope">
  <div class="sw-card">
    <h3>카드 제목</h3>
    <p>카드 본문</p>
  </div>
</div>
```

전체 컴포넌트 데모는 [`docs/index.html`](./docs/index.html) 참고 (GitHub Pages로 배포 예정).

## 왜 `.sw-scope`로 감쌌나 (중요)

기존 swy-lecturenote의 CSS는 `body`, `a`, `h1` 같은 전역 태그 선택자를 직접 재정의합니다. 그 사이트는 페이지 전체를 소유하니 문제가 없었지만, **다른 사람의 블로그·사이트에 이 라이브러리를 얹으면 그 사이트의 나머지 스타일을 다 깨뜨립니다.** 그래서 이 라이브러리는:

- 모든 CSS 변수에 `--sw-` 접두어
- 모든 클래스에 `sw-` 접두어
- 리셋/타이포그래피는 `.sw-scope` 안에서만 적용

이 세 가지 규칙을 지킵니다. 100% 충돌 방지는 아니지만(예: 클래스명이 극단적으로 흔한 경우) 실무적으로 충분한 수준입니다.

## 포함된 컴포넌트 (v0.1 기준)

| 분류 | 클래스 |
|---|---|
| 레이아웃 | `.sw-page`, `.sw-sidebar`, `.sw-content` (PC/태블릿/모바일 반응형) |
| 표지/섹션 | `.sw-doc-header`, `.sw-section-title`, `.sw-sub-title` |
| 그리드 | `.sw-grid2` / `.sw-grid3` / `.sw-grid4`, `.sw-compare` |
| 카드 | `.sw-card` |
| 안내 박스 | `.sw-note`, `.sw-tip`, `.sw-notice`, `.sw-story` |
| 프롬프트/코드 박스 | `.sw-prompt-box`, `.sw-copy-btn` (`data-sw-copy`로 자동 복사 동작) |
| 표 | `.sw-tablewrap` |
| 목차 카드 | `.sw-toc-list`, `.sw-toc-item` |
| 전체화면 모달 | `.sw-modal` (`data-sw-modal-open` / `data-sw-modal-close`) |
| 버튼/배지 | `.sw-btn`, `.sw-badge` |

**의도적으로 뺀 것**: swy-lecturenote에만 있던 `browser-mock` / `chat-mock` / `github-mock` 같은 특정 화면 재현용 목업 컴포넌트는 범용성이 낮아 v0.1에서는 제외했습니다. 필요성이 확인되면 별도 확장 패키지로 추가하겠습니다.

## 반응형 기준

| 구간 | 폭 | 동작 |
|---|---|---|
| PC | 1024px 이상 | 사이드바 항상 노출 (260px 고정) |
| 태블릿 | 641px – 1023px | 사이드바 접이식(토글 버튼) |
| 모바일 | 640px 이하 | 사이드바 접이식 + 본문 여백 축소 |

## 로드맵

- [x] v0.1: 핵심 토큰 + 컴포넌트 CSS, 동작 스크립트(`sw-ds.js`), 데모 페이지
- [ ] GitHub Pages로 데모 배포
- [ ] npm 배포 (`npm publish`) + jsdelivr npm CDN 연결
- [ ] **Phase 2 (검토 중)**: MCP 서버로 디자인 토큰·컴포넌트 레시피를 노출해, Claude Code 등 AI 코딩 도구가 이 디자인 시스템에 맞는 마크업을 바로 생성하도록 지원 (예: shadcn/ui의 MCP 사례 참고). 실제 구현 전 최신 배포 관행을 다시 확인할 예정.

## 라이선스

MIT — Copyright (c) 2026 SELECTWAY (김수정, Loreen Kim)
