//group by status and count how mant books each status has
db.books.aggregate(
    [{
        $group: {
            _id: "$status",
            //filed to group by
            number_of_books: /*name of the new filed*/ {
                $sum: 1
                //count +1 every status
            }
        }
    }]
);



db.books.aggregate([{
    $group: {
        _id: "$status",
        avg_books_page: {
            $avg: "$pageCount"
        }
    }
}]);


db.books.aggregate([{
    $group: {
        id: "$status",
        number_of_books: {
            $sum: 1
        },
        avg_books_page: {
            $avg: "$pageCount"
        },
        total_pages: {
            $sum: "$psgeCount"
        },
        min_pages: {
            $min: "$pageCount"
        },
        max_pages: {
            $max: "$pageCount"
        },

    }
}]);


db.books.aggregate([{
        $match: {
            pageCount: {
                $gt: 0
            }
        }
    },
    {
        $group: {
            _id: "$status",
            number_of_books: {
                $sum: 1
            },
            avg_books_page: {
                $avg: "$pageCount"
            },
            total_pages: {
                $sum: "$psgeCount"
            },
            min_pages: {
                $min: "$pageCount"
            },
            max_pages: {
                $max: "$pageCount"
            },
        }
    }
])

db.books.aggregate([{
        $match: {
            pageCount: {
                $eq: 0
            }
        }

    },
    {
        $group: {
            _id: "$status",
            number_of_books: {
                $sum: 1
            }
        }
    }
])



db.books.aggregate([{
        //find in aggregate = match   
        $match: {
            pageCount: {
                $eq: 0
            }
        }

    },
    {
        $group: {
            _id: "$status",
            number_of_books: {
                $sum: 1
            }
        }
    },
    {
        //sort : 1 asc,  sort: -1  desc
        $sort: {
            _id: 1
        }
    }
])


//cocncat first and last name only the first letter will be caps

db.users.aggregate([{
    $project: {
        _id: 0,
        fullname: {
            $concat: [{
                    $toUpper: {
                        $substrCP: ["$firstname", 0, 1]
                    }
                },
                {
                    $substrCP: [
                        "$firstname",
                        1,
                        {
                            $subtract: [{
                                $strLenCP: "$firstname"
                            }, 1],
                        },
                    ],
                },
                " ",
                {
                    $toUpper: {
                        $substrCP: ["$lastname", 0, 1]
                    }
                },
                {
                    $substrCP: [
                        "$lastname",
                        1,
                        {
                            $subtract: [{
                                $strLenCP: "$lastname"
                            }, 1],
                        },
                    ],
                },
            ],
        },
        email: 1,
    },
}, ]);




//convert string-date to date 
db.users.aggregate([{
    $project: {
        birthdate: {
            $convert: {
                input: "$date-string",
                to: "date",
                onError: "this is not a date",
                onNull: "null"
            }
        }
    }
}])



//! aggrigate in aray


//מפרק את המערך לכל אחד בפני עצמו ונותן לכל אובייקט פעם אחת חןק מהמערך 
db.book.aggregate([
    {$unwind: "$categories"}
])
//distruct authors array and duplicate the doc
//push all the authors to array (with duplicate)
db.books.aggregate([
    {$unwind: "$authors"},
    {
        $group:{
            _id:"$affiliated",
            allAuthors: {$addToSet: "$authors"}
        }
    }
])


db.books.aggregate([
    {
        $project:{
            title: 1,
            year:{$year : "$publishedDate"}
        }
       
    },
    {
         $match: {
             year: 2008
         }
    }
])

//*תרגיל מסכם

db.books.aggregate([
    {
        $match:{
            status: "PUBLISH"
        }
    },
         {
             $unwind: "$categories"
         },
         {
             $match: {categories:{$ne:""}}
         },
         {
             $group: {
                 _id: "$affiliated",
                 allCategories: {
                     $addToSet: "$categories"
                 }
             }
         },
         {
             $project: {
                 categoriesLength: {$size: "$allCategories"}
             }
         }
        
    
])

//addToset מונע כפילות במערך
// size נותן את גודל המערך.



