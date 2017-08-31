import * as at from "./appActions";

const initState = {
    currentPage: 0,
};

export default function AppReducer(state = initState, action){
    switch(action.type)
    {
        case at.CHANGE_PAGE:
            //return Object.assign({}, state, {currentPage: action.index});
            return { ...state, ...{currentPage: action.index} };
        case at.SECOND_TYPE: return state;
        default: return state;
    }
}

function CreateReducer(reducers){
    if(!Array.isArray(arg)) throw new Error("Invalid argument: it should be array of functions");
    //Проверить что есть сопадение с именем хотя бы одного экшена
    reducers.forEach((r, i)=>{
        if(typeof r !== "function" || !r.name || at[r.name] === undefined)
            throw new Error(`Invalid reducer with index -${i} and name -${r.name}-`);
    });
    return (state = initState, action)=>r[at[action.type]](state, action);
}