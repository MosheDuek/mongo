//find all books that Robi Sen wrote only Robi Sen!
db.books.countDocuments({ authors: ["Robi Sen"] });

//find all books that Robi Sen wrote not only Robi Sen
db.books.countDocuments({ authors: { $in: ["Robi Sen"] } });

//find all books that contains Java in categories
db.books.countDocuments({ categories: { $in: ["Java"] } });

//find all documents, from city_inspections collection,
//that address number is greater then 7000
db.city_inspections.countDocuments({ "address.number": { $gt: 7000 } });

//find all documents from companies collection,
//that number_of_employees greater then 50 and lower then 100
db.companies.countDocuments({
  $and: [
    { number_of_employees: { $gte: 50 } },
    { number_of_employees: { $lte: 100 } },
  ],
});

//find all documents from companies collection,
//that number_of_employees greater then 50 and lower then 100 or between 150 to 200

db.companies.countDocuments({
  $or: [
    {
      $and: [
        { number_of_employees: { $gte: 50 } },
        { number_of_employees: { $lte: 100 } },
      ],
    },
    {
      $and: [
        { number_of_employees: { $gte: 150 } },
        { number_of_employees: { $lte: 200 } },
      ],
    },
  ],
});

//find all books that have more then 500 pages
//                         or one of the authors is Michael Sync
//                         or it contains java category

//find how many books published
