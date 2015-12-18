export function domEmptyChildren(container){
  var len = container.childNodes.length;
  while (len--) {
    container.removeChild(container.lastChild);
  }
};