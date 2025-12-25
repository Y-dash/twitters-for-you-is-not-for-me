const FPS: number = 10;

let headElement: HTMLHeadElement | null = document.getElementsByTagName('head')[0];
let mutationObserver: MutationObserver = new MutationObserver(clickFollowingTab);

if (headElement) {
	mutationObserver.observe(headElement, {
		childList: true,
		subtree: true
	});
}

clickFollowingTab();

function clickFollowingTab(): void {
	let htmlElement: HTMLElement = document.getElementsByTagName('html')[0];

	if (htmlElement.dataset.ydashsExtensionTwitterNotForMeIsDone || (location.href !== 'https://twitter.com/home' && location.href !== 'https://x.com/home')) {
		return;
	}

	let unselectedFollowingTabAnchorElement: HTMLAnchorElement | null = document.querySelector('div[role="tablist"] div[role="presentation"]:nth-child(2) > :is(a[href="/home"], div[role="tab"])');
	
	if (unselectedFollowingTabAnchorElement == null) {
		setTimeout(clickFollowingTab, 1000 / FPS);
		return;
	}

	unselectedFollowingTabAnchorElement.click();
	mutationObserver.disconnect();
	htmlElement.dataset.ydashsExtensionTwitterNotForMeIsDone = 'true';
}