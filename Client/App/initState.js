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
        imageGallery:{
            images:[
            ]
        },
        blockControl: false,
        result: null,
        error: null
    },
    overview:{
        exhibitList:[
            {id: "some unique id", name:"Калаш", coverImage:"/static/img/defaultExhibitAvatar.jpg", title:"Ак47 - VIP"},
            {id: "some unique id2", name:"Калаш", coverImage:"/static/img/defaultExhibitAvatar.jpg", title:"Ак47 - VIP"},
            {id: "some unique id3", name:"Калаш", coverImage:"/static/img/defaultExhibitAvatar.jpg", title:"Ак47 - VIP"},
        ]
    },

};