let speechUnlocked = false;

function unlockSpeech() {
  if (speechUnlocked) return;

  const utter = new SpeechSynthesisUtterance(" ");
  speechSynthesis.speak(utter);
  speechUnlocked = true;

  console.log("Speech unlocked");
}

["click", "keydown", "touchstart"].forEach(evt => {
  document.addEventListener(evt, unlockSpeech, { once: true });
});

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

// ---------- Navigation & Form Loading ----------
const pageSelection = document.getElementById("pageSelection");
const pageForm = document.getElementById("pageForm");
const formTitle = document.getElementById("formTitle");
const backBtn = document.getElementById("backBtn");
const formContainer = document.getElementById("formContainer");

let currentFormType = '';

document.querySelectorAll(".form-card").forEach(btn => {
  btn.onclick = () => {
    const formType = btn.getAttribute('data-form');
    currentFormType = formType;

    // Set form title
    formTitle.textContent = btn.textContent;

    // Load form from forms.js
    if (forms[formType]) {
      formContainer.innerHTML = forms[formType];
    }

    // Navigate to form page
    pageSelection.classList.remove("active");
    pageForm.classList.add("active");
  };
});

backBtn.onclick = () => {
  pageForm.classList.remove("active");
  pageSelection.classList.add("active");
  currentFormType = '';
};

// ---------- Conditional Fields (Dynamic Forms) ----------
document.addEventListener("change", function (e) {
  if (e.target && e.target.id === "hasIllness") {
    const specifyInput = document.getElementById("illnessSpecify");
    if (!specifyInput) return;

    if (e.target.value === "yes") {
      specifyInput.disabled = false;
      specifyInput.required = true;
    } else {
      specifyInput.disabled = true;
      specifyInput.required = false;
      specifyInput.value = "";
    }
  }
});

// ---------- Assistant ----------
let idleTimer;
let assistantEnabled = true;
let currentActiveItem = null;

const assistantOverlay = document.getElementById("assistantOverlay");
const assistantLabel = document.getElementById("assistantLabel");
const assistantInput = document.getElementById("assistantInput");
const assistantSelect = document.getElementById("assistantSelect");

const nextBtn = document.getElementById("nextBtn");
const repeatBtn = document.getElementById("repeatBtn");
const offBtn = document.getElementById("offBtn");
const fillBtn = document.getElementById("fillBtn");

fillBtn.style.display = "none";

function resetIdle() {
  if (!assistantEnabled) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(showAssistant, 7000);
}

["mousemove", "keydown", "click", "touchstart"].forEach(e =>
  document.addEventListener(e, resetIdle)
);

// Help Button
const helpBtn = document.getElementById("helpBtn");
if (helpBtn) {
  helpBtn.onclick = () => {
    assistantEnabled = true;
    showAssistant();
  };
}

function getReadableItems() {
  if (!privacyOverlay.classList.contains("hidden")) {
    const items = [];
    const privacyP = privacyOverlay.querySelector("p");
    if (privacyP) {
  privacyP.dataset.assistantLabel = "Privacy Notice";
  privacyP.dataset.ttsLabel = privacyP.innerText;
  items.push(privacyP);
}

    if (agreeCheck && !agreeCheck.checked) items.push(agreeCheck);
    return items;
  }

  if (!privacyModal.classList.contains("hidden")) {
    return [privacyText];
  }

  if (pageSelection.classList.contains("active")) {
    return [...document.querySelectorAll(".form-card")];
  }

  if (pageForm.classList.contains("active")) {
    return [...formContainer.querySelectorAll("input, select")]
      .filter(i => i.required && i.offsetParent !== null && !i.value);
  }

  return [];
}

function showAssistant() {
  if (!assistantEnabled) return;

  const items = getReadableItems();
  if (items.length === 0) return;

  assistantOverlay.classList.remove("hidden");
  activate(items[0]);
}


function activate(item) {
  currentActiveItem = item;
  assistantOverlay.classList.remove("hidden");

  assistantInput.classList.add("hidden");
  assistantSelect.classList.add("hidden");
  fillBtn.style.display = "none";

  assistantInput.oninput = null;
  assistantSelect.onchange = null;

  let textToSpeak = "";
  let labelText = "";

  // CONTEXT-AWARE BUTTON
  if (!privacyOverlay.classList.contains("hidden")) {
    nextBtn.textContent = "Agree";
    nextBtn.onclick = () => {
      agreeCheck.checked = true;
      agreeCheck.dispatchEvent(new Event("change"));
      enterBtn.click();
      assistantOverlay.classList.add("hidden");
    };
  } else {
    nextBtn.textContent = "Next";
    nextBtn.onclick = assistantNext;
  }

  // Checkbox
  if (item.tagName === "INPUT" && item.type === "checkbox") {
    labelText = item.parentElement.textContent.trim();
    textToSpeak = labelText;
    assistantLabel.textContent = labelText;

    setTimeout(() => {
      item.checked = true;
      item.dispatchEvent(new Event('change'));
    }, 2000);
  }

  // Select
  else if (item.tagName === "SELECT") {
    const formGroup = item.closest(".form-group");
    const label = formGroup?.querySelector("label")?.textContent || "";
    labelText = item.dataset.assistantLabel || label;
    textToSpeak = item.dataset.ttsLabel || label;

    assistantSelect.classList.remove("hidden");
    assistantSelect.innerHTML = item.innerHTML;
    assistantSelect.value = item.value;

    assistantSelect.onchange = () => {
      item.value = assistantSelect.value;
      item.dispatchEvent(new Event("change", { bubbles: true }));
    };

    assistantLabel.textContent = labelText;
  }

  // Input
  else if (item.tagName === "INPUT") {
    const formGroup = item.closest(".form-group");
    const label = formGroup?.querySelector("label")?.textContent || "";
    labelText = item.dataset.assistantLabel || label;
    textToSpeak = item.dataset.ttsLabel || label;

    assistantInput.classList.remove("hidden");
    assistantInput.type = item.type || "text";
    assistantInput.value = item.value;

    assistantInput.oninput = () => item.value = assistantInput.value;

    assistantLabel.textContent = labelText;
  }

  // Form card (selection screen)
  else if (item.classList.contains("form-card")) {
    labelText = item.textContent;
    textToSpeak = item.textContent;
    assistantLabel.textContent = labelText;

    fillBtn.style.display = "block";
    fillBtn.onclick = () => {
      item.click();
      assistantOverlay.classList.add("hidden");
    };
  } else if (item.tagName === "P") {
  // Use the ACTUAL paragraph text for both display and speech
  labelText = item.innerText;
  textToSpeak = item.innerText;
  assistantLabel.textContent = labelText;
}


  speak(textToSpeak);
}

function assistantNext() {
  const items = getReadableItems();
  if (items.length === 0) {
    assistantOverlay.classList.add("hidden");
    return;
  }

  let nextIndex = 0;
  if (currentActiveItem) {
    const idx = items.indexOf(currentActiveItem);
    if (idx !== -1) nextIndex = (idx + 1) % items.length;
  }

  activate(items[nextIndex]);
}

repeatBtn.onclick = () => {
  if (currentActiveItem) {
    if (currentActiveItem.tagName === "P") currentActiveItem.dataset.ttsSpoken = "";
    activate(currentActiveItem);
  }
};


offBtn.onclick = () => {
  assistantEnabled = false;
  assistantOverlay.classList.add("hidden");
};

function speak(text) {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-PH";

  // Ensure voices are loaded
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    utterance.voice = voices.find(v => v.lang === 'en-PH') || voices[0];
    speechSynthesis.speak(utterance);
  } else {
    // Wait until voices are loaded, then speak once
    const handleVoices = () => {
      const loadedVoices = speechSynthesis.getVoices();
      utterance.voice = loadedVoices.find(v => v.lang === 'en-PH') || loadedVoices[0];
      speechSynthesis.speak(utterance);
      speechSynthesis.removeEventListener('voiceschanged', handleVoices);
    };
    speechSynthesis.addEventListener('voiceschanged', handleVoices);
  }
}



resetIdle();

// ---------- Form Submission ----------
const successModal = document.getElementById("successModal");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");

document.getElementById("mainForm").onsubmit = (e) => {
  e.preventDefault();

  // Show success modal
  successModal.classList.remove("hidden");
};

closeSuccessBtn.onclick = () => {
  successModal.classList.add("hidden");
  location.reload();
};

// ---------- Admin Panel ----------
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminLoginModal = document.getElementById("adminLoginModal");
const closeAdminLoginBtn = document.getElementById("closeAdminLoginBtn");
const adminSignInBtn = document.getElementById("adminSignInBtn");
const pageAdmin = document.getElementById("pageAdmin");
const adminBackBtn = document.getElementById("adminBackBtn");
const submittedForms = document.getElementById("submittedForms");

// Dummy submitted forms data
const dummyForms = [
  {
    id: 1,
    type: "Senior Citizen ID",
    name: "Juan Dela Cruz",
    date: "2026-01-25",
    status: "Completed"
  },
  {
    id: 2,
    type: "Barangay Clearance",
    name: "Maria Santos",
    date: "2026-01-26",
    status: "Pending"
  },
  {
    id: 3,
    type: "Certificate of Residency",
    name: "Pedro Garcia",
    date: "2026-01-26",
    status: "Completed"
  },
  {
    id: 4,
    type: "Social Pension",
    name: "Rosa Reyes",
    date: "2026-01-27",
    status: "Pending"
  },
  {
    id: 5,
    type: "Senior Citizen ID",
    name: "Carlos Lopez",
    date: "2026-01-27",
    status: "Completed"
  }
];

// Show admin login modal
adminLoginBtn.onclick = () => {
  adminLoginModal.classList.remove("hidden");
};

// Close admin login modal
closeAdminLoginBtn.onclick = () => {
  adminLoginModal.classList.add("hidden");
};

// Sign in to admin panel
adminSignInBtn.onclick = () => {
  adminLoginModal.classList.add("hidden");
  pageSelection.classList.remove("active");
  pageAdmin.classList.add("active");
  renderSubmittedForms();
  updateHeaderButtons();

};

// Back from admin panel
adminBackBtn.onclick = () => {
  pageAdmin.classList.remove("active");
  pageSelection.classList.add("active");
  updateHeaderButtons();

};


// Render submitted forms in admin panel
function renderSubmittedForms() {
  submittedForms.innerHTML = `
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <thead>
          <tr style="background: linear-gradient(135deg, #1e3a8a, #2563eb); color: white;">
            <th style="padding: 1rem; text-align: left;">ID</th>
            <th style="padding: 1rem; text-align: left;">Form Type</th>
            <th style="padding: 1rem; text-align: left;">Applicant Name</th>
            <th style="padding: 1rem; text-align: left;">Date Submitted</th>
            <th style="padding: 1rem; text-align: left;">Status</th>
            <th style="padding: 1rem; text-align: center;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${dummyForms.map(form => {
    let statusColor = form.status === 'Completed' ? '#dcfce7' : '#fef3c7';
    let statusTextColor = form.status === 'Completed' ? '#166534' : '#92400e';
    return `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 1rem;">${form.id}</td>
              <td style="padding: 1rem;">${form.type}</td>
              <td style="padding: 1rem;">${form.name}</td>
              <td style="padding: 1rem;">${form.date}</td>
              <td style="padding: 1rem;">
                <span style="padding: 0.25rem 0.75rem; border-radius: 12px; background: ${statusColor}; color: ${statusTextColor}; font-size: 0.9rem;">
                  ${form.status}
                </span>
              </td>
              <td style="padding: 1rem; text-align: center;">
                <button class="print-btn" data-id="${form.id}" style="background: ${form.status === 'Completed' ? '#6b7280' : '#16a34a'}; font-size: 0.9rem; padding: 0.5rem 1rem;" ${form.status === 'Completed' ? 'disabled' : ''}>
                  ${form.status === 'Completed' ? 'Printed' : 'Print'}
                </button>
              </td>
            </tr>
          `;
  }).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Add print button event listeners
  document.querySelectorAll('.print-btn').forEach(btn => {
    if (btn.textContent !== 'Printed') {
      btn.onclick = (e) => {
        const formId = parseInt(e.target.getAttribute('data-id'));
        const form = dummyForms.find(f => f.id === formId);
        if (form) {
          form.status = 'Completed';
          renderSubmittedForms();
        }
      };
    }
  });
}

function updateHeaderButtons() {
  if (pageAdmin.classList.contains("active")) {
    privacyBtn.style.display = "none";
    helpBtn.style.display = "none";
  } else {
    privacyBtn.style.display = "inline-block";
    helpBtn.style.display = "inline-block";
  }
}


resetIdle();
updateHeaderButtons();


