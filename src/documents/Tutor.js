// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const User = require("./User")

class Tutor extends User{
    constructor(username, about, schedule, proficiency){
        super(username)
        this.about = about
        this.schedule = schedule 
        this.proficiency = proficiency 
    }
    toString() {
        return `Tutor(${this.username},${ this.about},${this.schedule}, ${this.proficiency})`;
    }
}

module.exports = Tutor