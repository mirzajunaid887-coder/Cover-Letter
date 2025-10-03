// Copy email button
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText('mirzajunaid887@gmail.com').then(() => {
      const el = document.createElement('span');
      el.textContent = 'Copied!';
      el.style.marginLeft = '8px';
      el.style.color = 'var(--accent-light)';
      this.parentNode.appendChild(el);
      setTimeout(() => el.remove(), 1500);
    });
  });
}

// Convert project title to filename for /maps folder
function titleToFilename(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // spaces to dashes
    .replace(/[^a-z0-9\-]/g, ''); // remove non-alphanumerics except dash
}

// Build project cards dynamically from data-* attributes
document.querySelectorAll('.project').forEach((proj) => {
  const title = proj.dataset.title || 'Untitled Project';
  const detail = proj.dataset.detail || '';
  const filename = titleToFilename(title) + '.jpg'; // expects .jpg
  const imgPath = 'maps/' + filename;

  proj.innerHTML = `
    <div class="project-header">${title}</div>
    <div class="project-content">
      <p>${detail}</p>
      <img src="${imgPath}" alt="${title} Map" onerror="this.style.display='none'">
    </div>
  `;
});

// Accordion toggle with smooth animation
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('project-header')) {
    const header = e.target;
    const content = header.nextElementSibling;
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

    // Close any other open project (optional: keep only one open)
    // document.querySelectorAll('.project-content').forEach((c) => {
    //   if (c !== content) {
    //     c.style.maxHeight = null;
    //     c.classList.remove('open');
    //     c.previousElementSibling.classList.remove('active');
    //   }
    // });

    header.classList.toggle('active');

    if (isOpen) {
      content.style.maxHeight = null;
      content.classList.remove('open');
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.classList.add('open');
    }
  }
});
