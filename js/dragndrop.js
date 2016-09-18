var cStripModel = kendo.observable({
        sceneNumber: 1,

        createScenes: function(){
        	let numberOfScenes = cStripModel.get('sceneNumber');
        	let template = kendo.template($("#sceneTemplate").html());
        	let result = template(numberOfScenes);
        	$("#stripPanel").html(result);
        	let sceneSize = (100/numberOfScenes)+"%";
        	$("#stripPanel").kendoSplitter({
        		orientation: "horizontal",
        		panes:[
        		{collapsible: false, size: sceneSize, resizable:true }
        		]
        	});
        }
    });

    kendo.bind($("#parent"), cStripModel);