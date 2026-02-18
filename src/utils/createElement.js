export function createElement({ tag, className, attrs, text, children } = {}) {
  const el = document.createElement(tag);

  if (className) {
    if (Array.isArray(className)) {
      el.classList.add(...className.filter(Boolean));
    } else {
      el.className = className;
    }
  }

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value === undefined || value === null) continue;
      el.setAttribute(key, String(value));
    }
  }

  if (typeof text === 'string') {
    el.textContent = text;
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      if (!child) continue;
      el.append(child);
    }
  }

  return el;
}
