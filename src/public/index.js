const userInput = document.getElementById("git-username");
const startBtn = document.getElementById("start-btn");
const output = document.getElementById("output");

document.addEventListener("DOMContentLoaded", () => {
  startBtn.addEventListener("click", async () => {
    const username = userInput.value.trim();
    if (!username) return;
    output.innerHTML = `
      <div class="text-center text-neutral-400 animate-pulse">
        Loading analysis...
      </div>
    `;

    try {
      const req = await fetch("/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const response = await req.json();
      if (!req.ok) {
        throw new Error("API error");
      }

      const { feedback, ideas } = response;

      output.innerHTML = `
        <div class="flex flex-col gap-6">

          <!-- Feedback -->
          <div class="bg-neutral-800 rounded-xl p-5 border border-neutral-700">
            <h2 class="text-white text-xl font-semibold mb-3">
              Feedback
            </h2>
            <div id="feedback" class="prose prose-invert max-w-none"></div>
          </div>

          <!-- Ideas -->
          <div class="bg-neutral-800 rounded-xl p-5 border border-neutral-700">
            <h2 class="text-white text-xl font-semibold mb-3">
              Project Ideas
            </h2>
            <div id="ideas" class="prose prose-invert max-w-none"></div>
          </div>

        </div>
      `;

      const feedbackHtml = DOMPurify.sanitize(marked.parse(feedback));
      const ideasHtml = DOMPurify.sanitize(marked.parse(ideas));

      document.getElementById("feedback").innerHTML = feedbackHtml;
      document.getElementById("ideas").innerHTML = ideasHtml;

    } catch (err) {
      output.innerHTML = `
        <div class="text-red-400 text-center">
          Error fetching data. Try again.
        </div>
      `;
      console.error(err);
    }
  });
});
