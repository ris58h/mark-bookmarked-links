function processLinks(e) {
	if (typeof e.getElementsByTagName === 'function') {
		var links = e.getElementsByTagName('a');
		for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
		  var link = links[linkIndex];
		  processLink(link);
		}
	}
}

function processLink(link) {
	chrome.runtime.sendMessage({
	  from: 'content',
	  subject: 'link',
	  url: link.href
	}, function(response) {
		if (response && response.isBookmark) {
			if (!isMarked(link)) {
				markLink(link);
			}
		}
	});
}

function markLink(link) {
	link.classList.add("marked_link");
}

function isMarked(link) {
	return link.classList.contains("marked_link");
}

function forEachLink(element) {

}

observerCallback = function(mutations) {
  for (var i = 0; i < mutations.length; i++) {
	  var mutation = mutations[i];
	  var addedNodes = mutation.addedNodes;
	  for (var j = 0; j < addedNodes.length; j++) {
	  	var addedNode = addedNodes[j];
	  	if (addedNode.nodeName === 'A') {
	  		processLink(addedNode);
	  	} else {
	  		processLinks(addedNode);
	  	}
	  }
	}
};
var observer = new MutationObserver(observerCallback);
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

processLinks(document);

chrome.storage.sync.get("mark_style", function(result){
    var sheet = document.createElement('style');
    var defaultStyle = "background-color: gray;\nopacity: 0.5;";
    var rule = "a.marked_link {" + (result.mark_style || defaultStyle) + "}";
console.log(rule);
    sheet.innerHTML = rule;
    document.body.appendChild(sheet);
});
