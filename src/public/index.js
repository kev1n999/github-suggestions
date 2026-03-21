const userInput = document.getElementById("git-username");
const startBtn = document.getElementById("start-btn");
const output = document.getElementById("output");

document.addEventListener("DOMContentLoaded", () => {
  startBtn.addEventListener("click", async () => {
    const username = userInput.value.trim();
    if (!username) return;
    output.innerHTML = `
      <div class="text-center text-neutral-400 animate-pulse">
        Loading ideas...
      </div>
    `;
    try {
      const req = await fetch("/project-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const response = await req.json();
      if (!req.ok) {
        throw new Error("API error");
      }

      const { feedback, projects } = response;

      output.innerHTML = `
        <div class="bg-neutral-800 rounded-xl p-5 border border-neutral-700">
          <div id="feedback" class="space-y-5 text-sm text-neutral-300"></div>
          <div id="ideas" class="space-y-5 text-sm text-neutral-300"></div>
        </div>
      `;

      const feedbackContainer = document.getElementById("feedback");
      feedbackContainer.innerHTML = `
        <div class="border border-neutral-700 rounded-lg p-4">
          <h3 class="text-white text-3xl font-semibold mb-2">
            Feedback
          </h3>
          <p>
            ${feedback}
          </p>
        </div>
        `;
      const ideasContainer = document.getElementById("ideas");
      ideasContainer.innerHTML = projects.map(project => `
        <div class="border border-neutral-700 rounded-lg p-4">
          <h3 class="text-white text-3xl font-semibold mb-2">
            ${project.title}
          </h3>
          <p class="mb-3">
            ${project.description}
          </p>
          <div class="mb-2">
            <span class="text-white font-semibold">Funcionalidades:</span>
            <ul class="list-disc pl-5">
              ${project.features.map(f => `<li>${f}</li>`).join("")}
            </ul>
          </div>
          <div class="mb-2">
            <span class="text-white font-semibold">Stack:</span>
            <ul class="list-disc pl-5">
              ${project.stack.map(s => `<li>${s}</li>`).join("")}
            </ul>
          </div>
          <div>
            <span class="text-white font-semibold">Diferencial:</span>
            <p>${project.differential}</p>
          </div>
        </div>
      `).join("");
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
