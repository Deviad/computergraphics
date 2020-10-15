/*
    This function creates an element.
    Options are passed using a feature callled destructuring,
    where you can extract from an object some attributes/properties.
*/
const createElement = (
  tagName: string,
  { attrs = {} as Attributes, children = [] as Elem[] } = {} as Options
) => {
  return {
    tagName,
    attrs: attrs,
    children: children,
  };
};

export { createElement };
