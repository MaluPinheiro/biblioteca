/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function genres(app, options) {
    const InvalidGenres = createError('InvalidGenres', 'Gênero Inválido.', 400);

    const genres = app.mongo.db.collection('genres');
    const books = app.mongo.db.collection('books');

    app.get('/genres',
        {
            config: {
                logMe: true
            }
        },
        async (request, reply) => {
            return await genres.find().toArray();
        }
    );

    app.post('/genres', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    type: { type: 'string' },
                },
                required: ['type']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let genre = request.body;

        await genres.insertOne(genre);

        return reply.code(201).send();
    });

    app.get('/genres/:id', async(request, reply) => {
        let id = request.params.id;
        let genre = await genres.findOne({ _id: request.params.id });
        return genre;
    })

    app.get('/genres/:id/books', {
        config: {logMe: true}
    }, async (request, reply) => {
        let genre = await genres.findOne({ _id: request.params.id })
        return await books.find({genre: genre.type}).toArray()
    });

    app.delete('/genres/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id = request.params.id;

        await genres.deleteOne({ _id: request.params.id });

        return reply.code(204).send();;
    });

    app.put('/genres/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id = request.params.id;
        let genre = request.body;

        await genres.updateOne({ _id: request.params.id }, {
            $set: {
                type: genre.type
            }
        });

        return reply.code(204).send();;
    });
}
