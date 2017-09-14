$(() => {
    var data = {
        "ClientName": "PETER PETROV",
        "Cards": [{
            "CardNumber": "1024",
            "CardHolderName": "IVAN IVANOV",
            "CardStatus": "ACTIVE",
            "ActiveUntil": "2017-01-18",
            "Orders": [{
                "OrderNumber": "001",
                "OrderDate": "2016-11-18",
                "OrderType": "ORDER"
            }, {
                "OrderNumber": "002",
                "OrderDate": "2016-12-18",
                "OrderType": "RECHARGE"
            }, {
                "OrderNumber": "003",
                "OrderDate": "2017-01-05",
                "OrderType": "REPLACE"
            }]
        }, {
            "CardNumber": "1025",
            "CardHolderName": "DIMITAR PETROV",
            "CardStatus": "INACTIVE",
            "ActiveUntil": "2016-01-10",
            "Orders": [{
                "OrderNumber": "004",
                "OrderDate": "2016-12-10",
                "OrderType": "ORDER"
            }, ]
        }]
    }
});