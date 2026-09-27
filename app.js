const urlInput = document.getElementById("url");
const analyzeBtn = document.getElementById("analyzeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const result = document.getElementById("result");
const title = document.getElementById("title");
const domain = document.getElementById("domain");
const status = document.getElementById("status");

let analyzedUrl = "";

function validHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

analyzeBtn.addEventListener("click", async () => {
  const value = urlInput.value.trim();
  if (!validHttpUrl(value)) {
    status.textContent = "Please enter a valid public URL.";
    urlInput.focus();
    return;
  }

  analyzedUrl = value;
  analyzeBtn.disabled = true;
  status.textContent = "Checking URL…";

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({url: value})
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Unable to analyze URL.");

    title.textContent = data.title || "MEDIA ready";
    domain.textContent = "Your media link";
    result.classList.add("show");
    status.textContent = data.demo
      ? "Backend is connected. Add your authorized media API credentials to enable real processing."
      : "Media information loaded.";
  } catch (error) {
    result.classList.remove("show");
    status.textContent = error.message || "Something went wrong.";
  } finally {
    analyzeBtn.disabled = false;
  }
});

downloadBtn.addEventListener("click", async () => {
  if (!analyzedUrl) return;

  downloadBtn.disabled = true;
  status.textContent = "Requesting download…";

  try {
    const response = await fetch("/api/download", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        url: analyzedUrl,
        format: document.getElementById("format").value
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Download request failed.");

    if (data.downloadUrl) {
      window.location.href = data.downloadUrl;
    } else {
      status.textContent = data.message || "Backend is ready; connect a media-processing provider for real downloads.";
    }
  } catch (error) {
    status.textContent = error.message || "Something went wrong.";
  } finally {
    downloadBtn.disabled = false;
  }
});
