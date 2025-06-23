# shadcn/ui for Svelte 컴포넌트 가이드

현재 프로젝트에 shadcn/ui for Svelte가 성공적으로 설정되었습니다!

## 설치된 컴포넌트

현재 프로젝트에 설치된 컴포넌트들:

- ✅ **Button** - 다양한 스타일과 크기의 버튼
- ✅ **Card** - 콘텐츠를 구조화하는 컨테이너 (Header, Content, Description, Title)
- ✅ **Input** - 사용자 입력을 받는 필드
- ✅ **Label** - 입력 필드의 라벨
- ✅ **Badge** - 상태나 카테고리를 표시하는 작은 라벨

## 사용법

### 기본 import 방법

```typescript
import { Button } from '$lib/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
import { Input } from '$lib/components/ui/input';
import { Label } from '$lib/components/ui/label';
import { Badge } from '$lib/components/ui/badge';
```

### 컴포넌트 예제

#### Button 컴포넌트

```svelte
<Button>기본 버튼</Button>
<Button variant="secondary">보조 버튼</Button>
<Button variant="destructive">삭제 버튼</Button>
<Button variant="outline">아웃라인 버튼</Button>
<Button variant="ghost">고스트 버튼</Button>
<Button variant="link">링크 버튼</Button>

<!-- 크기 변형 -->
<Button size="sm">작은 버튼</Button>
<Button size="default">기본 크기</Button>
<Button size="lg">큰 버튼</Button>
```

#### Card 컴포넌트

```svelte
<Card>
	<CardHeader>
		<CardTitle>카드 제목</CardTitle>
		<CardDescription>카드 설명</CardDescription>
	</CardHeader>
	<CardContent>카드 내용이 여기에 들어갑니다.</CardContent>
</Card>
```

#### Input과 Label 컴포넌트

```svelte
<div class="space-y-2">
	<Label for="email">이메일</Label>
	<Input id="email" type="email" placeholder="이메일을 입력하세요" />
</div>
```

#### Badge 컴포넌트

```svelte
<Badge>기본 Badge</Badge>
<Badge variant="secondary">보조 Badge</Badge>
<Badge variant="destructive">삭제 Badge</Badge>
<Badge variant="outline">아웃라인 Badge</Badge>
```

## 더 많은 컴포넌트 추가하기

새로운 컴포넌트를 추가하려면 다음 명령어를 사용하세요:

```bash
npx shadcn-svelte@latest add [컴포넌트명]
```

### 인기 있는 컴포넌트들

```bash
# 알림 컴포넌트
npx shadcn-svelte@latest add alert

# 체크박스
npx shadcn-svelte@latest add checkbox

# 다이얼로그/모달
npx shadcn-svelte@latest add dialog

# 드롭다운 메뉴
npx shadcn-svelte@latest add dropdown-menu

# 탭
npx shadcn-svelte@latest add tabs

# 토스트 알림
npx shadcn-svelte@latest add toast

# 테이블
npx shadcn-svelte@latest add table

# 진행 표시줄
npx shadcn-svelte@latest add progress
```

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 예제를 확인할 수 있습니다.

## 설정 파일

- `components.json` - shadcn/ui 설정 파일
- `src/app.css` - Tailwind CSS와 shadcn/ui 스타일이 포함된 글로벌 CSS 파일

## SQLite 데이터베이스 예제

프로젝트에 SQLite 데이터베이스를 사용한 간단한 Todo 앱 예제가 포함되어 있습니다.

### 특징

- **better-sqlite3** 사용으로 빠르고 안정적인 SQLite 연동
- **SvelteKit API routes**를 통한 RESTful API 구현
- **TypeScript** 타입 안전성
- **shadcn/ui** 컴포넌트를 사용한 아름다운 UI

### 데이터베이스 구조

- **Users 테이블**: 사용자 정보 (id, name, email, created_at)
- **Todos 테이블**: 할 일 정보 (id, title, description, completed, user_id, created_at)

### API 엔드포인트

- `GET /api/users` - 모든 사용자 조회
- `POST /api/users` - 새 사용자 생성
- `GET /api/todos` - 모든 할 일 조회
- `GET /api/todos?userId=1` - 특정 사용자의 할 일 조회
- `POST /api/todos` - 새 할 일 생성
- `PUT /api/todos/[id]` - 할 일 업데이트
- `PATCH /api/todos/[id]` - 할 일 완료 상태 토글
- `DELETE /api/todos/[id]` - 할 일 삭제

### 사용법

브라우저에서 `/database` 경로로 접속하여 데이터베이스 예제를 확인할 수 있습니다.

## 유용한 링크

- [shadcn/ui for Svelte 공식 문서](https://shadcn-svelte.com/)
- [사용 가능한 모든 컴포넌트 목록](https://shadcn-svelte.com/docs/components)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [better-sqlite3 문서](https://github.com/WiseLibs/better-sqlite3)
