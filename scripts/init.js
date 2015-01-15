$(function(){
	
	function loadMarkup(target,url)
	{
		target = $(target);
		return $.ajax({
			url : url,
			dataType : "text",
			contentType : "text/plain",
			accepts : "text/plain",
			type : "get",
			statusCode : {
				200 : function(result){
					var html = marked(result);
					target.html(html).show();
				},
				404 : function(result){
					target.empty().hide();
				}				
			}
		}).promise();
	}
	
	function loadPage(name)
	{
		// show loading spinner
		$.when(
			loadMarkup("#content","elements/" + name + ".txt"),
			loadMarkup("#sidebar","elements/" + name + ".sidebar.txt"))
		.done(function(){
			// hide loading spinner
		});
	}
	
	function getHash()
	{
		return (document.location.hash || "#index").slice(1);
	}
	
	loadMarkup("#navigation","elements/navigation.txt");
	loadPage(getHash());
	
	window.onpopstate = function()
	{
		loadPage(getHash());
	}
});
