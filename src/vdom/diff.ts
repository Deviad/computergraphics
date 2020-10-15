import { render } from "./render";

type PatchFactory = (n: HTMLElement | Text) => HTMLElement | Text;

const zip = <LEFT, RIGHT>(left: LEFT[], right: RIGHT[]) => {
  const zipped = [] as (LEFT | RIGHT)[][];
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    zipped.push([left[i], right[i]]);
  }
  return zipped;
};

const diffChildren = (oldVChildren: VNode[], newVChildren: VNode[]) => {
  const childPatches = [] as PatchFactory[];

  for (const [oldChild, newChild] of zip(oldVChildren, newVChildren)) {
    childPatches.push(diff(oldChild, newChild));
  }

  const additionalPatches = [] as PatchFactory[];
  for (const additionalVchild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node: HTMLElement) => {
      $node.appendChild(render(additionalVchild));
      return $node;
    })
  }

  return ($parent: HTMLElement) => {
    for (const [patch, child] of zip(
      childPatches,
      ($parent.childNodes as unknown) as HTMLElement[]
    )) {
        (patch as PatchFactory)(child as HTMLElement|Text);
    }
  };
};

const diffAttrs = (oldAttrs: Attributes, newAttrs: Attributes) => {
  const patches = [] as PatchFactory[];
  //set new attributes
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node: HTMLElement) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }
  //remove old attributes
  for (const k in Object.entries(oldAttrs)) {
    if (!(k in newAttrs)) {
      patches.push(($node: HTMLElement) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }
  return ($node: HTMLElement) => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

const diff = (vOldNode: VNode | string, vNewNode: VNode | string) => {
  if (typeof vNewNode === "undefined") {
    return ($node: HTMLElement): undefined => {
      $node.remove();
      return;
    };
  }

  if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      return ($node: Text) => {
        const $newNode = render(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return;
    }
  }

  if (vOldNode.tagName !== vNewNode.tagName) {
    return ($node: HTMLElement) => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
  const patchChildren = diffChildren(vOldNode.children as VNode[], vNewNode.children as VNode[]);

  return ($node: HTMLElement) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

export { diff };
