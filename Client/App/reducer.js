import * as at from "./at";

const initState = {
    navigation:{
        currentPage: 0
    },

    exhibitCreator:{
        language: "ru"
    },
    
    draftExhibit:{
        ru:{
            title:"",
            subtitle:"",
            location:"",
            description:"",
            history:"",
            name:"",
            date:Date.now()
        },
        en:{
            title:"",
            subtitle:"",
            location:"",
            description:"",
            history:"",
            name:"",
            date:Date.now(),
        },
        variableProps:[
        ]
    },
    exhibitOverview:{
    },

};

export default function AppReducer(state = initState, action){
    switch(action.type)
    {
        case at.CHANGE_PAGE:
            return { ...state, ...{navigation:{currentPage: action.payload.index}} };
        case at.CHANGE_EXHIBIT_LANGUAGE:
            return { ...state, ...{exhibitCreator:{language: action.payload.language}} };;
        default: return state;
    }
}