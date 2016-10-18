var contextMenu = {
    menuParent: null,
    menuDiv: null,
    menuHtml: '<div class="contextMenu"><ul class="contextMenuList"><li class="contextMenuListItem moreMenu">Arrange</li><li class="contextMenuListItem">Delete</li></ul></div>',
    showMenu: function(event) {
        event.preventDefault();
        if ($('#stripPanel .contextMenu').length > 0) {
            $('#stripPanel .contextMenu').map((i) => {
                $('#stripPanel .contextMenu')[i].remove();
            });
        }
        //console.log(event.target.id);
        menuDiv = $('body>.contextMenu').clone();
        $('#stripPanel').append(menuDiv);
        console.log(menuDiv);
        menuDiv.attr({
            'attachedElement': event.target.id
        });
        menuDiv.css({
            'top': event.pageY,
            'left': event.pageX,
            'z-index': 5
        });
    },

    deleteComicCharacter: function(event) {
        //TODO find a better way to find the grandparent
        var attachedElement = $(event.target).parent().parent().attr('attachedElement');
        if (window.confirm('Are you sure you want to delete ?')) {
            $('#' + attachedElement).remove();
        }
    },

    flipComicCharacter: function(event){
      //TODO find a better way to find the grandparent
      var attachedElement = $(event.target).parent().parent().attr('attachedElement');
      var comicCharacter = $('#' + attachedElement);
      //console.log(attachedElement);
      if(comicCharacter.hasClass('flipCharacter')){
        comicCharacter.removeClass('flipCharacter');
      }
      else{
        comicCharacter.addClass('flipCharacter');
      }
    }
}
