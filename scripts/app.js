var oo = 00 || {},
	srcImages = function srcImages (counter, nextViewport) {
		var imgArray = document.getElementsByTagName('img'),
			i = imgArray.length,
			el;

		while(i--) {
			el = imgArray[i];
			if(el.getAttribute('data-img') && el.src === '') {
				if(el.offsetTop < nextViewport) { // is the current image within our next viewport?
					el.src = el.getAttribute('data-img'); // add src value
				}
			}
		}
	};

oo.trigger = 0;

window.onscroll = function (e) {
	var curTopPos = document.body.scrollTop // current postion body top
		viewportHeight = window.innerHeight, // viewport height
		curBottomPos = curTopPos + viewportHeight, // we want to track the curBottomPos not the top
		counter = Math.floor(curTopPos/viewportHeight) + 1, // calculate when the current position goes beyond the window height and how many times over. then add 1 b/c we want will multiply later.
		nextViewport = (viewportHeight * counter) + viewportHeight; // viewport height * how many times passed it we are + an additional viewport height so we stay one viewport ahead.
		
	if (curBottomPos <= nextViewport && oo.trigger < counter) { // if the current bottom position is less than the top of the next viewport and we haven't run the srcImage function yet, run it.
		oo.trigger = counter; // incremement trigger to signify that we've run this function once for this viewport
		srcImages(counter, nextViewport) 
	}
	
}

srcImages(1, window.innerHeight * 2); // run onload
