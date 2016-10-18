var dragged;

document.addEventListener("dragstart", function(event) {
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
}, false);

document.addEventListener("dragleave", function(event) {// reset background of potential drop target when the draggable element leaves it
}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    //console.log((dragged.attr('id')));
    if ($(event.target).hasClass("scene") && (dragged.attr('id') == undefined)) {
        let droptarget = $(event.target);
        dragged.attr('id', droptarget.attr('id')+'character' + (droptarget.children().length + 1));
        droptarget.append(dragged);
        dragged.addClass('comicCharacter').css({
          'z-index': droptarget.children().length,
          'position': 'absolute'
        });
        dragged.offset({
            top: event.pageY - dragged.outerHeight() / 2,
            left: event.pageX - dragged.outerWidth() / 2
        });
        dragged.on('contextmenu',function(event){
          contextMenu.showMenu(event);
        });
    } else if ($(event.srcElement).attr('id') == dragged.parent().attr('id') || $(event.srcElement).hasClass('comicCharacter')) {
        dragged.offset({
            top: event.pageY - dragged.outerHeight() / 2,
            left: event.pageX - dragged.outerWidth() / 2
        });
    }
    else{
      console.log($(event.srcElement));
      alert('Character Doesnot belong in this Scene!!');
    }
}, false);
