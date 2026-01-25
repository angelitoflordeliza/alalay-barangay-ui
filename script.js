
// ---------- Privacy Gate ----------
const agreeCheck = document.getElementById("agreeCheck");
const enterBtn = document.getElementById("enterBtn");
const privacyOverlay = document.getElementById("privacyOverlay");
const app = document.getElementById("app");

agreeCheck.onchange = () => enterBtn.disabled = !agreeCheck.checked;
enterBtn.onclick = () => {
  privacyOverlay.classList.add("hidden");
  app.classList.remove("hidden");

};

// ---------- Privacy Policy Modal ----------
const privacyBtn = document.getElementById("privacyBtn");
const privacyModal = document.getElementById("privacyModal");
const closePrivacyBtn = document.getElementById("closePrivacyBtn");
const privacyText = document.getElementById("privacyText");

privacyBtn.onclick = () => {
  privacyModal.classList.remove("hidden");
};

closePrivacyBtn.onclick = () => {
  privacyModal.classList.add("hidden");
  speechSynthesis.cancel();
};

// ---------- Navigation ----------
const pageSelection = document.getElementById("pageSelection");
const pageForm = document.getElementById("pageForm");
const formTitle = document.getElementById("formTitle");
const backBtn = document.getElementById("backBtn");

document.querySelectorAll(".form-card").forEach(btn => {
  btn.onclick = () => {
    formTitle.textContent = btn.textContent;
    pageSelection.classList.remove("active");
    pageForm.classList.add("active");
  };
});

backBtn.onclick = () => {
  pageForm.classList.remove("active");
  pageSelection.classList.add("active");
};

// ---------- Assistant ----------
let idleTimer;
let assistantEnabled = true;
let currentActiveItem = null;

const assistantOverlay = document.getElementById("assistantOverlay");
const assistantLabel = document.getElementById("assistantLabel");
const assistantInput = document.getElementById("assistantInput");
const nextBtn = document.getElementById("nextBtn");
const offBtn = document.getElementById("offBtn");

function resetIdle() {
  if (!assistantEnabled) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(showAssistant, 7000);
}

["mousemove", "keydown", "click", "touchstart"].forEach(e =>
  document.addEventListener(e, resetIdle)
);

// Help Button (Manual Activation)
const helpBtn = document.getElementById("helpBtn");
if (helpBtn) {
  helpBtn.onclick = () => {
    assistantEnabled = true;
    showAssistant();
  };
}

function getReadableItems() {
  // 1. Privacy Policy
  if (!privacyModal.classList.contains("hidden")) {
    return [privacyText];
  }
  // 2. Form Selection
  if (pageSelection.classList.contains("active")) {
    return [...document.querySelectorAll(".form-card")];
  }
  // 3. Form Filling
  if (pageForm.classList.contains("active")) {
    return [...document.querySelectorAll("input")]
      .filter(i => i.required && i.offsetParent !== null && !i.value);
  }
  return [];
}

function showAssistant() {
  if (!assistantEnabled) return;
  if (!assistantOverlay.classList.contains("hidden")) return;

  const items = getReadableItems();
  if (items.length === 0) return;
  activate(items[0]);
}

function activate(item) {
  currentActiveItem = item;
  assistantOverlay.classList.remove("hidden");

  // Reset UI
  assistantInput.classList.remove("hidden");
  assistantInput.oninput = null;

  let textToSpeak = "";
  let labelText = "";

  if (item.tagName === "INPUT") {
    // Input Field
    labelText = item.closest(".form-group").querySelector("label").textContent;
    assistantInput.value = item.value;
    assistantInput.type = item.type;
    assistantInput.oninput = () => item.value = assistantInput.value;
    textToSpeak = "Pakilagay ang " + labelText;
  } else if (item.classList.contains("form-card")) {
    // Form Selection Button
    labelText = item.textContent;
    assistantInput.classList.add("hidden"); // Hide input for buttons
    textToSpeak = "Piliin ang " + labelText;
  } else if (item.id === "privacyText") {
    // Privacy Text
    labelText = "Privacy Policy";
    assistantInput.classList.add("hidden");
    textToSpeak = item.innerText;
  }

  assistantLabel.textContent = labelText;
  speak(textToSpeak);
}

nextBtn.onclick = () => {
  const items = getReadableItems();
  if (items.length === 0) {
    assistantOverlay.classList.add("hidden");
    return;
  }

  let nextIndex = 0;
  if (currentActiveItem) {
    const idx = items.indexOf(currentActiveItem);
    if (idx !== -1) {
      nextIndex = (idx + 1) % items.length;
    }
  }
  activate(items[nextIndex]);
};

const repeatBtn = document.getElementById("repeatBtn");
repeatBtn.onclick = () => {
  if (currentActiveItem) {
    activate(currentActiveItem); // Re-activate to re-speak
  }
};

offBtn.onclick = () => {
  assistantEnabled = false;
  assistantOverlay.classList.add("hidden");
};

function speak(text) {
  speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "fil-PH";
  speechSynthesis.speak(msg);
}

document.getElementById("mainForm").onsubmit = (e) => {
  e.preventDefault();
  alert("Form Submitted! (Prototype Only)");
  location.reload();
};

resetIdle();
