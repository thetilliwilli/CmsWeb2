export default 
{
    navigation:{
        currentPage: 1
    },

    exhibitCreator:{
        language: "ru"
    },
    
    errorInformer: {
        error: null
    },

    draft:{
        staticProps:{
            name:{ru:"", en:"", label:"Название Экспоната", type:"string"},
            title:{ru:"", en:"", label:"Заголовок Экспоната", type:"string"},
            subtitle:{ru:"", en:"", label:"Подзаголовок Экспоната", type:"string"},
            location:{ru:"", en:"", label:"Место производство", type:"string"},
            description:{ru:"", en:"", label:"Подробное описание", type:"string"},
            history:{ru:"", en:"", label:"История создания", type:"string"},
            date:{ru:Date.now(), en:Date.now(), label:"Дата создания", type:"date", notMultiLang:true}
        },
        variableProps:[
        ],
        // imageGallery:{
        //     images:[
        //     ]
        // },
        imageGallery:[],
        blockControl: false,
        result: null,
        error: null
    },
    overview: [
    ],
    exhibitEdit: {
        staticProps:{
            name:{ru:"", en:"", label:"Название Экспоната", type:"string"},
            title:{ru:"", en:"", label:"Заголовок Экспоната", type:"string"},
            subtitle:{ru:"", en:"", label:"Подзаголовок Экспоната", type:"string"},
            location:{ru:"", en:"", label:"Место производство", type:"string"},
            description:{ru:"", en:"", label:"Подробное описание", type:"string"},
            history:{ru:"", en:"", label:"История создания", type:"string"},
            date:{ru:Date.now(), en:Date.now(), label:"Дата создания", type:"date", notMultiLang:true}
        },
        variableProps:[
        ],
        imageGallery:[],
        blockControl: false,
        result: null,
        error: null
    }
};