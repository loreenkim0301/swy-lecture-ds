# swy-lecture-ds

강의 교안 · 기술 블로그 · 실습 문서에 최적화된 **드롭인(drop-in) 디자인 시스템**입니다.
PC·태블릿·모바일 3단 반응형을 기본으로 하고, 빌드 도구 없이 CSS/JS 파일 하나씩만 연결하면 바로 적용됩니다.

> **v0.1.0-draft** — 아직 초안입니다. [`loreenkim0301/swy-lecturenote`](https://github.com/loreenkim0301/swy-lecturenote) 강의 사이트에서 실사용 중인 디자인 시스템을 추출해 재구성했습니다.

## 왜 만들었나

기획자/강사가 AI 코딩 도구로 교안이나 실습 문서를 만들 때마다 카드, 안내 박스, 사이드바 목차, 코드/프롬프트 복사 박스를 매번 새로 짜지 않아도 되게 하는 것이 목표입니다.

## 빠른 시작 (개발자용)

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

모든 스타일은 `.sw-scope` 클래스 안에서만 적용됩니다. **호스트 페이지의 다른 영역은 건드리지 않습니다.**

전체 컴포넌트 데모는 [`docs/index.html`](./docs/index.html) 참고 (GitHub Pages로 배포 예정).

## 비개발자를 위한 더 쉬운 시작 (추천)

CDN, npm 같은 단어를 몰라도 됩니다. 이 라이브러리를 쓰는 대부분의 사람(기획자, 강사, AI로 페이지를 만드는 "바이브코더")은 개발자가 아닙니다. 아래 둘 중 하나만 하면 됩니다.

### 방법 A — 시작 파일 다운로드해서 바로 쓰기

1. [`starter.html`](./starter.html) 페이지를 여세요.
2. 오른쪽 위 **"Raw"** 버튼을 누르세요.
3. 키보드에서 `Ctrl+S`(맥은 `Cmd+S`)를 눌러 내 컴퓨터에 저장하세요. (파일 이름 끝이 `.html`인지 확인)
4. 저장한 파일을 더블클릭하면 브라우저에 바로 결과물이 보입니다.
5. 메모장(윈도우) / 텍스트 편집기(맥)로 그 파일을 열어서, "여기 제목을 바꾸세요" 처럼 써진 글자만 원하는 내용으로 바꾸고 저장하세요. `<div>`, `class` 같은 글자는 안 건드려도 됩니다.

### 방법 B — AI 채팅에게 프롬프트로 바로 시키기

ChatGPT·Claude·Gemini 아무 곳에나 아래 내용을 그대로 복사해서 붙여넣고, `[ ]` 안에 원하는 내용만 채워서 보내세요. CDN 연결은 AI가 알아서 해줍니다.

```text
아래 디자인 시스템을 사용해서 [예: 우리 학원 소개 페이지]를 하나의 .html 파일로 만들어줘.

디자인 시스템 CDN (반드시 <head> 안에 그대로 넣어줘):
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/loreenkim0301/swy-lecture-ds@main/dist/swy-lecture-ds.min.css">
<script src="https://cdn.jsdelivr.net/gh/loreenkim0301/swy-lecture-ds@main/dist/sw-ds.js" defer></script>

사용 규칙:
- 모든 콘텐츠는 <div class="sw-scope"> 안에 넣어줘.
- 카드는 .sw-card, 참고/팁/주의 문구는 .sw-note / .sw-tip / .sw-notice, 표는 .sw-tablewrap, 버튼은 .sw-btn 클래스를 써줘.
- 완성된 코드를 다른 설명 없이 .html 파일 하나로 줘.

내가 원하는 내용: [여기에 페이지에 들어갔으면 하는 내용을 자유롭게 적어줘]
```

AI가 만들어준 코드를 메모장에 붙여넣고 `.html`로 저장한 뒤 더블클릭하면 끝입니다.

## 사용 예시 두 가지

이 라이브러리는 두 가지 방식으로 쓸 수 있습니다. **먼저 어느 쪽인지 정하고 시작하세요.**

| | 방법 1. 컴포넌트만 쓰기 | 방법 2. 컴포넌트 + 작성 원칙 |
|---|---|---|
| 이런 상황에 추천 | 블로그 글 한 편에 카드·안내박스 정도만 예쁘게 넣고 싶다 | 목차·섹션이 있는 강의 교안/기술 문서를 처음부터 구조 있게 쓴다 |
| 필요한 것 | CSS/JS 파일 연결 | + [`docs/writing-guide.md`](./docs/writing-guide.md)의 6가지 규칙 |
| 강제되는 규칙 | 없음 (원하는 대로 조합) | 목차-제목 연결, 넘버링, 서술형 설명 우선 등 |

### 1) 컴포넌트만 순수하게 쓰기

작성 규칙 없이, 필요한 컴포넌트만 골라 씁니다. 기존 블로그 글 중간에 카드나 안내 박스 하나만 추가하고 싶을 때 이 방식을 쓰세요.

```html
<div class="sw-scope">
  <div class="sw-card">
    <h3>카드 제목</h3>
    <p>카드 본문</p>
  </div>

  <div class="sw-tip">
    <span class="sw-label">팁</span>
    이런 식으로 필요한 컴포넌트만 하나씩 갖다 쓰면 됩니다. 목차나 넘버링 규칙은 신경 쓰지 않아도 됩니다.
  </div>
</div>
```

### 2) 기본 컴포넌트 + 셀렉트웨이 교안 작성 원칙까지 적용

SELECTWAY가 실제 교안을 쓸 때 지키는 6가지 원칙(목차-제목 연결, 넘버링 체계, "제목→설명→보충자료" 순서, 출처 표시, 이미지 직접 제작, 톤앤매너)까지 함께 적용하는 방식입니다. 자세한 설명과 각 원칙의 이유는 **[`docs/writing-guide.md`](./docs/writing-guide.md)** 를 먼저 읽어보세요. 아래는 그 원칙을 반영한 최소 골격입니다.

```html
<div class="sw-scope sw-page">
  <aside class="sw-sidebar">
    <nav>
      <ol>
        <li><a href="#s1">1. 기획자의 제품 개발 흐름</a>
          <ol>
            <li><a href="#s1-1">1.1 기존 제품 개발 흐름</a></li>
            <li><a href="#s1-2">1.2 AI 이후 초기 기획 단계</a></li>
          </ol>
        </li>
      </ol>
    </nav>
  </aside>

  <div class="sw-content">
    <section>
      <h1 class="sw-section-title" id="s1">1. 기획자의 제품 개발 흐름</h1>

      <h2 class="sw-sub-title" id="s1-1">1.1 기존 제품 개발 흐름</h2>
      <!-- 원칙 3: 제목 다음은 항상 서술형 설명부터 -->
      <p>기존에는 기획자가 기획서를 쓰면 디자이너가 화면을 그리고, 개발자가 코드를 짜는 순서로 진행됐어요. 각 단계마다 사람이 바뀌다 보니 의도가 조금씩 손실되는 게 문제였죠.</p>

      <!-- 원칙 4: 인용한 데이터/이미지는 출처 표시 -->
      <div class="sw-cite">
        <span class="sw-cite-label">출처</span>
        SELECTWAY 자체 강의 자료 (2026)
      </div>
    </section>
  </div>
</div>
```

이 골격을 그대로 복사해서 섹션만 늘려나가면, `docs/writing-guide.md`의 체크리스트를 자연스럽게 따르게 됩니다.

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
