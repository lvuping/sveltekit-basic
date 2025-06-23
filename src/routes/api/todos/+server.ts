import { json } from '@sveltejs/kit';
import { todoQueries } from '$lib/database.js';
import type { RequestHandler } from './$types';

// GET /api/todos - 모든 할 일 조회
export const GET: RequestHandler = async ({ url }) => {
	try {
		const userId = url.searchParams.get('userId');
		
		let todos;
		if (userId) {
			todos = todoQueries.getByUserId.all(parseInt(userId));
		} else {
			todos = todoQueries.getAll.all();
		}
		
		return json(todos);
	} catch (error) {
		console.error('할 일 조회 오류:', error);
		return json({ error: '할 일을 조회할 수 없습니다.' }, { status: 500 });
	}
};

// POST /api/todos - 새 할 일 생성
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { title, description, user_id } = await request.json();

		if (!title || !user_id) {
			return json({ error: '제목과 사용자 ID는 필수입니다.' }, { status: 400 });
		}

		const result = todoQueries.create.run(title, description || '', user_id, 0);
		const newTodo = todoQueries.getById.get(result.lastInsertRowid);

		return json(newTodo, { status: 201 });
	} catch (error) {
		console.error('할 일 생성 오류:', error);
		return json({ error: '할 일을 생성할 수 없습니다.' }, { status: 500 });
	}
}; 