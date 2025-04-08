// Format: [startTime, "Lyric line", [wordStartTimes]]
const lyrics = [
  [2,  "Persahabatan bagai kepompong",           [0, 1.2, 2.6, 3.5]],
  [7,  "Mengubah ulat menjadi kupu-kupu",         [0, 1.2, 2.5, 3.5]],
  [12, "Persahabatan bagai kepompong",           [0, 1.2, 2.6, 3.5]],
  [17, "Hal yang tak mudah jadi lebih indah",     [0, 0.8, 1.7, 2.5, 3.5, 4.3]],
  [23, "Persahabatan bagai kepompong",           [0, 1.2, 2.6, 3.5]],
  [28, "Mengubah ulat menjadi kupu-kupu",         [0, 1.2, 2.5, 3.5]],
  [33, "Persahabatan bagai kepompong",           [0, 1.2, 2.6, 3.5]],
  [38, "Hal yang tak mudah jadi lebih indah",     [0, 0.8, 1.7, 2.5, 3.5, 4.3]],
  [44, "Tak pernah ada dusta di antara kita",     [0, 1, 2, 3.1, 4.1, 5.1]],
  [49, "Tak pernah ada rasa saling curiga",       [0, 1, 2.2, 3.5, 4.5]],
  [54, "Karena dirimu, oh sahabatku",             [0, 1, 2, 3.2]],
  [59, "Bagai anugerah terindah dalam hidupku",   [0, 1.2, 2.5, 3.6, 4.7, 5.8]],
  [65, "Persahabatan bagai kepompong",           [0, 1.2, 2.6, 3.5]],
  [70, "Mengubah ulat menjadi kupu-kupu",         [0, 1.2, 2.5, 3.5]],
  [75, "Persahabatan bagai kepompong",           [0, 1.2, 2.6, 3.5]],
  [80, "Hal yang tak mudah jadi lebih indah",     [0, 0.8, 1.7, 2.5, 3.5, 4.3]]
];

const audio = document.getElementById("audio");
const lyricsDiv = document.getElementById("lyrics");

let currentLineIndex = 0;
let wordIndex = 0;

function renderLine(line, currentWord) {
  const words = line.split(" ");
  return words
    .map((word, idx) =>
      idx === currentWord
        ? `<span class="highlight">${word}</span>`
        : word
    )
    .join(" ");
}

function updateLyrics() {
  const currentTime = audio.currentTime;

  if (currentLineIndex >= lyrics.length) return;

  const [lineStart, text, wordTimes] = lyrics[currentLineIndex];
  const nextLineStart = lyrics[currentLineIndex + 1]?.[0] ?? Infinity;

  if (currentTime >= nextLineStart) {
    currentLineIndex++;
    wordIndex = 0;
    return;
  }

  const relativeTime = currentTime - lineStart;

  if (relativeTime >= 0 && relativeTime <= 10) {
    // Check which word to highlight
    for (let i = wordTimes.length - 1; i >= 0; i--) {
      if (relativeTime >= wordTimes[i]) {
        wordIndex = i;
        break;
      }
    }
    lyricsDiv.innerHTML = renderLine(text, wordIndex);
  }
}

audio.addEventListener("timeupdate", updateLyrics);
audio.addEventListener("play", () => {
  currentLineIndex = 0;
  wordIndex = 0;
});
audio.addEventListener("ended", () => {
  lyricsDiv.innerHTML = "🎵 Selesai 🎵";
});
