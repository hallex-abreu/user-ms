"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_1 = require("../core/logic/entity");
class User extends entity_1.Entity {
    get id() {
        var _a;
        return (_a = this.props.id) !== null && _a !== void 0 ? _a : null;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const user = new User(props);
        return user;
    }
}
exports.User = User;
