//all books with status published and pagecount lower then 400 pages
db.books.find({
  $and: [
    {
      pageCount: { $lt: 400 },
    },
    {
      status: "PUBLISH",
    },
  ],
});

//no all books with status published and pagecount lower then 400 pages
db.books.find({
  $nor: [{ $and: [{ pageCount: { $lt: 400 } }, { status: "PUBLISH" }] }],
});
