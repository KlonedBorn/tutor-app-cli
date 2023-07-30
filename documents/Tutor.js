// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { MathTopic } = require("./enum/Topic");
const User = require("./User")

class Tutor extends User{
    constructor(username, about, schedule, proficiency){
        super(username)
        this.about = about // string
        this.schedule = schedule // {schedule}
        this.proficiency = proficiency // [MathTopic]
    }

    toString() {
        return `Tutor(${username, about, schedule, proficiency})`;
    }
}

const example = new Tutor(
    "Joel Blenman",
    "Dedicated to the work",
    [
        { monday:{start: "8:30",end:"12:45"}},
        { tuesday:{start: "8:30",end:"12:45"}},
        { wednesday:{start: "8:30",end:"12:45"}},
        { thursday:{start: "8:30",end:"12:45"}},
        { friday:{start: "8:30",end:"12:45"}},
    ],
    [
        MathTopic.GEOM, MathTopic.ALGB,MathTopic.COMP_ANAL,
    ]
)

module.exports = Tutor

console.log(example.toJson());
