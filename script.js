const API_URL = "https://python-api-render-ubr9.onrender.com/ask";
let userName = "";
let firstMessage = true;

document.getElementById("nameInput").addEventListener("keydown", e => {
  if (e.key === "Enter") startChat();
});

document.getElementById("questionInput").addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

function startChat() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) { alert("Escribe tu nombre para continuar"); return; }
  userName = name;
  document.getElementById("activeName").textContent = name;
  document.getElementById("modal").style.display = "none";
  document.getElementById("questionInput").focus();
}

function useSuggestion(btn) {
  document.getElementById("questionInput").value = btn.textContent.slice(2).trim();
  sendMessage();
}

function hideSuggestions() {
  if (firstMessage) {
    document.getElementById("suggestions").style.display = "none";
    firstMessage = false;
  }
}

function addMessage(text, type) {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");

  if (type === "user") {
    div.style.cssText = "align-self:flex-end; background: #00000016; color: #333; padding:14px 18px; border-radius:30px 0px 30px 30px; max-width:320px; font-size:15px;";
    div.textContent = text;
    messages.appendChild(div);

  } else if (type === "bot") {
    div.style.cssText = "align-self:flex-start; display:flex; align-items:flex-start; gap:10px; max-width:600px;";
    const dot = document.createElement("span");
    dot.style.cssText = "min-width:10px; height:10px; background:#b439fbe8; border-radius:50%; margin-top:6px; display:inline-block; flex-shrink:0;";
    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    textSpan.style.cssText = "font-size:15px; color:#1f2937; line-height:1.7;";
    div.appendChild(dot);
    div.appendChild(textSpan);
    messages.appendChild(div);

  } else {
    div.style.cssText = "align-self:flex-start; display:flex; align-items:flex-start; gap:10px; max-width:600px;";
    const dot = document.createElement("span");
    dot.style.cssText = "min-width:10px; height:10px; background:#d1d5db; border-radius:50%; margin-top:6px; display:inline-block;";
    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    textSpan.style.cssText = "font-size:14px; color:#9ca3af; font-style:italic;";
    div.appendChild(dot);
    div.appendChild(textSpan);
    messages.appendChild(div);
  }

  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function sendMessage() {
  const question = document.getElementById("questionInput").value.trim();
  const btn = document.getElementById("sendBtn");
  if (!question) return;

  hideSuggestions();
  addMessage(question, "user");
  document.getElementById("questionInput").value = "";
  btn.disabled = true;

  const loading = addMessage("Pensando...", "loading");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, question })
    });
    const data = await res.json();
    loading.remove();
    addMessage(data.answer, "bot");
  } catch (err) {
    loading.remove();
    addMessage("Error al conectar con la API ❌", "bot");
  }

  btn.disabled = false;
}
