db.books.find({ categories: ["Open Source", "Java"] });

db.books.find({ categories: { $all: ["Open Source"] } });
