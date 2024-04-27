
import { ALREADY_EXISTS } from "../../../libs/error.js";
export const checkExistence = (app) => async (request, reply) => {
    const books = app.mongo.db.collection('books');

    let book = request.body;

    let result = await books.count({name: book.title});

    if(result > 0) throw new ALREADY_EXISTS();
}
