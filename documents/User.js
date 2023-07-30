// Copyright (c) 2023 KingK
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class User {
    constructor(name) {
        this.name = name
        this.orders = []
        this.sessions = []
    }
    toJson(){
        return JSON.stringify(this)
    }
}