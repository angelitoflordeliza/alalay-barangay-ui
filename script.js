
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

// ---------- Assistant ----------
let idleTimer;
let assistantEnabled = true;
let currentActiveItem = null;

const assistantOverlay = document.getElementById("assistantOverlay");
const assistantLabel = document.getElementById("assistantLabel");
const assistantInput = document.getElementById("assistantInput");
const assistantSelect = document.getElementById("assistantSelect");
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
  // 1. Privacy Gate Page
  if (!privacyOverlay.classList.contains("hidden")) {
    // Return privacy text first, then checkbox, then button
    const items = [];
    const privacyP = privacyOverlay.querySelector("p");
    if (privacyP) items.push(privacyP);
    if (agreeCheck && !agreeCheck.checked) items.push(agreeCheck);
    return items;
  }

  // 2. Privacy Policy Modal
  if (!privacyModal.classList.contains("hidden")) {
    return [privacyText];
  }

  // 3. Form Selection
  if (pageSelection && pageSelection.classList.contains("active")) {
    return [...document.querySelectorAll(".form-card")];
  }

  // 4. Form Filling - get inputs and selects from the CURRENT form
  if (pageForm && pageForm.classList.contains("active")) {
    // Get all inputs and selects within formContainer
    return [...formContainer.querySelectorAll("input, select")]
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

  // Reset UI - hide both input and select initially
  assistantInput.classList.add("hidden");
  assistantSelect.classList.add("hidden");
  assistantInput.oninput = null;
  assistantSelect.onchange = null;

  let textToSpeak = "";
  let labelText = "";

  // Handle different element types
  if (item.tagName === "INPUT" && item.type === "checkbox") {
    // Checkbox (for privacy agreement)
    labelText = item.parentElement.textContent.trim();
    assistantInput.classList.add("hidden");
    assistantSelect.classList.add("hidden");
    textToSpeak = "Mangyaring i-check para sumang-ayon. " + labelText;

    // Auto-click checkbox after speaking
    setTimeout(() => {
      item.checked = true;
      item.dispatchEvent(new Event('change'));
    }, 3000);

  } else if (item.tagName === "SELECT") {
    // SELECT element - show select dropdown
    const formGroup = item.closest(".form-group");
    if (formGroup) {
      const label = formGroup.querySelector("label");
      if (label) {
        labelText = label.textContent;

        // Show select dropdown and populate it
        assistantSelect.classList.remove("hidden");
        assistantSelect.innerHTML = item.innerHTML; // Copy all options
        assistantSelect.value = item.value;

        // Sync changes back to original select
        assistantSelect.onchange = () => {
          item.value = assistantSelect.value;
        };

        textToSpeak = "Pumili para sa " + labelText;
      }
    }
  } else if (item.tagName === "INPUT") {
    // Regular INPUT element
    const formGroup = item.closest(".form-group");
    if (formGroup) {
      const label = formGroup.querySelector("label");
      if (label) {
        labelText = label.textContent;

        // Show input box
        assistantInput.classList.remove("hidden");
        assistantInput.value = item.value;
        assistantInput.type = item.type || "text";

        // Sync changes back to original input
        assistantInput.oninput = () => item.value = assistantInput.value;

        textToSpeak = "Pakilagay ang " + labelText;
      }
    }
  } else if (item.classList && item.classList.contains("form-card")) {
    // Form Selection Button
    labelText = item.textContent;
    textToSpeak = "Piliin ang " + labelText;

  } else if (item.tagName === "P") {
    // Privacy Policy or other paragraph text
    labelText = "Privacy Policy / Patakaran sa Privacy";
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
    status: "Pending"
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
    status: "Pending"
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
    status: "Pending"
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
};

// Back from admin panel
adminBackBtn.onclick = () => {
  pageAdmin.classList.remove("active");
  pageSelection.classList.add("active");
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
          ${dummyForms.map(form => `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 1rem;">${form.id}</td>
              <td style="padding: 1rem;">${form.type}</td>
              <td style="padding: 1rem;">${form.name}</td>
              <td style="padding: 1rem;">${form.date}</td>
              <td style="padding: 1rem;">
                <span style="padding: 0.25rem 0.75rem; border-radius: 12px; background: #fef3c7; color: #92400e; font-size: 0.9rem;">
                  ${form.status}
                </span>
              </td>
              <td style="padding: 1rem; text-align: center;">
                <button class="print-btn" data-id="${form.id}" style="background: #16a34a; font-size: 0.9rem; padding: 0.5rem 1rem;">
                  Print
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Add print button event listeners
  document.querySelectorAll('.print-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.target.textContent = "Printed";
      e.target.style.background = "#6b7280";
      e.target.disabled = true;
    };
  });
}

resetIdle();
