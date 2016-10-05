var cStripModel = kendo.observable({
    sceneNumber: 1,

    createScenes: function() {
        let numberOfScenes = cStripModel.get('sceneNumber');
        let template = kendo.template($("#sceneTemplate").html());
        let result = template(numberOfScenes);
        $("#stripPanel").html(result);
        let sceneSize = (100 / numberOfScenes) + "%";
        $("#stripPanel").kendoSplitter({
            orientation: "horizontal",
            panes: [{
                collapsible: false,
                size: sceneSize,
                resizable: false,
                scrollable: false
            }]
        });
    }
});

kendo.bind($("#parent"), cStripModel);

var dragged;

document.addEventListener("dragstart", function(event) {
    //console.log($(event));
    if ($(event.srcElement.parentElement).hasClass('character')) {
        dragged = $(event.target).clone();
    } else {
        dragged = $(event.target);
    }
    dragged.offset({

        top: event.pageY - dragged.outerHeight() / 2,
        left: event.pageX - dragged.outerWidth() / 2
    });

}, false);



/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it


    if ($(event.target).hasClass("scene")) {

        //event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it

    if ($(event.target).hasClass("scene")) {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    console.log((dragged.attr('id')));
    if ($(event.target).hasClass("scene") && (dragged.attr('id') == undefined)) {
        let droptarget = $(event.target);
        event.target.style.background = "";
        dragged.attr('id', $(event.target).attr('id')+'character' + (droptarget.children().length + 1));
        $(event.target).append(dragged);
        //console.log($('#'+'character'+(droptarget.children().length)));
        $('#' + $(event.target).attr('id') + 'character' + (droptarget.children().length)).offset({
            top: event.pageY - dragged.outerHeight() / 2,
            left: event.pageX - dragged.outerWidth() / 2
        }).addClass('comicCharacter');

    } else if ($(event.srcElement).attr('id') == dragged.parent().attr('id')) {
        console.log($(event.srcElement).attr('id'));
        console.log(dragged.parent().attr('id'));
        console.log(dragged.attr('id'));
        dragged.offset({
            top: event.pageY - dragged.outerHeight() / 2,
            left: event.pageX - dragged.outerWidth() / 2
        });
        console.log('(' + event.offsetX + ',' + event.offsetY + ')');
    }
    else{
      alert('Character Doesnot belong in this Scene!!');
    }

}, false);


$(function() {
    $('.scene').contextMenu({
        selector: '.comicCharacter',
        callback: function(key, options) {
            var m = "clicked: " + key + " on " + $(this).text();
            window.console && console.log(m) || alert(m);
        },
        items: {
            "edit": {
                name: "Edit",
                icon: "edit"
            },
            "cut": {
                name: "Cut",
                icon: "cut"
            },
            "copy": {
                name: "Copy",
                icon: "copy"
            },
            "paste": {
                name: "Paste",
                icon: "paste"
            },
            "delete": {
                name: "Delete",
                icon: "delete"
            },
            "sep1": "---------",
            "quit": {
                name: "Quit",
                icon: function($element, key, item) {
                    return 'context-menu-icon context-menu-icon-quit';
                }
            }
        }
    });
});
