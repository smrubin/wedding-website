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
	const unlockLock = 'animated fast spin';
	const behindLocker = $('.groomsman-reveal');

	function unlock(groomsman) {
		const el = $(`#modal-${groomsman}`);
		el.find(lockerLock).addClass(unlockLock);
		el.find(lockerTop).removeClass(lockTop).addClass(unlockTop);
		el.find(lockerBottom).removeClass(lockBottom).addClass(unlockBottom);
		el.find(behindLocker).css('z-index', 2);
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
		if (el.val().toLowerCase() === el.data('answer').toLowerCase()) {
			el.prop('disabled', true);
			el.after('<i class="fas fa-check"></i>');

			const groomsman = el.data('groomsman');
			handleUnlock(groomsman);
		}
	});


})();
