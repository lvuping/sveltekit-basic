import Database from 'better-sqlite3';
import { dev } from '$app/environment';

// 데이터베이스 파일 경로
const dbPath = dev ? 'database.db' : 'database.db';

// 데이터베이스 연결
export const db = new Database(dbPath);

// WAL 모드 설정 (성능 향상)
db.pragma('journal_mode = WAL');

// 사용자 인터페이스
export interface User {
	id: number;
	name: string;
	email: string;
	created_at: string;
}

// 할 일 인터페이스
export interface Todo {
	id: number;
	title: string;
	description?: string;
	completed: boolean;
	user_id: number;
	created_at: string;
}

// 테이블 생성
function initializeDatabase() {
	// 사용자 테이블
	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			email TEXT UNIQUE NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`);

	// 할 일 테이블
	db.exec(`
		CREATE TABLE IF NOT EXISTS todos (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			description TEXT,
			completed BOOLEAN DEFAULT FALSE,
			user_id INTEGER NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
		)
	`);

	// 샘플 데이터 추가 (개발 모드에서만)
	if (dev) {
		const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
		
		if (userCount.count === 0) {
			// 샘플 사용자 추가
			const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
			const user1 = insertUser.run('홍길동', 'hong@example.com');
			const user2 = insertUser.run('김철수', 'kim@example.com');

			// 샘플 할 일 추가
			const insertTodo = db.prepare('INSERT INTO todos (title, description, user_id, completed) VALUES (?, ?, ?, ?)');
			insertTodo.run('SvelteKit 공부하기', 'SvelteKit 공식 문서 읽기', Number(user1.lastInsertRowid), 0);
			insertTodo.run('SQLite 연동하기', 'better-sqlite3 사용법 익히기', Number(user1.lastInsertRowid), 1);
			insertTodo.run('shadcn/ui 컴포넌트 사용하기', '다양한 UI 컴포넌트 테스트', Number(user2.lastInsertRowid), 0);
		}
	}
}

// 데이터베이스 초기화
initializeDatabase();

// 사용자 관련 함수들
export const userQueries = {
	// 모든 사용자 조회
	getAll: db.prepare('SELECT * FROM users ORDER BY created_at DESC'),
	
	// ID로 사용자 조회
	getById: db.prepare('SELECT * FROM users WHERE id = ?'),
	
	// 이메일로 사용자 조회
	getByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
	
	// 사용자 생성
	create: db.prepare('INSERT INTO users (name, email) VALUES (?, ?)'),
	
	// 사용자 업데이트
	update: db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?'),
	
	// 사용자 삭제
	delete: db.prepare('DELETE FROM users WHERE id = ?')
};

// 할 일 관련 함수들
export const todoQueries = {
	// 모든 할 일 조회 (사용자 정보 포함)
	getAll: db.prepare(`
		SELECT t.*, u.name as user_name, u.email as user_email 
		FROM todos t 
		JOIN users u ON t.user_id = u.id 
		ORDER BY t.created_at DESC
	`),
	
	// 특정 사용자의 할 일 조회
	getByUserId: db.prepare(`
		SELECT t.*, u.name as user_name, u.email as user_email 
		FROM todos t 
		JOIN users u ON t.user_id = u.id 
		WHERE t.user_id = ? 
		ORDER BY t.created_at DESC
	`),
	
	// ID로 할 일 조회
	getById: db.prepare('SELECT * FROM todos WHERE id = ?'),
	
	// 할 일 생성
	create: db.prepare('INSERT INTO todos (title, description, user_id, completed) VALUES (?, ?, ?, ?)'),
	
	// 할 일 업데이트
	update: db.prepare('UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?'),
	
	// 완료 상태 토글
	toggleComplete: db.prepare('UPDATE todos SET completed = NOT completed WHERE id = ?'),
	
	// 할 일 삭제
	delete: db.prepare('DELETE FROM todos WHERE id = ?')
};

// 데이터베이스 연결 종료 함수
export function closeDatabase() {
	db.close();
}

// 프로세스 종료 시 데이터베이스 연결 정리
process.on('exit', closeDatabase);
process.on('SIGINT', closeDatabase);
process.on('SIGTERM', closeDatabase); 