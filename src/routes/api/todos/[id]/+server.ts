import { json } from '@sveltejs/kit';
import { todoQueries } from '$lib/database.js';
import type { RequestHandler } from './$types';

// PUT /api/todos/[id] - 할 일 업데이트
export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const id = parseInt(params.id);
		const { title, description, completed } = await request.json();

		if (!title) {
			return json({ error: '제목은 필수입니다.' }, { status: 400 });
		}

		todoQueries.update.run(title, description || '', completed ? 1 : 0, id);
		const updatedTodo = todoQueries.getById.get(id);

		if (!updatedTodo) {
			return json({ error: '할 일을 찾을 수 없습니다.' }, { status: 404 });
		}

		return json(updatedTodo);
	} catch (error) {
		console.error('할 일 업데이트 오류:', error);
		return json({ error: '할 일을 업데이트할 수 없습니다.' }, { status: 500 });
	}
};

// PATCH /api/todos/[id] - 완료 상태 토글
export const PATCH: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);
		
		todoQueries.toggleComplete.run(id);
		const updatedTodo = todoQueries.getById.get(id);

		if (!updatedTodo) {
			return json({ error: '할 일을 찾을 수 없습니다.' }, { status: 404 });
		}

		return json(updatedTodo);
	} catch (error) {
		console.error('할 일 상태 토글 오류:', error);
		return json({ error: '할 일 상태를 변경할 수 없습니다.' }, { status: 500 });
	}
};

// DELETE /api/todos/[id] - 할 일 삭제
export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);
		
		const result = todoQueries.delete.run(id);
		
		if (result.changes === 0) {
			return json({ error: '할 일을 찾을 수 없습니다.' }, { status: 404 });
		}

		return json({ success: true });
	} catch (error) {
		console.error('할 일 삭제 오류:', error);
		return json({ error: '할 일을 삭제할 수 없습니다.' }, { status: 500 });
	}
}; 