window.addEventListener('load', function(){
	new Glider(document.querySelector('.glider'), {
		 // Mobile-first defaults
        slidesToShow: 1,
		slidesToScroll: 1,
        draggable: true,
		arrows: {
			prev: '.carousel-prev',
			next: '.carousel-next'
		},
		
	});
});
