<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';

	let name = '';
	let email = '';
	let submitted = false;

	function handleSubmit() {
		if (name && email) {
			submitted = true;
		}
	}

	function reset() {
		name = '';
		email = '';
		submitted = false;
	}
</script>

<svelte:head>
	<title>shadcn/ui Svelte 예제</title>
	<meta name="description" content="shadcn/ui for Svelte 컴포넌트 예제" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-8 text-center text-4xl font-bold text-gray-900">shadcn/ui for Svelte 예제</h1>
		
		<div class="mb-8 text-center">
			<Button onclick={() => window.location.href = '/database'} size="lg">
				SQLite 데이터베이스 예제 보기 →
			</Button>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- 폼 카드 -->
			<Card>
				<CardHeader>
					<CardTitle>사용자 정보 입력</CardTitle>
					<CardDescription>
						아래 폼을 작성해 주세요. shadcn/ui 컴포넌트들을 사용했습니다.
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					{#if !submitted}
						<div class="space-y-2">
							<Label for="name">이름</Label>
							<Input id="name" bind:value={name} placeholder="이름을 입력하세요" type="text" />
						</div>
						<div class="space-y-2">
							<Label for="email">이메일</Label>
							<Input id="email" bind:value={email} placeholder="이메일을 입력하세요" type="email" />
						</div>
						<Button onclick={handleSubmit} class="w-full">제출하기</Button>
					{:else}
						<div class="rounded-lg bg-green-50 p-4 text-center">
							<h3 class="text-lg font-semibold text-green-800">제출 완료!</h3>
							<p class="text-green-600">안녕하세요, {name}님!</p>
							<p class="text-sm text-green-600">이메일: {email}</p>
							<Button onclick={reset} variant="outline" class="mt-4">다시 입력하기</Button>
						</div>
					{/if}
				</CardContent>
			</Card>

			<!-- 버튼 예제 카드 -->
			<Card>
				<CardHeader>
					<CardTitle>버튼 예제</CardTitle>
					<CardDescription>다양한 스타일의 shadcn/ui 버튼들을 확인해보세요.</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Button>기본 버튼</Button>
						<Button variant="secondary">보조 버튼</Button>
						<Button variant="destructive">삭제 버튼</Button>
						<Button variant="outline">아웃라인 버튼</Button>
						<Button variant="ghost">고스트 버튼</Button>
						<Button variant="link">링크 버튼</Button>
					</div>
					<div class="flex flex-wrap gap-2">
						<Button size="sm">작은 버튼</Button>
						<Button size="default">기본 크기</Button>
						<Button size="lg">큰 버튼</Button>
					</div>
					<div class="flex gap-2">
						<Button disabled>비활성화된 버튼</Button>
					</div>
				</CardContent>
			</Card>

			<!-- 입력 필드 예제 카드 -->
			<Card>
				<CardHeader>
					<CardTitle>입력 필드 예제</CardTitle>
					<CardDescription>다양한 타입의 입력 필드들을 확인해보세요.</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="space-y-2">
						<Label for="text-input">텍스트 입력</Label>
						<Input id="text-input" placeholder="텍스트를 입력하세요" />
					</div>
					<div class="space-y-2">
						<Label for="password-input">비밀번호 입력</Label>
						<Input id="password-input" type="password" placeholder="비밀번호를 입력하세요" />
					</div>
					<div class="space-y-2">
						<Label for="number-input">숫자 입력</Label>
						<Input id="number-input" type="number" placeholder="숫자를 입력하세요" />
					</div>
					<div class="space-y-2">
						<Label for="disabled-input">비활성화된 입력</Label>
						<Input id="disabled-input" disabled placeholder="비활성화된 입력 필드" />
					</div>
				</CardContent>
			</Card>

			<!-- Badge 예제 카드 -->
			<Card>
				<CardHeader>
					<CardTitle>Badge 예제</CardTitle>
					<CardDescription>다양한 스타일의 Badge 컴포넌트들을 확인해보세요.</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Badge>기본 Badge</Badge>
						<Badge variant="secondary">보조 Badge</Badge>
						<Badge variant="destructive">삭제 Badge</Badge>
						<Badge variant="outline">아웃라인 Badge</Badge>
					</div>
					<div class="flex flex-wrap gap-2">
						<Badge>New</Badge>
						<Badge variant="secondary">Popular</Badge>
						<Badge variant="destructive">Urgent</Badge>
						<Badge variant="outline">Draft</Badge>
					</div>
					<div class="space-y-2">
						<p class="text-sm text-gray-600">상태 표시 예제:</p>
						<div class="flex gap-2">
							<span class="text-sm">상태:</span>
							<Badge variant="secondary">진행 중</Badge>
						</div>
						<div class="flex gap-2">
							<span class="text-sm">우선순위:</span>
							<Badge variant="destructive">높음</Badge>
						</div>
					</div>
				</CardContent>
			</Card>

			<!-- 정보 카드 -->
			<Card>
				<CardHeader>
					<CardTitle>shadcn/ui 정보</CardTitle>
					<CardDescription>이 예제에서 사용된 컴포넌트들에 대한 정보입니다.</CardDescription>
				</CardHeader>
				<CardContent>
					<ul class="space-y-2 text-sm">
						<li>✅ <strong>Button:</strong> 다양한 variant와 size를 지원</li>
						<li>✅ <strong>Card:</strong> 콘텐츠를 구조화하는 컨테이너</li>
						<li>✅ <strong>Input:</strong> 사용자 입력을 받는 필드</li>
						<li>✅ <strong>Label:</strong> 입력 필드의 라벨</li>
						<li>✅ <strong>Badge:</strong> 상태나 카테고리를 표시하는 작은 라벨</li>
					</ul>
					<div class="mt-4 rounded-lg bg-blue-50 p-3">
						<p class="text-sm text-blue-800">
							<strong>팁:</strong> 더 많은 컴포넌트를 추가하려면
							<code class="rounded bg-blue-100 px-1">npx shadcn-svelte@latest add [컴포넌트명]</code
							>
							명령을 사용하세요!
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
