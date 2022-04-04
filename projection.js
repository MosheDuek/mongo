db.books.find({}, { _id: 0, title: 1 });

db.books.find({}, { title: 0 });

//mysqlit
//select _id, title from books
