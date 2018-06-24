const express = require('express');
const app = express();
const cors = require('cors');
const myParser = require("body-parser");
app.use(cors());
app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());


var classrooms = [
    {
      id: "101"
    }, {
      id: "205"
    }, {
      id: "308"
    }, {
      id: "223"
    }
];
var days = [
    {
        "day": "Poniedzialek",
        "hours": [
            {
                "hour":8,
                "classrooms":
                    [
                        "101","223","308"
                    ]
            }, {
                "hour":10,
                "classrooms":
                    [
                        "223","308"
                    ]
            }, {
                "hour":12,
                "classrooms":
                    [
                        "101","223","308"
                    ]
            }, {
                "hour":14,
                "classrooms":
                    [
                        "308"
                    ]
            }, {
                "hour":16,
                "classrooms":
                    [
                        "101","308"
                    ]
            }
        ]
    }, {
        "day": "Wtorek",
        "hours": [
            {
                "hour":8,
                "classrooms":
                    [
                        "101","223","308"
                    ]
            }, {
                "hour":10,
                "classrooms":
                    [
                        "223","308"
                    ]
            }, {
                "hour":12,
                "classrooms":
                    [
                        "101","308"
                    ]
            }, {
                "hour":14,
                "classrooms":
                    [
                        "101","308"
                    ]
            }, {
                "hour":16,
                "classrooms":
                    [
                        "101","223"
                    ]
            }
        ]
    }, {
        "day": "Sroda",
        "hours": [
            {
                "hour":8,
                "classrooms":
                    [
                        "101","223","308"
                    ]
            }, {
                "hour":10,
                "classrooms":
                    [
                        "223","308"
                    ]
            }, {
                "hour":12,
                "classrooms":
                    [
                        "308"
                    ]
            }, {
                "hour":14,
                "classrooms":
                    [
                        "223","308"
                    ]
            }, {
                "hour":16,
                "classrooms":
                    [
                        "223","308"
                    ]
            }
        ]
    }, {
        "day": "Czwartek",
        "hours": [
            {
                "hour":8,
                "classrooms":
                    [
                        "101","308"
                    ]
            }, {
                "hour":10,
                "classrooms":
                    [
                        "308"
                    ]
            }, {
                "hour":12,
                "classrooms":
                    [
                        "101","308"
                    ]
            }, {
                "hour":14,
                "classrooms":
                    [
                        "223","308"
                    ]
            }, {
                "hour":16,
                "classrooms":
                    [
                        "223","308"
                    ]
            }
        ]
    }, {
        "day": "Piatek",
        "hours": [
            {
                "hour":8,
                "classrooms":
                    [
                        "101","223","308"
                    ]
            }, {
                "hour":10,
                "classrooms":
                    [
                        "308"
                    ]
            }, {
                "hour":12,
                "classrooms":
                    [
                        "101","223"
                    ]
            }, {
                "hour":14,
                "classrooms":
                    [
                        "101","223"
                    ]
            }, {
                "hour":16,
                "classrooms":
                    [
                        "223","308"
                    ]
            }
        ]
    }
];

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/classrooms', function (req, res) {
    var dataJSON = JSON.stringify(classrooms);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(dataJSON);
});

app.get('/plan', function (req, res) {
    var dataJSON = JSON.stringify(days);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(dataJSON);
});


app.post('/addClassroom', function (req, res) {
    classrooms.push(req.body);
    res.send(JSON.stringify(classrooms));
});

app.post('/addPlan', function (req, res) {
    
    for(let i = 0; i < days.length; i++){
        if(days[i].day == req.body.day){
            for(let j = 0; j < days[i].hours.length;++j){
                if(days[i].hours[j].hour == req.body.hour){
                    days[i].hours[j].classrooms.push(req.body.id);
                }
            }
        }
    }
    res.send(JSON.stringify(days));
});

app.post('/deletePlan', function (req, res) {
    for(let i = 0; i < days.length; i++){
        if(days[i].day == req.body.day){
            for(let j = 0; j < days[i].hours.length;++j){
                if(days[i].hours[j].hour == req.body.hour){
                    for(let k = 0; k < days[i].hours[j].classrooms.length;k++) {
                        if(days[i].hours[j].classrooms[k]==req.body.id){
                            days[i].hours[j].classrooms.splice(k,1);
                        }
                    }
                }
            }
        }
    }
    res.send(JSON.stringify(days));
});
app.post('/deleteClassroom', function (req, res) {
    for(let i = 0; i < days.length; i++){
        for(let j = 0; j < days[i].hours.length;++j){
            for(let k = 0; k < days[i].hours[j].classrooms.length;k++) {
                if(days[i].hours[j].classrooms[k]==req.body.id){
                    days[i].hours[j].classrooms.splice(k,1);
                }
            }
        }
    }
    for(let i = 0;i<classrooms.length;++i){
        if(classrooms[i].id==req.body.id){
            classrooms.splice(i,1);
            break;
        }
    }
    res.send(JSON.stringify(classrooms));
});
app.listen(3000, () => console.log('App listening on port 3000!'))