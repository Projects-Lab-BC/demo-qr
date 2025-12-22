document.addEventListener("DOMContentLoaded", () => {

  const SUPABASE_URL = "https://febogdjpoxbyfhetwgip.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_P3XuSq-r38FLRGx3qSh96g_zVboPf-0";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  const form = document.getElementById("contact-form");
  const status = document.getElementById("status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Enviando...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const { error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        message,
        source: "demo-qr"
      });

    if (error) {
      console.error(error);
      status.textContent = "❌ Error al enviar el mensaje";
    } else {
      status.textContent = "✅ Mensaje enviado correctamente";
      form.reset();

        await fetch(
        "https://febogdjpoxbyfhetwgip.supabase.co/functions/v1/resend-emails",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            name,
            email,
            message,
            source: "demo-qr"
            })
        }
);

    }
  });

});