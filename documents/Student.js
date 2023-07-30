// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const User = require("./User");

class Student extends User{
    constructor(username) {
        super(username)
    }

    toString() {
        return `Student(${username})`;
    }
}