// Supabase setup
const supabaseUrl = "https://ajgkjydmmmgfqzcnwkoz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZ2tqeWRtbW1nZnF6Y253a296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzYwNTgsImV4cCI6MjA3MjE1MjA1OH0.TZFrXuJWaMos_CpAEyClUTnpAH8kKXu5Q2xRmEM3Ak0"; // keep real key only in backend for safety
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const alertDiv = document.getElementById("form-alert");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      alertDiv.innerHTML = "";

      const name = form.name.value;
      const email = form.email.value;
      const message = form.message.value;

      try {
        const { error } = await supabase
          .from("contacts")
          .insert([{ name, email, message }]);

        if (error) throw error;

        alertDiv.textContent = "Message submitted successfully!";
        alertDiv.className = "alert-success";
        form.reset();
      } catch (err) {
        alertDiv.textContent = "Error: " + err.message;
        alertDiv.className = "alert-error";
      } finally {
        submitBtn.textContent = "Send";
        submitBtn.disabled = false;
      }
    });
  }
});
