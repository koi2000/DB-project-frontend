//这是redux的第一步定义规则，这是所有规则的入口，可以存放多个规则。

const { SAVE } = require("../config");

const initState = {
    "userId":"",
    "username":"",
    "nickname":"",
    "email":"",
    "studentId":"",
    "roles":[],
    "groups":[]
};
const reducer = (state = initState,action)=>{
    console.log("reducer");
    console.log(state);
    switch(action.type){
        case SAVE:
            console.log("save"+JSON.stringify(action.user))
            return action.user;
        default:
            return state;
    }
};

module.exports = {
    reducer
};
