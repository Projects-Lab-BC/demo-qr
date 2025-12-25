document.addEventListener("DOMContentLoaded", () => {
  const FUNCTION_URL = "https://febogdjpoxbyfhetwgip.supabase.co/functions/v1/submit-contact-message";

  const form = document.getElementById("contact-form");
  const status = document.getElementById("status");
  const submitBtn = form.querySelector('button[type="submit"]');

  if (!form) return;

  // Create honeypot field dynamically (keeps markup clean)
  let honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'hp_field';
  honeypot.id = 'hp_field';
  honeypot.style.display = 'none';
  form.appendChild(honeypot);

  let lastSentAt = 0;
  const MIN_INTERVAL_MS = 5000; // 5s between submits client-side

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!submitBtn) return;
    const now = Date.now();
    if (now - lastSentAt < MIN_INTERVAL_MS) {
      status.textContent = "Por favor espera un momento antes de reintentar.";
      return;
    }

    submitBtn.disabled = true;
    status.textContent = "Enviando...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const hpValue = document.getElementById("hp_field").value.trim();

    // Optional: get reCAPTCHA token if you added the widget
    // const captchaToken = (typeof grecaptcha !== 'undefined') ? grecaptcha.getResponse() : null;
    const captchaToken = null;

    // Basic client-side validation
    if (!name || !email || !message) {
      status.textContent = "Rellena todos los campos.";
      submitBtn.disabled = false;
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      status.textContent = "Email inválido.";
      submitBtn.disabled = false;
      return;
    }

    const payload = {
      name,
      email,
      message,
      source: "demo-qr",
      captcha_token: captchaToken,
      honeypot: hpValue // intentionally include field for server-side honeypot check
    };

    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 201 || res.ok) {
        status.textContent = "✅ Mensaje enviado correctamente";
        form.reset();
        lastSentAt = Date.now();
        // If using reCAPTCHA v2:
        // if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
      } else if (res.status === 400) {
        status.textContent = data.error || "Entrada inválida.";
      } else if (res.status === 403) {
        status.textContent = data.error || "Fallo en reCAPTCHA o acceso denegado.";
      } else if (res.status === 429) {
        status.textContent = "Demasiadas solicitudes. Intenta más tarde.";
      } else {
        console.error("Error from function:", data);
        status.textContent = "❌ Error al enviar el mensaje";
      }
    } catch (err) {
      console.error("Network or unexpected error:", err);
      status.textContent = "❌ Error de red al enviar el mensaje";
    } finally {
      submitBtn.disabled = false;
    }
  });
});