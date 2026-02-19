export function createHeartIcon(styles, isActive = false) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');

  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '20');
  svg.setAttribute('height', '20');
  svg.setAttribute('class', styles.cardFavIcon);
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS(ns, 'path');

  path.setAttribute(
    'd',
    'M12 21s-6.716-4.534-9.192-7.01C.886 12.068 1.34 8.97 3.757 7.05 5.54 5.62 8.21 5.97 10 7.76l2 2 2-2c1.79-1.79 4.46-2.14 6.243-.71 2.417 1.92 2.871 5.018.949 6.94C18.716 16.466 12 21 12 21z'
  );

  if (isActive) {
    path.setAttribute('fill', '#e63946');
    path.setAttribute('stroke', '#e63946');
  } else {
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#999');
    path.setAttribute('stroke-width', '2');
  }

  svg.append(path);

  return svg;
}
