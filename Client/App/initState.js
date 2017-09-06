export default 
{
    navigation:{
        currentPage: 0
    },

    exhibitCreator:{
        language: "ru"
    },
    
    draft:{
        staticProps:{
            name:{ru:"", en:"", label:"Название Экспоната", type:String},
            title:{ru:"", en:"", label:"Заголовок Экспоната", type:String},
            subtitle:{ru:"", en:"", label:"Подзаголовок Экспоната", type:String},
            location:{ru:"", en:"", label:"Место производство", type:String},
            description:{ru:"", en:"", label:"Подробное описание", type:String},
            history:{ru:"", en:"", label:"История создания", type:String},
            date:{ru:Date.now(), en:null, label:"Дата создания", type:Date, notMultiLang:true}
        },
        variableProps:[
        ],
        imageGallery:{
            images:[
            ]
        },
        blockControl: false,
        result: null,
        error: null
    },
    exhibitOverview:{
    },

};