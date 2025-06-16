const animals = document.querySelectorAll('.animal');
const listenZone = document.getElementById('listen-zone');
const habitats = document.querySelectorAll('.habitat');
const scoreDisplay = document.getElementById('score');
const winMessage = document.getElementById('win-message');
const resetButton = document.getElementById('reset-btn');
const animalContainer = document.querySelector('.animals');

let listenedAnimals = new Set();
let score = 0;

// Drag start
animals.forEach(animal => {
  animal.addEventListener('dragstart', e => {
    e.dataTransfer.setData('animalId', animal.id);
    e.dataTransfer.setData('sound', animal.dataset.sound);
  });
});

// Listen zone
listenZone.addEventListener('dragover', e => {
  e.preventDefault();
  listenZone.style.backgroundColor = '#c8e6c9';
});

listenZone.addEventListener('dragleave', () => {
  listenZone.style.backgroundColor = '#fffde7';
});

listenZone.addEventListener('drop', e => {
  e.preventDefault();
  const soundFile = e.dataTransfer.getData('sound');
  const animalId = e.dataTransfer.getData('animalId');
  const audio = new Audio(`sounds/${soundFile}`);
  audio.play();

  listenedAnimals.add(animalId);
  listenZone.style.backgroundColor = '#fffde7';
});

// Drop to habitats
habitats.forEach(habitat => {
  habitat.addEventListener('dragover', e => e.preventDefault());

  habitat.addEventListener('drop', e => {
    e.preventDefault();
    const animalId = e.dataTransfer.getData('animalId');
    const animal = document.getElementById(animalId);
    const expectedHome = animal.dataset.home;

    if (!listenedAnimals.has(animalId)) {
      alert("🎧 You must listen to the animal first!");
      return;
    }

    if (habitat.id === expectedHome) {
      habitat.appendChild(animal);
      animal.style.cursor = "default";
      animal.setAttribute("draggable", false);

      score += 1;
      scoreDisplay.textContent = score;

      if (score === animals.length) {
        winMessage.style.display = 'block';

        // Disable all dragging after win
        document.querySelectorAll('.animal').forEach(a => {
          a.setAttribute('draggable', false);
          a.style.cursor = 'default';
        });
      }
    } else {
      alert("❌ Wrong habitat. Try again.");
    }
  });
});

// Reset game
resetButton.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
  winMessage.style.display = 'none';
  listenedAnimals.clear();

  document.querySelectorAll('.animal').forEach(animal => {
    animalContainer.appendChild(animal);
    animal.setAttribute('draggable', true);
    animal.style.cursor = 'grab';
  });

  document.querySelectorAll('.habitat, .dropzone').forEach(zone => {
    zone.style.backgroundColor = '#fffde7';
  });
});
