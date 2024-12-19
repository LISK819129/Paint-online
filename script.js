// Canvas Setup
const canvas = document.getElementById('wall');
const ctx = canvas.getContext('2d');

// Adjust canvas size
canvas.width = window.innerWidth * 5; // Wide canvas for scrolling
canvas.height = window.innerHeight;

let painting = false;
let currentColor = '#000000';

// Event Listeners for painting
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);

// Color Picker
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
});

// Clear Button
document.getElementById('clearWall').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Infinite Scroll (horizontal)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    window.scrollBy({ left: 100, behavior: 'smooth' });
  } else if (e.key === 'ArrowLeft') {
    window.scrollBy({ left: -100, behavior: 'smooth' });
  }
});

// Drawing Functions
function startPainting(e) {
  painting = true;
  draw(e);
}

function stopPainting() {
  painting = false;
  ctx.beginPath(); // Reset path
}

function draw(e) {
  if (!painting) return;

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  ctx.lineTo(e.clientX + window.scrollX, e.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX + window.scrollX, e.clientY);
}
