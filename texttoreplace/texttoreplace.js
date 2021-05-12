'use strict';

const textEl = document.getElementById('text');
// textEl.textContent = textEl.textContent.replace(/'/g, '"');
textEl.textContent = textEl.textContent.replace(/\B'/g, '"');
