webix.ui({
    rows:[
        {
            view: "toolbar",
            height:50,
            cols: [
                {view:"label", label:"My App"},
                { view:"button", width:100, type:"icon", icon:"user", label:"Profile" }
            ]

        },
        {
            cols:[
                { rows:[
                        {view:"label",label:"Dashboard"},
                        {view:"label",label:"Users"},
                        {view:"label",label:"Products"},
                        {view:"label",label:"Locations"},
                        {width:250},
                        {cols: [
                            {view:"icon", icon: "check", },
                            {view: "label", label: "Connected",css:{ color:"green" }} ]
                        }
                        ]
                } ,
                { view:"resizer"},
                {
                        view:"datatable",
                        autoConfig:true,
                        data:small_film_set,
                        scrollX: false
                },
                {
                    view:"form",
                    elements:[
                        {view: "template", template: "Header template", type: "section" },
                        { view:"text",label:"titel"},
                        { view:"text",label:"year"},
                        { view:"text",label:"rating"},
                        { view:"text",label:"votes"},
                        {cols:[
                            { view:"button", label:"Add new", css:"greenButton"},
                            {view:"button",label:"clear"}
                            ]
                        },
                        {width:250}
                    ]
                }
            ]
        }


    ]

});


webix.ui({
    view:"datatable",
    autoConfig:true,
    data:small_film_set
});

