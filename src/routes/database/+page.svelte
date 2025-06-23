<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';
	import type { User, Todo } from '$lib/database';

	let users: User[] = [];
	let todos: (Todo & { user_name: string; user_email: string })[] = [];
	let selectedUserId: number | null = null;
	let loading = false;
	let error = '';

	// 새 사용자 폼
	let newUserName = '';
	let newUserEmail = '';

	// 새 할 일 폼
	let newTodoTitle = '';
	let newTodoDescription = '';

	// 데이터 로드
	async function loadUsers() {
		try {
			const response = await fetch('/api/users');
			if (response.ok) {
				users = await response.json();
			} else {
				throw new Error('사용자 로드 실패');
			}
		} catch (err) {
			error = '사용자를 불러올 수 없습니다.';
			console.error(err);
		}
	}

	async function loadTodos() {
		try {
			const url = selectedUserId ? `/api/todos?userId=${selectedUserId}` : '/api/todos';
			const response = await fetch(url);
			if (response.ok) {
				todos = await response.json();
			} else {
				throw new Error('할 일 로드 실패');
			}
		} catch (err) {
			error = '할 일을 불러올 수 없습니다.';
			console.error(err);
		}
	}

	// 새 사용자 생성
	async function createUser() {
		if (!newUserName || !newUserEmail) {
			error = '이름과 이메일을 모두 입력해주세요.';
			return;
		}

		loading = true;
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: newUserName, email: newUserEmail })
			});

			if (response.ok) {
				newUserName = '';
				newUserEmail = '';
				await loadUsers();
				error = '';
			} else {
				const errorData = await response.json();
				error = errorData.error || '사용자 생성에 실패했습니다.';
			}
		} catch (err) {
			error = '사용자 생성 중 오류가 발생했습니다.';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	// 새 할 일 생성
	async function createTodo() {
		if (!newTodoTitle || !selectedUserId) {
			error = '할 일 제목을 입력하고 사용자를 선택해주세요.';
			return;
		}

		loading = true;
		try {
			const response = await fetch('/api/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: newTodoTitle,
					description: newTodoDescription,
					user_id: selectedUserId
				})
			});

			if (response.ok) {
				newTodoTitle = '';
				newTodoDescription = '';
				await loadTodos();
				error = '';
			} else {
				const errorData = await response.json();
				error = errorData.error || '할 일 생성에 실패했습니다.';
			}
		} catch (err) {
			error = '할 일 생성 중 오류가 발생했습니다.';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	// 할 일 완료 상태 토글
	async function toggleTodo(id: number) {
		try {
			const response = await fetch(`/api/todos/${id}`, {
				method: 'PATCH'
			});

			if (response.ok) {
				await loadTodos();
			} else {
				throw new Error('할 일 상태 변경 실패');
			}
		} catch (err) {
			error = '할 일 상태를 변경할 수 없습니다.';
			console.error(err);
		}
	}

	// 할 일 삭제
	async function deleteTodo(id: number) {
		if (!confirm('이 할 일을 삭제하시겠습니까?')) return;

		try {
			const response = await fetch(`/api/todos/${id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				await loadTodos();
			} else {
				throw new Error('할 일 삭제 실패');
			}
		} catch (err) {
			error = '할 일을 삭제할 수 없습니다.';
			console.error(err);
		}
	}

	// 사용자 선택 변경
	function selectUser(userId: number | null) {
		selectedUserId = userId;
		loadTodos();
	}

	// 컴포넌트 마운트 시 데이터 로드
	onMount(() => {
		loadUsers();
		loadTodos();
	});
</script>

<svelte:head>
	<title>SQLite 데이터베이스 예제</title>
	<meta name="description" content="SvelteKit과 SQLite를 사용한 간단한 Todo 앱" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-4 text-center">
			<Button onclick={() => window.location.href = '/'} variant="outline">
				← shadcn/ui 예제로 돌아가기
			</Button>
		</div>
		
		<h1 class="mb-8 text-center text-4xl font-bold text-gray-900">
			SQLite 데이터베이스 예제
		</h1>

		{#if error}
			<div class="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
				<p class="font-semibold">오류:</p>
				<p>{error}</p>
				<Button onclick={() => (error = '')} variant="outline" size="sm" class="mt-2">
					닫기
				</Button>
			</div>
		{/if}

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- 사용자 관리 -->
			<div class="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>사용자 관리</CardTitle>
						<CardDescription>새로운 사용자를 추가하고 관리하세요.</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="space-y-2">
							<Label for="user-name">이름</Label>
							<Input
								id="user-name"
								bind:value={newUserName}
								placeholder="사용자 이름을 입력하세요"
								disabled={loading}
							/>
						</div>
						<div class="space-y-2">
							<Label for="user-email">이메일</Label>
							<Input
								id="user-email"
								type="email"
								bind:value={newUserEmail}
								placeholder="이메일을 입력하세요"
								disabled={loading}
							/>
						</div>
						<Button onclick={createUser} disabled={loading} class="w-full">
							{loading ? '생성 중...' : '사용자 추가'}
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>사용자 목록</CardTitle>
						<CardDescription>등록된 사용자들을 확인하세요.</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2">
							<Button
								onclick={() => selectUser(null)}
								variant={selectedUserId === null ? 'default' : 'outline'}
								size="sm"
							>
								전체 보기
							</Button>
							{#each users as user}
								<div class="flex items-center justify-between rounded-lg border p-3">
									<div>
										<p class="font-medium">{user.name}</p>
										<p class="text-sm text-gray-600">{user.email}</p>
									</div>
									<Button
										onclick={() => selectUser(user.id)}
										variant={selectedUserId === user.id ? 'default' : 'outline'}
										size="sm"
									>
										선택
									</Button>
								</div>
							{/each}
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- 할 일 관리 -->
			<div class="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>할 일 추가</CardTitle>
						<CardDescription>새로운 할 일을 추가하세요.</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="space-y-2">
							<Label for="todo-title">제목</Label>
							<Input
								id="todo-title"
								bind:value={newTodoTitle}
								placeholder="할 일 제목을 입력하세요"
								disabled={loading}
							/>
						</div>
						<div class="space-y-2">
							<Label for="todo-description">설명 (선택사항)</Label>
							<Input
								id="todo-description"
								bind:value={newTodoDescription}
								placeholder="할 일 설명을 입력하세요"
								disabled={loading}
							/>
						</div>
						<div class="space-y-2">
							<Label>사용자 선택</Label>
							<select
								bind:value={selectedUserId}
								class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
								disabled={loading}
							>
								<option value={null}>사용자를 선택하세요</option>
								{#each users as user}
									<option value={user.id}>{user.name}</option>
								{/each}
							</select>
						</div>
						<Button onclick={createTodo} disabled={loading || !selectedUserId} class="w-full">
							{loading ? '추가 중...' : '할 일 추가'}
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>할 일 목록</CardTitle>
						<CardDescription>
							{selectedUserId
								? `${users.find((u) => u.id === selectedUserId)?.name}님의 할 일`
								: '모든 사용자의 할 일'}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-3">
							{#each todos as todo}
								<div class="flex items-center justify-between rounded-lg border p-4">
									<div class="flex-1">
										<div class="flex items-center gap-2">
											<h3
												class="font-medium {todo.completed
													? 'line-through text-gray-500'
													: ''}"
											>
												{todo.title}
											</h3>
											<Badge variant={todo.completed ? 'secondary' : 'default'}>
												{todo.completed ? '완료' : '진행중'}
											</Badge>
										</div>
										{#if todo.description}
											<p class="text-sm text-gray-600 mt-1">{todo.description}</p>
										{/if}
										<div class="flex items-center gap-2 mt-2">
											<Badge variant="outline">{todo.user_name}</Badge>
											<span class="text-xs text-gray-500">
												{new Date(todo.created_at).toLocaleDateString()}
											</span>
										</div>
									</div>
									<div class="flex gap-2">
										<Button
											onclick={() => toggleTodo(todo.id)}
											variant="outline"
											size="sm"
										>
											{todo.completed ? '미완료' : '완료'}
										</Button>
										<Button
											onclick={() => deleteTodo(todo.id)}
											variant="destructive"
											size="sm"
										>
											삭제
										</Button>
									</div>
								</div>
							{:else}
								<p class="text-center text-gray-500 py-8">할 일이 없습니다.</p>
							{/each}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- 데이터베이스 정보 -->
		<Card class="mt-8">
			<CardHeader>
				<CardTitle>데이터베이스 정보</CardTitle>
				<CardDescription>이 예제에서 사용된 SQLite 데이터베이스 구조</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid gap-4 md:grid-cols-2">
					<div class="rounded-lg bg-gray-50 p-4">
						<h4 class="font-semibold mb-2">Users 테이블</h4>
						<ul class="text-sm space-y-1">
							<li>• id (INTEGER PRIMARY KEY)</li>
							<li>• name (TEXT NOT NULL)</li>
							<li>• email (TEXT UNIQUE NOT NULL)</li>
							<li>• created_at (DATETIME)</li>
						</ul>
					</div>
					<div class="rounded-lg bg-gray-50 p-4">
						<h4 class="font-semibold mb-2">Todos 테이블</h4>
						<ul class="text-sm space-y-1">
							<li>• id (INTEGER PRIMARY KEY)</li>
							<li>• title (TEXT NOT NULL)</li>
							<li>• description (TEXT)</li>
							<li>• completed (BOOLEAN)</li>
							<li>• user_id (INTEGER FOREIGN KEY)</li>
							<li>• created_at (DATETIME)</li>
						</ul>
					</div>
				</div>
				<div class="mt-4 rounded-lg bg-blue-50 p-3">
					<p class="text-sm text-blue-800">
						<strong>사용된 기술:</strong> better-sqlite3, SvelteKit API routes, TypeScript
					</p>
				</div>
			</CardContent>
		</Card>
	</div>
</div> 