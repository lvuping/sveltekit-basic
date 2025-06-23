import { json } from '@sveltejs/kit';
import { userQueries } from '$lib/database.js';
import type { RequestHandler } from './$types';

// GET /api/users - 모든 사용자 조회
export const GET: RequestHandler = async () => {
	try {
		const users = userQueries.getAll.all();
		return json(users);
	} catch (error) {
		console.error('사용자 조회 오류:', error);
		return json({ error: '사용자를 조회할 수 없습니다.' }, { status: 500 });
	}
};

// POST /api/users - 새 사용자 생성
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, email } = await request.json();

		if (!name || !email) {
			return json({ error: '이름과 이메일은 필수입니다.' }, { status: 400 });
		}

		// 이메일 중복 체크
		const existingUser = userQueries.getByEmail.get(email);
		if (existingUser) {
			return json({ error: '이미 존재하는 이메일입니다.' }, { status: 400 });
		}

		const result = userQueries.create.run(name, email);
		const newUser = userQueries.getById.get(result.lastInsertRowid);

		return json(newUser, { status: 201 });
	} catch (error) {
		console.error('사용자 생성 오류:', error);
		return json({ error: '사용자를 생성할 수 없습니다.' }, { status: 500 });
	}
}; 