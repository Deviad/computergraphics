const renderElem = ({
  tagName,
  attrs,
  children,
}: VNode): HTMLElement | Text => {
  const $el = document.createElement(tagName);
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v);
  }

  for (const child of children) {
    const $child = render(child);
    $el.appendChild($child);
  }
  return $el;
};

const render = (arg: Elem): HTMLElement | Text => {
  if (Object.prototype.toString.call(arg) === "[object String]") {
    return document.createTextNode(arg as string);
  }
  return renderElem(arg as VNode);
};

export { render };