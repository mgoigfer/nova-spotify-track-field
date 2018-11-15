/* eslint-disable no-underscore-dangle */

/**
 * Provided expression must evaluate to a function.
 */
const checkExpression = (binding, vnode) => {
  if (typeof binding.value.fn !== 'function') {
    const compName = vnode.context.$vnode.tag;
    let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
    if (compName) {
      warn += ` found in component '${compName}'`;
    }
    console.warn(warn);
  }
};

/**
 * Check if mouse is outside the target element.
 */
const isMouseOutsideElement = (el, evt) => !el.contains(evt.target) && el !== evt.target; // eslint-disable-line

/**
 * Vue directive to react on clicks outside an element.
 *
 * binding.value: Function
 */
export const clickOutsideDirective = {
  bind(el, binding, vnode) {
    checkExpression(binding, vnode);

    // Define handler and cache it on the element.
    const {
      bubble,
    } = binding.modifiers;
    const handler = (evt) => {
      if (bubble || isMouseOutsideElement(el, evt)) {
        binding.value.fn(evt);
      }
    };
    el.__vueClickOutside__ = handler; // eslint-disable-line

    // Add event listener.
    document.addEventListener('click', el.__vueClickOutside__);
  },

  unbind(el) {
    // Remove event listener.
    document.removeEventListener('click', el.__vueClickOutside__);
    el.__vueClickOutside__ = null; // eslint-disable-line
  },
};

/**
 * Vue directive to react on clicks outside an element (which can be active or
 * not).
 *
 * binding.value: { isActive: Boolean, fn: Function }
 */
export const clickOutsideWhenActiveDirective = {
  bind(el, binding, vnode) {
    checkExpression(binding, vnode);

    // Define handler and cache it on the element.
    const {
      bubble,
    } = binding.modifiers;
    const handler = (evt) => {
      if (bubble || isMouseOutsideElement(el, evt)) {
        binding.value.fn(evt);
      }
    };
    el.__vueClickOutside__ = handler; // eslint-disable-line
  },

  componentUpdated(el, binding) {
    if (binding.value.isActive) {
      // Add event listener.
      document.addEventListener('click', el.__vueClickOutside__);
    } else {
      // Remove ebent listener.
      document.removeEventListener('click', el.__vueClickOutside__);
    }
  },

  unbind(el) {
    // Remove event listener.
    document.removeEventListener('click', el.__vueClickOutside__);
    el.__vueClickOutside__ = null; // eslint-disable-line
  },
};

/**
 * Vue directive to react on mouse outside an element.
 *
 * binding.value: Function
 */
export const mouseOutsideDirective = {
  bind(el, binding, vnode) {
    checkExpression(binding, vnode);

    // Define handler and cache it on the element.
    const {
      bubble,
    } = binding.modifiers;
    const handler = (evt) => {
      if (bubble || isMouseOutsideElement(el, evt)) {
        binding.value.fn(evt);
      }
    };
    el.__vueMouseOutside__ = handler; // eslint-disable-line
  },

  componentUpdated(el, binding) {
    if (binding.value.isActive) {
      // Add event listener.
      document.addEventListener('mouseover', el.__vueMouseOutside__);
    } else {
      // Remove ebent listener.
      document.removeEventListener('mouseover', el.__vueMouseOutside__);
    }
  },

  unbind(el) {
    // Remove event listener.
    document.removeEventListener('mouseover', el.__vueMouseOutside__);
    el.__vueClickOutside__ = null; // eslint-disable-line
  },
};

/**
 * Vue directive to react on mouse outside an element (which can be active or
 * not).
 *
 * binding.value: { isActive: Boolean, fn: Function }
 */
export const mouseOutsideWhenActiveDirective = {
  bind(el, binding, vnode) {
    checkExpression(binding, vnode);

    // Define handler and cache it on the element.
    const {
      bubble,
    } = binding.modifiers;
    const handler = (evt) => {
      if (bubble || isMouseOutsideElement(el, evt)) {
        binding.value.fn(evt);
      }
    };
    el.__vueMouseOutside__ = handler; // eslint-disable-line
  },

  componentUpdated(el, binding) {
    if (binding.value.isActive) {
      // Add event listener.
      document.addEventListener('mouseover', el.__vueMouseOutside__);
    } else {
      // Remove ebent listener.
      document.removeEventListener('mouseover', el.__vueMouseOutside__);
    }
  },

  unbind(el) {
    // Remove event listener.
    document.removeEventListener('mouseover', el.__vueMouseOutside__);
    el.__vueClickOutside__ = null; // eslint-disable-line
  },
};
