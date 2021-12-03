jQuery(document).ready(function($) {
	$(".collection-slider .category-wrapper").hover(function(e) {
		$(this).parents(".collection-slider").find(".category-wrapper").removeClass("center-slide");
		$(this).addClass("center-slide");
	}, function(e) {
		$(this).removeClass("center-slide");
	});
});