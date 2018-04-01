var toolbar={
    view: "toolbar",
    height:50,
    cols: [
        {view:"label", label:"My App"},
        { view:"button", width:100, type:"icon", icon:"user", label:"Profile",popup:"my_pop" }
    ]

};
var  toolbar_left_side= {
    css:"menu",
    type:"clean",
    rows:[
        {
            view:"list",
            id:"mylist",
            width:200,
            scroll:false,
            select:true,
            on:{
                onAfterSelect:function(id){
                    $$(id).show();
                }
            },
            data:[ "Dashboard", "Users", "Products","Locations"]

        },
        {
            view:"label",
            css: "greenText backgroundList",
            align:"center",
            autoheight:true,
            label:"<span class='webix_icon fa-check'></span>Connected"
        }
    ]
};


var data=   {rows:
            [
                {view:"datatable",
                    id:"mydata",
                    autoConfig:true,
                    hover:"myhover",
                    columns:[
                        { id:"rank", header:[""], css:"rank", width:50 },
                        { id:"title", header:["Film title",{ content:"textFilter"}], fillspace:true },
                        { id:"year", header:["Released",{ content:"textFilter"}], width:80 },
                        { id:"votes", header:["Votes",{ content:"textFilter"}], width:100 },
                        { id:"rating", header:"Rating", width:100 },
                        {id:"deleter",header:"", template:"{common.trashIcon()}",width:40}
                    ],
                    url:"data/data.js",
                    scrollX: false,
                    on:{
                        onItemClick:function(id, e, trg){
                            if (id.column==="deleter"){
                                webix.message("the line number "+id.row+" was delited");
                                this.remove(id);
                                return false;
                            }






                    }
                }}


            ]
            };
var right_form=
    {
    view: "form",
    id: "myform",
    elements: [
        {view: "template", template: "Edit Films", type: "section"},
        {view: "text", label: "title", name: "title", invalidMessage: "Enter some text "},
        {view: "text", label: "year", name: "year", invalidMessage: "Enter year between 1950 and 2015"},
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
            return value >= 1950 && value <= 2018;
        },
        votes: function (value) {
            return value < 1000000 && value > 0;
        },
        rating: function (value) {
            return value > 0 && value < 10.1;
        }
    }
};
var footerC= {

    view: "template",
    template: "The software is provided by <a href=https://webix.com>https://webix.com</a>. All rights reserved.(c) ",
    css:"copirite",
    height:30

};
var second_cells_list= {
    rows:[
         {
                cols:[
                 {view:"text",
                     id:"usersField",
                     gravity:3
                 },
                 {view:"button",
                     label:"sort asc",
                     gravity:1,
                     click:function () { $$("usersList").sort("#name#"); }
                 },
                 {view:"button",
                     label:"sort desc",
                     gravity:1,
                     click:function () { $$("usersList").sort("#name#", "desc"); }
                 }
                 ]
         },
                {view:"list",
                    id:"usersList",
                    template:"<b>#name#</b>- #country#<span class='webix_icon fa-trash'></span>",
                    scheme: {
                        $init: function (obj) {
                            if (obj.id <=5) obj.$css = "newtime";

                        }
                    },
                  
                    select:true,
                    url:"data/users.js"
                }
    ]
};
var second_cell_Chart = {
    view:"chart",
    type:"bar",
    url:"data/users.js",
    value:"#age#",

    xAxis:{ template:"#age#" }
};
var the_third_tree={
    id:'productsTreeTable',
    view:"treetable",

    columns:[
        { id:"id",	header:"", css:{"text-align":"right"}, width:50},
        { id:"title",	header:"title",	width:400,
            template:"{common.treetable()} #title#" },
        { id:"price",	header:"price",	width:70}
    ],
    autoheight:true,
    url:"data/products.js",
    ready:function(){ $$("productsTreeTable").openAll(); }
};
var main = {
    cells:[ //try replacing cells with rows or cols
        { id:"Dashboard", cols:[data,right_form]},
        { id:"Users",rows:[ second_cells_list,second_cell_Chart,{template:'age',height:30,css:'copirite'}]},
        { id:"Products",rows:[the_third_tree] },
        { id:"Locations",template:"Locations"}

    ]
};


webix.ui({
    rows:[
        toolbar,
        {
            cols:[
                toolbar_left_side,
                { view:"resizer"},
                main
            ]
        },
       footerC


    ]


});
$$("usersField").attachEvent("onTimedKeyPress",function(){
    var value = this.getValue().toLowerCase();
    $$("usersList").filter(function(obj){
        return obj.name.toLowerCase().indexOf(value)==0;
    })
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

