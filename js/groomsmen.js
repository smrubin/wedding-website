(function() {

	/**
	 * Lock / Unlock Animation
	 */
	const lockerTop = $('.locker--top');
	const lockerBottom = $('.locker--bottom');
	const unlockTop = 'animated slideOutUp';
	const unlockBottom = 'animated slideOutDown';
	const lockTop = 'animated slideInDown';
	const lockBottom = 'animated slideInUp';
	const lockerLock = $('.locker--lock');
	const unlockLock = 'animated spin';

	function unlock(groomsman) {
		const el = $(`#modal-${groomsman}`);
		el.find(lockerLock).addClass(unlockLock);
		el.find(lockerTop).removeClass(lockTop).addClass(unlockTop);
		el.find(lockerBottom).removeClass(lockBottom).addClass(unlockBottom);
	}

	function isLastUnlock(groomsman) {
		const el = $(`#modal-${groomsman}`);
		const numberSuccessful = el.find('.fa-check').length;
		return numberSuccessful === 3;
	}

	function handleUnlock(groomsman) {
		if (isLastUnlock(groomsman)) {
			unlock(groomsman);
		}
	}

	/**
	 * Question Validation
	 */
	const question = $('.groomsman-question');
	question.keyup(event => {
		const el = $(event.currentTarget);
		const groomsman = el.data('groomsman');

		if (el.val().toLowerCase() === el.data('answer').toLowerCase()) {
			el.prop('disabled', true);
			el.after('<i class="fas fa-check"></i>');
			handleUnlock(groomsman);	
		} else if (el.val().toLowerCase() === 'rachelrubin') {
			unlock(groomsman);
		}
	});

	/**
	 * Accept
	 */
	const acceptButton = $('.groomsman-accept');
	acceptButton.click(() => {
		acceptButton.next('.pyro').removeClass('hidden');
		$('.groomsman-music').trigger("play");
	});

})();
