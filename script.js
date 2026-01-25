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
let currentActiveInput = null;

const assistantOverlay = document.getElementById("assistantOverlay");
const assistantLabel = document.getElementById("assistantLabel");
const assistantInput = document.getElementById("assistantInput");
const nextBtn = document.getElementById("nextBtn");
const offBtn = document.getElementById("offBtn");

function resetIdle() {
  if (!assistantEnabled) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(showAssistant, 20000);
}

["mousemove", "keydown", "click", "touchstart"].forEach(e =>
  document.addEventListener(e, resetIdle)
);

function getEmptyRequiredFields() {
  return [...document.querySelectorAll("input")]
    .filter(i => i.required && i.offsetParent !== null && !i.value);
}

function showAssistant() {
  if (!assistantEnabled) return;
  if (!assistantOverlay.classList.contains("hidden")) return;
  const fields = getEmptyRequiredFields();
  if (fields.length === 0) return;
  activate(fields[0]);
}

function activate(input) {
  currentActiveInput = input;
  const label = input.closest(".form-group").querySelector("label").textContent;
  assistantOverlay.classList.remove("hidden");
  assistantLabel.textContent = label;
  assistantInput.value = input.value;
  assistantInput.type = input.type;

  assistantInput.oninput = () => input.value = assistantInput.value;
  speak("Pakilagay ang " + label);
}

nextBtn.onclick = () => {
  const fields = getEmptyRequiredFields();
  if (fields.length === 0) {
    assistantOverlay.classList.add("hidden");
    return;
  }

  let nextIndex = 0;
  if (currentActiveInput && !currentActiveInput.value) {
    const idx = fields.indexOf(currentActiveInput);
    if (idx !== -1) {
      nextIndex = (idx + 1) % fields.length;
    }
  }
  activate(fields[nextIndex]);
};

const repeatBtn = document.getElementById("repeatBtn");
repeatBtn.onclick = () => {
  if (currentActiveInput) {
    const label = currentActiveInput.closest(".form-group").querySelector("label").textContent;
    speak("Pakilagay ang " + label);
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
