window.addEventListener('load', function(){
	new Glider(document.querySelector('.card'), {
		 // Mobile-first defaults
        slidesToShow: 1,
		slidesToScroll: 1,
        itemWidth: 160,
        draggable: true,
		arrows: {
			prev: '.carousel-prev',
			next: '.carousel-next'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 768,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 800,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
		]
	});
});
