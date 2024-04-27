import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';
import { request } from 'node:http';

describe('###Tests for Server Configuration', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://localhost:27017/biblioteca');
    });
});

describe('###Tests for Authenticated Routes', async(t) => {
    test('# POST /auth', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/auth',
            body: {
                "_id": "1",
                "username": "Maria",
                "password": "Abcd@1234"
            }
        });
        equal(response.statusCode, 201);
    })
    test('# POST /register', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/register',
            body: {
                "_id": "2",
                "username": "Arthur",
                "password": "Abcd@12345",
                "isAdmin": "true"
            }
        });
        equal(response.statusCode, 201);
    })
    
    test('# POST /books', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/books',
            body: {
                "_id": "1",
                "title": "Turma da Mônica",
                "qtd": "100",
                "genre": "Infantil",
                "author": "Maurício de Souza",
                "year": "2010"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 201);
    });
    test('# GET /books', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/books'
        });
        equal(response.statusCode, 200);
    });
    test('# GET /books', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/books/1'
        });
        equal(response.statusCode, 200);
    });
    test('# PUT /books/1', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'PUT',
            url: '/books/1',
            body: {
                "_id": "1",
                "title": "O menino maluquinho",
                "qtd": "60",
                "genre": "Infantil",
                "author": "Ziraldo Alves Pinto",
                "year": "1980"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 204);
    });
    test('# DELETE /books', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/books/1',
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 204);
    });
    test('# POST /genre', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/genre',
            body: {
                "_id": "1",
                "type": "Infantil"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 201);
    });
    test('# GET /genres', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/genres'
        });
        equal(response.statusCode, 200);
    });
    test('# GET /genres', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/genres/1'
        });
        equal(response.statusCode, 200);
    });
    test('# GET /genres', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/genres/1/books'
        });
        equal(response.statusCode, 200);
    });
    test('# PUT /genres/1', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'PUT',
            url: '/genres/1',
            body: {
                "type": "Literatura Infantil"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 204);
    });
    test('# DELETE /genres', async(t) => {
        const app = await build(options);
    
        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/genres/1',
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 204);
    });
});

describe('##Internal Server Error', async(t) => {
    test('# POST /books', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/books',
            body: {
                "_id": "1",
                "title": "Menina Bonita do Laço de Fita",
                "qtd": "290",
                "genre": "Infantil",
                "author": "Ana Maria Machado",
                "year": "1986"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 500);
    });
    test('# POST /genres', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/genres',
            body: {
                "_id": "1",
                "type": "Terror"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 500);
    });
    test('# POST /register', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/register',
            body: {
                "_id": "2",
                "username": "Rosana",
                "password": "Abcd@12345",
                "isAdmin": "true"
            }
        });
        equal(response.statusCode, 500);
    })
});

describe('##Bad Request', async(t) => {

    test('# POST /books', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/books',
            body: {
                "_id": "5",
                "title": "It - A Coisa",
                "genre": "Terror",
                "author": "Stephen King"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 400);
    });
    test('# POST /genre', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/genres',
            body: {
                "_id": "3",
                "name": "Terror"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
    })
    equal(response.statusCode, 400);
});

describe('##Unautorized (Invalid Token)', async(t) => {
    test('# POST /books', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/books',
            body: {
                "_id": "5",
                "tile": "O menino do pijama listrado",
                "qtd": "140",
                "genre": "Ficção histórica",
                "author": "John Boyne",
                "year": "2007"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 401);
    });
    test('# POST /genres', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/genres',
            body: {
                "_id": "4",
                "name": "Bibliografia"
            },
            headers: {
                "isAdmin": "true",
                "x-acess-token": "aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJNYXJpYSIsImlhdCI6MTcxMzYyMjU1M30.yMsAtdVodtl_aOLbIV329sZwC24U8MWya70JywyBv4c"
            }
        });
        equal(response.statusCode, 401);
    });
    test('# POST /books (sem token)', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/books',
            body: {
                "_id": "5",
                "tile": "Amigos, amore e aquela coisa terrivel",
                "qtd": "500",
                "genre": "Bibliografia",
                "author": "Matthew Perry",
                "year": "2023"
            },
            headers: {
                "isAdmin": "true",
            }
        });
        equal(response.statusCode, 401);
    });
    test('# POST /books (sem token)', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/books',
            body: {
                "_id": "5",
                "name": "Ficção histórica"
            },
            headers: {
                "isAdmin": "true",
            }
        });
        equal(response.statusCode, 401);
    });
})