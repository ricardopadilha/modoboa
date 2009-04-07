
window.addEvent('domready', function() {
    var handlers = new Array();
    
//    handlers['loadDom'] = function(obj, target) {
/*	$$('a[name=loadDom]').setStyles({'color' : '#999'});*/
/*	obj.setStyles({"color": "black"});*/
// 	loadPage(target, "content", null);
//     };

//     handlers['loadContent'] = function(obj, target) {
//         loadPage(target, "content", null);
//     };   

    if ($$("a[name=deleteDom]"))
      $$("a[name=deleteDom]").addEvent('click', function(event) {
	  if (!confirm(gettext("Delete this domain?")))
	    event.stop();
	});
    
    if ($$("a[name=deleteMb]"))
        $$("a[name=deleteMb]").addEvent('click', function(event) {
            if (!confirm(gettext("Delete this mailbox?")))
                event.stop();
        });

    if ($$("a[name=deleteAlias]"))
        $$("a[name=deleteAlias]").addEvent('click', function(event) {
            if (!confirm(gettext("Delete this alias?")))
                event.stop();
        });

    
    $('body').addEvent('click', function(event) {
	target = event.target;
	if (target.get('tag') == 'a') {
	    name = target.get('name');
	    if (name == 'undefined')
		return;
	    if (typeof(handlers[name]) != 'undefined') {
		if (!handlers[name](target, target.get('href'))) {
		    new Event(event).stop();
                }
	    }
	}
    });

    $('body').addEvent('submit', function(event) {
        alert("newodm submit");
	target = event.target;
	if (target.get('tag') == 'form') {
	    name = target.get('name');
	    if (name == 'undefined')
		return;
	    if (typeof(handlers[name]) != 'undefined') {
		new Event(event).stop();
		handlers[name](target);
	    }
	}
    });

    SqueezeBox.assign($$('a.boxed'), {
        //size: {x:300, y:180}
        parse: 'rel',
        
    });
});

newdom = function() {
    alert("pouet");
    form = $("form[name=newdom]");
    var params = obj.toQueryString();
    form.set('send', {
        onSuccess: function(response) {
            SqueezeBox.loadModal(obj.action + '?' + params);
        }
    }).send();
};

loadPage = function(url, destination, callback) {
    var destination = (destination == null) ? "page" : destination;
    
    if (callback)
	new Request({url: url, method: "get", onSuccess: callback}).send();
    else
	new Request({url: url, method: "get", onSuccess: function(data) {
	    $(destination).set('html', data);
	}}).send();
};