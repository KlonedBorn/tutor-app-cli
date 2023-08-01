// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class User {
    constructor(username) {
        this.username = username
        this.orders = []
        this.sessions = []
        this.login = () => {}
    }
    toString(){
        return `User(${username})`;
    }
    toJson(){
        return JSON.stringify(this,null,1)
    }
}
module.exports = User