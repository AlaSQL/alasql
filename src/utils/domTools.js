export default mem => {
	const utils = mem.alasql.utils;
	utils.domEmptyChildren = container => {
		var len = container.childNodes.length;
		while (len--) {
			container.removeChild(container.lastChild);
		}
	};
};
