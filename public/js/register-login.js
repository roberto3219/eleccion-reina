const inputs = document.querySelectorAll('.input-group input');

inputs.forEach(input => {
  input.addEventListener('focus', (e) => {
    const wave = e.target.parentElement.querySelector('.wave');
    wave.style.top = `${e.target.offsetHeight / 2}px`;
    wave.style.left = `10px`;
    wave.style.opacity = '1';
    wave.style.transform = 'scale(1)';
    setTimeout(() => {
      wave.style.transform = 'scale(0)';
      wave.style.opacity = '0';
    }, 400);
  });
});