# SvelteKit 프로젝트 구조 및 개발 가이드

## 📁 프로젝트 구조 개요

```
my-app/
├── src/                          # 소스 코드 디렉토리
│   ├── app.css                   # 글로벌 CSS 스타일
│   ├── app.d.ts                  # TypeScript 전역 타입 선언
│   ├── app.html                  # HTML 템플릿
│   ├── lib/                      # 재사용 가능한 라이브러리 코드
│   │   ├── components/           # 공통 컴포넌트들
│   │   │   └── ui/              # shadcn/ui 컴포넌트들
│   │   │       ├── badge/       # Badge 컴포넌트
│   │   │       ├── button/      # Button 컴포넌트
│   │   │       ├── card/        # Card 컴포넌트
│   │   │       ├── input/       # Input 컴포넌트
│   │   │       └── label/       # Label 컴포넌트
│   │   ├── database.ts          # SQLite 데이터베이스 설정
│   │   ├── index.ts             # 라이브러리 진입점
│   │   └── utils/               # 유틸리티 함수들
│   └── routes/                   # 라우팅 및 페이지들
│       ├── +layout.svelte       # 공통 레이아웃
│       ├── +page.svelte         # 메인 페이지
│       ├── api/                 # API 엔드포인트들
│       │   ├── users/           # 사용자 관련 API
│       │   │   └── +server.ts   # 사용자 API 서버 로직
│       │   └── todos/           # 할 일 관련 API
│       │       ├── +server.ts   # 할 일 API 서버 로직
│       │       └── [id]/        # 동적 라우트 (개별 할 일)
│       │           └── +server.ts
│       └── database/            # 데이터베이스 예제 페이지
│           └── +page.svelte     # 데이터베이스 데모 페이지
├── static/                       # 정적 파일들
│   └── favicon.png              # 파비콘
├── .svelte-kit/                 # SvelteKit 빌드 파일들 (자동 생성)
├── node_modules/                # npm 패키지들
├── components.json              # shadcn/ui 설정 파일
├── database.db                  # SQLite 데이터베이스 파일
├── eslint.config.js             # ESLint 설정
├── package.json                 # 프로젝트 의존성 및 스크립트
├── package-lock.json            # 정확한 의존성 버전 잠금
├── README.md                    # 프로젝트 기본 설명
├── SHADCN_COMPONENTS.md         # shadcn/ui 컴포넌트 가이드
├── svelte.config.js             # Svelte 설정
├── tsconfig.json                # TypeScript 설정
└── vite.config.ts               # Vite 빌드 도구 설정
```

## 📋 주요 파일 및 폴더 상세 설명

### 🎯 **핵심 디렉토리**

#### `src/` - 소스 코드의 심장부

모든 애플리케이션 코드가 위치하는 곳입니다. SvelteKit은 이 폴더를 기준으로 작동합니다.

#### `src/routes/` - 페이지와 API의 집합소

- **파일 기반 라우팅**: 폴더와 파일 구조가 URL 구조와 직접 연결됩니다
- **+page.svelte**: 해당 경로의 페이지 컴포넌트
- **+layout.svelte**: 여러 페이지에서 공유하는 레이아웃
- **+server.ts**: API 엔드포인트 (GET, POST, PUT, DELETE 등)
- **[id]**: 대괄호로 감싼 폴더는 동적 라우트 (예: `/todos/123`)

#### `src/lib/` - 재사용 가능한 코드 저장소

- **$lib**: SvelteKit의 특별한 alias로, `import { something } from '$lib/...'` 형태로 사용
- **components/**: 재사용 가능한 Svelte 컴포넌트들
- **utils/**: 유틸리티 함수들
- **database.ts**: 데이터베이스 연결 및 쿼리 함수들

### 🔧 **설정 파일들**

#### `package.json` - 프로젝트의 신분증

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "vite dev",        // 개발 서버 실행
    "build": "vite build",    // 프로덕션 빌드
    "preview": "vite preview" // 빌드 결과 미리보기
  },
  "dependencies": { ... },    // 런타임 의존성
  "devDependencies": { ... } // 개발 시에만 필요한 의존성
}
```

#### `svelte.config.js` - Svelte/SvelteKit 설정

```javascript
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(), // CSS 전처리, TypeScript 컴파일 등
	kit: {
		adapter: adapter() // 배포 환경에 맞는 어댑터
	}
};
```

#### `vite.config.ts` - Vite 빌드 도구 설정

Vite는 빠른 개발 서버와 효율적인 번들링을 제공합니다.

#### `tsconfig.json` - TypeScript 설정

타입 검사, 컴파일 옵션, 경로 별칭 등을 설정합니다.

### 🎨 **스타일링 관련**

#### `src/app.css` - 글로벌 스타일

- Tailwind CSS 설정
- shadcn/ui 테마 변수들
- 전역적으로 적용되는 스타일들

#### `components.json` - shadcn/ui 설정

```json
{
	"aliases": {
		"components": "$lib/components",
		"utils": "$lib/utils",
		"ui": "$lib/components/ui"
	},
	"tailwind": {
		"css": "src\\app.css",
		"baseColor": "slate"
	}
}
```

## 🚀 SvelteKit의 주요 장점

### 1. **파일 기반 라우팅**

```
src/routes/
├── +page.svelte           → /
├── about/+page.svelte     → /about
├── blog/
│   ├── +page.svelte       → /blog
│   └── [slug]/+page.svelte → /blog/my-post
└── api/
    └── users/+server.ts   → /api/users
```

### 2. **서버 사이드 렌더링 (SSR) & 정적 사이트 생성 (SSG)**

- **SEO 최적화**: 검색 엔진이 콘텐츠를 쉽게 인덱싱
- **빠른 초기 로딩**: 서버에서 완성된 HTML 제공
- **하이드레이션**: 클라이언트에서 인터랙티브하게 변환

### 3. **풀스택 개발 가능**

- **API 라우트**: 같은 프로젝트에서 백엔드 API 구축
- **데이터베이스 연동**: 서버 사이드에서 직접 데이터베이스 접근
- **인증, 세션 관리**: 서버 사이드에서 안전하게 처리

### 4. **뛰어난 개발자 경험**

- **Hot Module Replacement**: 코드 변경 시 즉시 반영
- **TypeScript 완벽 지원**: 타입 안전성과 자동완성
- **빌트인 최적화**: 코드 스플리팅, 트리 쉐이킹 자동 적용

### 5. **작은 번들 크기**

- **컴파일 타임 최적화**: 런타임 오버헤드 최소화
- **Reactive 시스템**: 효율적인 DOM 업데이트

## 📊 데이터 Fetching 패턴

### 1. **페이지 로드 시 데이터 가져오기**

#### `+page.ts` (또는 `+page.js`) 사용

```typescript
// src/routes/posts/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/posts');
	const posts = await response.json();

	return {
		posts
	};
};
```

```svelte
<!-- src/routes/posts/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ posts } = data);
</script>

{#each posts as post}
	<article>
		<h2>{post.title}</h2>
		<p>{post.content}</p>
	</article>
{/each}
```

### 2. **서버 사이드 데이터 로딩**

#### `+page.server.ts` 사용 (서버에서만 실행)

```typescript
// src/routes/dashboard/+page.server.ts
import { userQueries } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	// 서버에서만 실행되므로 데이터베이스 직접 접근 가능
	const users = userQueries.getAll.all();

	return {
		users
	};
};
```

### 3. **클라이언트 사이드 데이터 Fetching**

```svelte
<script lang="ts">
	import { onMount } from 'svelte';

	let data = [];
	let loading = true;
	let error = '';

	async function fetchData() {
		try {
			loading = true;
			const response = await fetch('/api/data');
			if (response.ok) {
				data = await response.json();
			} else {
				throw new Error('데이터 로딩 실패');
			}
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	onMount(fetchData);
</script>

{#if loading}
	<p>로딩 중...</p>
{:else if error}
	<p>오류: {error}</p>
{:else}
	{#each data as item}
		<div>{item.name}</div>
	{/each}
{/if}
```

### 4. **실시간 데이터 업데이트**

```svelte
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let data = [];
	let interval;

	async function updateData() {
		const response = await fetch('/api/realtime-data');
		data = await response.json();
	}

	onMount(() => {
		updateData(); // 초기 로드
		interval = setInterval(updateData, 5000); // 5초마다 업데이트
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>
```

## 🏗️ 개발 구조 가이드

### 1. **컴포넌트 구조화**

```
src/lib/components/
├── ui/                    # 기본 UI 컴포넌트 (shadcn/ui)
│   ├── button/
│   ├── card/
│   └── input/
├── layout/                # 레이아웃 관련 컴포넌트
│   ├── Header.svelte
│   ├── Footer.svelte
│   └── Sidebar.svelte
├── features/              # 기능별 컴포넌트
│   ├── user/
│   │   ├── UserCard.svelte
│   │   └── UserList.svelte
│   └── todo/
│       ├── TodoItem.svelte
│       └── TodoForm.svelte
└── common/                # 공통 컴포넌트
    ├── LoadingSpinner.svelte
    └── ErrorMessage.svelte
```

### 2. **API 구조화**

```
src/routes/api/
├── users/
│   ├── +server.ts         # GET /api/users, POST /api/users
│   └── [id]/
│       └── +server.ts     # GET/PUT/DELETE /api/users/[id]
├── posts/
│   ├── +server.ts
│   └── [slug]/
│       └── +server.ts
└── auth/
    ├── login/+server.ts
    └── logout/+server.ts
```

### 3. **상태 관리**

#### Svelte Stores 활용

```typescript
// src/lib/stores/user.ts
import { writable } from 'svelte/store';
import type { User } from '$lib/types';

export const currentUser = writable<User | null>(null);
export const users = writable<User[]>([]);

// 사용자 관련 액션들
export const userActions = {
	async fetchUsers() {
		const response = await fetch('/api/users');
		const userData = await response.json();
		users.set(userData);
	},

	async createUser(userData: Partial<User>) {
		const response = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData)
		});

		if (response.ok) {
			this.fetchUsers(); // 목록 새로고침
		}
	}
};
```

```svelte
<!-- 컴포넌트에서 사용 -->
<script lang="ts">
	import { users, userActions } from '$lib/stores/user';
	import { onMount } from 'svelte';

	onMount(() => {
		userActions.fetchUsers();
	});
</script>

{#each $users as user}
	<div>{user.name}</div>
{/each}
```

### 4. **타입 정의**

```typescript
// src/lib/types/index.ts
export interface User {
	id: number;
	name: string;
	email: string;
	created_at: string;
}

export interface Todo {
	id: number;
	title: string;
	description?: string;
	completed: boolean;
	user_id: number;
	created_at: string;
}

export interface ApiResponse<T> {
	data: T;
	message?: string;
	error?: string;
}
```

## 🛠️ 개발 워크플로우

### 1. **새로운 기능 개발 순서**

1. **타입 정의** (`src/lib/types/`)
2. **데이터베이스 스키마** (`src/lib/database.ts`)
3. **API 엔드포인트** (`src/routes/api/`)
4. **컴포넌트 개발** (`src/lib/components/`)
5. **페이지 구성** (`src/routes/`)
6. **테스트 및 디버깅**

### 2. **데이터 흐름 패턴**

```
사용자 액션 → 컴포넌트 → API 호출 → 데이터베이스 → 응답 → 상태 업데이트 → UI 재렌더링
```

### 3. **에러 처리 패턴**

```typescript
// API에서
try {
	const result = await someOperation();
	return json({ data: result });
} catch (error) {
	console.error('Operation failed:', error);
	return json({ error: '작업 실행 중 오류가 발생했습니다.' }, { status: 500 });
}
```

```svelte
<!-- 컴포넌트에서 -->
<script lang="ts">
  let error = '';
  let loading = false;
  
  async function handleSubmit() {
    try {
      loading = true;
      error = '';
      
      const response = await fetch('/api/endpoint', { ... });
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || '요청 처리 실패');
      }
      
      // 성공 처리
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

{#if error}
	<div class="error">{error}</div>
{/if}
```

## 🎯 실제 개발 시나리오 예제

### 시나리오: 블로그 포스트 관리 시스템 추가

#### 1단계: 타입 정의

```typescript
// src/lib/types/blog.ts
export interface BlogPost {
	id: number;
	title: string;
	content: string;
	author_id: number;
	published: boolean;
	created_at: string;
	updated_at: string;
}
```

#### 2단계: 데이터베이스 스키마 추가

```typescript
// src/lib/database.ts에 추가
db.exec(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (id)
  )
`);
```

#### 3단계: API 엔드포인트

```typescript
// src/routes/api/posts/+server.ts
import { json } from '@sveltejs/kit';
import { blogQueries } from '$lib/database';

export const GET = async () => {
	const posts = blogQueries.getAll.all();
	return json(posts);
};

export const POST = async ({ request }) => {
	const { title, content, author_id } = await request.json();
	const result = blogQueries.create.run(title, content, author_id);
	return json({ id: result.lastInsertRowid });
};
```

#### 4단계: 컴포넌트 개발

```svelte
<!-- src/lib/components/blog/PostCard.svelte -->
<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import type { BlogPost } from '$lib/types/blog';

	export let post: BlogPost;
</script>

<Card>
	<CardHeader>
		<CardTitle>{post.title}</CardTitle>
		<Badge variant={post.published ? 'default' : 'secondary'}>
			{post.published ? '발행됨' : '초안'}
		</Badge>
	</CardHeader>
	<CardContent>
		<p>{post.content.substring(0, 150)}...</p>
		<small>작성일: {new Date(post.created_at).toLocaleDateString()}</small>
	</CardContent>
</Card>
```

#### 5단계: 페이지 구성

```svelte
<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import PostCard from '$lib/components/blog/PostCard.svelte';
	import type { BlogPost } from '$lib/types/blog';

	let posts: BlogPost[] = [];

	onMount(async () => {
		const response = await fetch('/api/posts');
		posts = await response.json();
	});
</script>

<h1>블로그 포스트</h1>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each posts as post}
		<PostCard {post} />
	{/each}
</div>
```

## 🚀 성능 최적화 팁

### 1. **이미지 최적화**

```svelte
<!-- 반응형 이미지 -->
<img
	src="/images/hero.jpg"
	alt="Hero image"
	loading="lazy"
	sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 2. **코드 스플리팅**

```typescript
// 동적 import로 컴포넌트 지연 로딩
const LazyComponent = await import('$lib/components/HeavyComponent.svelte');
```

### 3. **데이터 캐싱**

```typescript
// +page.ts에서 캐시 헤더 설정
export const load = async ({ fetch }) => {
	const response = await fetch('/api/data', {
		headers: { 'Cache-Control': 'max-age=300' } // 5분 캐시
	});
	return { data: await response.json() };
};
```

## 🔧 유용한 개발 도구

### 1. **Svelte DevTools**

브라우저 확장 프로그램으로 컴포넌트 상태와 props를 실시간으로 확인할 수 있습니다.

### 2. **VS Code 확장**

- **Svelte for VS Code**: 구문 강조, 자동완성, 오류 검사
- **Tailwind CSS IntelliSense**: Tailwind 클래스 자동완성

### 3. **디버깅**

```svelte
<script lang="ts">
	let data = { name: 'John', age: 30 };

	// 개발 모드에서만 로그 출력
	$: if (import.meta.env.DEV) {
		console.log('Data changed:', data);
	}
</script>
```

## 📚 추가 학습 리소스

### 공식 문서

- [SvelteKit 공식 문서](https://kit.svelte.dev/docs)
- [Svelte 공식 문서](https://svelte.dev/docs)
- [Vite 문서](https://vitejs.dev/)

### 커뮤니티

- [Svelte Discord](https://svelte.dev/chat)
- [Reddit r/sveltejs](https://www.reddit.com/r/sveltejs/)

### 예제 프로젝트

- [SvelteKit 예제들](https://github.com/sveltejs/kit/tree/master/examples)
- [Svelte Society 레시피](https://sveltesociety.dev/recipes)

---

## 🎉 마무리

이 가이드를 통해 SvelteKit의 강력함을 느끼셨기를 바랍니다. SvelteKit은 현대적인 웹 개발의 모든 요구사항을 충족하면서도 개발자 친화적인 경험을 제공합니다.

**핵심 포인트:**

- 📁 **파일 기반 라우팅**으로 직관적인 구조
- 🚀 **SSR/SSG** 지원으로 뛰어난 성능과 SEO
- 🔗 **풀스택 개발** 가능으로 하나의 프로젝트에서 모든 것 해결
- 🎨 **shadcn/ui + Tailwind CSS**로 아름다운 UI 구축
- 💾 **SQLite + better-sqlite3**로 간단하고 효율적인 데이터 관리

지금부터 이 구조를 바탕으로 멋진 웹 애플리케이션을 만들어보세요! 🚀
