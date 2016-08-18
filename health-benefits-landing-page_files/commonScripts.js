$(document).ready(function () {
	$('.no-fouc').removeClass('no-fouc');
	//setTimeout(function () {
	//	updateNavHeights();
	//}, 200);

	//function updateNavHeights() {
	//	var rightContentWrapDiv = $('.rightContentWrap');
	//	var leftNavWrapDiv = $('.leftNavWrap');

	//	if (rightContentWrapDiv.height() > leftNavWrapDiv.height()) {
	//		leftNavWrapDiv.height(rightContentWrapDiv.height());
	//	}

	//	// TODO: Alan, can you put these labels in approp places with these ids...then maybe we can see....??
	//	$("#debugRightHeightInfoLabel").text = "right height: " + rightContentWrapDiv.height();
	//	$("#debugLeftHeightInfoLabel").text = "left height: " + leftNavWrapDiv.height();

	//}

	$(".ui-accordion").click(function () {
		setTimeout(function () {
			updateNavHeights();
		}, 500);

	});

    // enable eligible expense search in case the macro is included in RTE
	var eligibleExpenseDataEl = $('.eligibleExpenseData');
	var eligibleExpenseData = $.parseJSON('[' + eligibleExpenseDataEl.text() + '{"question": ""}' + ']');
	var currentPageId = eligibleExpenseDataEl.attr('data-current-page-id');
	var faqBox = 'search-' + currentPageId;
    var faqResults = 'macro-search-results-' + currentPageId;
	WageWorks.faqSearch(eligibleExpenseData, faqBox, faqResults);

});