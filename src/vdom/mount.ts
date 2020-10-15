
/**
 * @param  {HTMLElement|Text} $node is the child node
 * @param  {HTMLElement|Text} $target is the parent node
 * @returns HTMLElement
 * 
 * An HTMLElement implements both Node and ChildNode interfaces,
 * therefore a node is also a childNode of itself.
 * For this reason we can call replaceWith on the node itself.
 * We return node so that the browser, because we return
 * a reference to a different object, can detect that something is
 * changed and rerenders the real DOM.
 */
const mount = ($node: HTMLElement|Text, $target: HTMLElement|Text): HTMLElement|Text => {
    $target.replaceWith($node);
    return $node;
};

export {mount};