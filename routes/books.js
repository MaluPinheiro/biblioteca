/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function books(app, options) {
    const InvalidBooksError = createError('InvalidBooksError', 'Livro Inválido.', 400);

    const books = app.mongo.db.collection('books');

    app.get('/books', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await books.find().toArray();
        }
    );

    app.post('/books', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    qtd: { type: 'integer' },
                    genre: {type: 'string'},
                    author: { type: 'string' },
                    year: {type: 'string'},
                },
                required: ['title', 'qtd', 'author','genre', 'year']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let book = request.body;
        
        await books.insertOne(book);

        return reply.code(201).send();
    });

    app.get('/books/:id', async (request, reply) => {
        let id =  request.params.id;
        let book = await books.findOne({_id: request.params.id});
        
        return book;
    });
    
    app.delete('/books/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await books.deleteOne({_id: request.params.id});
        
        return reply.code(204).send();;
    });

    app.put('/books/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let book = request.body;
        
        await books.updateOne({_id: request.params.id}, {
            $set: {
                title: book.title,
                qtd: book.qtd,
                genre: book.genre,
                author: book.author,
                year: book.year
            }
        });
        
        return reply.code(204).send();;
    });
}
