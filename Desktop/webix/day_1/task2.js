var toolbar={
    view: "toolbar",
    height:50,
    cols: [
        {view:"label", label:"My App"},
        { view:"button", width:100, type:"icon", icon:"user", label:"Profile",popup:"my_pop" }
    ]

};
var toolbar_left_side=
    { rows:[
            {view:"label",label:"Dashboard"},
            {view:"label",label:"Users"},
            {view:"label",label:"Products"},
            {view:"label",label:"Locations"},
            {width:250},
            {cols: [{
                    css: "greenText backgroundList",
                    view: "label", label: "<span class='webix_icon fa-check'></span>Connected", align: "center"} ]
            }
        ]
    } ;
var tablet=
    {rows:
    [
        {view:"datatable",
            id:"mydata",
            autoheight:true,
            autoConfig:true,
            data:small_film_set,
            scrollX: false},
        {autoheight:true}

    ]
    };
var left_form= {
    view: "form",
    id: "myform",
    elements: [
        {view: "template", template: "Edit Films", type: "section"},
        {view: "text", label: "title", name: "title", invalidMessage: "Enter some text "},
        {view: "text", label: "year", name: "year", invalidMessage: "Enter year between 1990 and 2015"},
        {view: "text", label: "rating", name: 'rating', invalidMessage: "rating must be between "},
        {view: "text", label: "votes", name: 'votes', invalidMessage: "voits must be between"},
        {
            cols: [
                {
                    view: "button", label: "Add new", type: "form", click: function () {
                        if ($$("myform").validate()) {
                            var item = $$("myform").getValues();
                            $$("mydata").add(item);
                        }
                    }
                },
                {
                    view: "button",
                    label: "clear",
                    click: function () {
                        $$("myform").clear();
                        $$("myform").clearValidation();

                    }
                }
            ]
        },
        {width: 250}
    ],
    rules: {
        title: webix.rules.isNotEmpty,
        year: function (value) {
            return value >= 1970 && value <= 2018;
        },
        votes: function (value) {
            return value < 10000 && value > 0;
        },
        rating: function (value) {
            return value > 0;
        }
    }
};
var footerC= {

    view: "template",
    template: "The software is provided by <a href=https://webix.com>https://webix.com</a>. All rights reserved.(c) ",
    css:"copirite",
    height:30

};



webix.ui({
    rows:[
        toolbar,
        {
            cols:[
                toolbar_left_side,
                { view:"resizer"},
                tablet,
                left_form
            ]
        },
       footerC


    ]


});


webix.ui({
    view:"popup",
    id:"my_pop",
    head:"Submenu",
    width:300,
    body:{
        view:"list",
        data:[
            {id:"1", name:"settings"},
            {id:"2", name:'log out'}
        ],
        template:"#name# ",
        autoheight:true,
        select:true
    }
});



