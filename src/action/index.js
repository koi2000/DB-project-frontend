const { SAVE } = require("../config");

const saveAction = (data)=>{
    return {
        type:SAVE,
        user:data
    }
}

module.exports = {
    saveAction
};