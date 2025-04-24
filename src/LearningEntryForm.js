import React, { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8787";

function LearningEntryForm({ onEntrySaved, editingEntry }) {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [confidence, setConfidence] = useState("medium");
  const [tag, setTag] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [resourceLink, setResourceLink] = useState("");

  useEffect(() => {
    if (editingEntry) {
      setTopic(editingEntry.topic || "");
      setNotes(editingEntry.notes || "");
      setConfidence(editingEntry.confidence || "medium");
      setTag(editingEntry.tag || "");
      setCustomTag("");
      setTimeSpent(editingEntry.timeSpent || "");
      setResourceLink(editingEntry.resourceLink || "");
    }
  }, [editingEntry]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entry = {
      topic,
      notes,
      confidence,
      tag: tag === "Custom" ? customTag : tag,
      timeSpent,
      resourceLink,
    };

    try {
      const res = await fetch(
        `${API_BASE}/entries${editingEntry ? `/${editingEntry.id}` : ""}`,
        {
          method: editingEntry ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        }
      );

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Server error ${res.status}: ${errorMessage}`);
      }

      // Reset form after submit
      setTopic("");
      setNotes("");
      setConfidence("medium");
      setTag("");
      setCustomTag("");
      setTimeSpent("");
      setResourceLink("");

      alert(editingEntry ? "✅ Entry updated!" : "✅ Entry added!");

      if (typeof onEntrySaved === "function") onEntrySaved();
    } catch (err) {
      console.error("Error saving entry:", err.message);
      alert("❌ Failed to save entry. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h2>{editingEntry ? "Edit Entry" : "Add Learning Entry"}</h2>

        <label>Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />

        <label>Confidence Level:</label>
        <select
          value={confidence}
          onChange={(e) => setConfidence(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <label>Tag:</label>
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">-- Select a tag --</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Python">Python</option>
          <option value="Web Development">Web Development</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="Custom">Custom</option>
        </select>

        {tag === "Custom" && (
          <>
            <label>Custom Tag:</label>
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              required
            />
          </>
        )}

        <label>Time Spent Learning:</label>
        <input
          type="text"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          placeholder="e.g. 30 minutes, 2 hours"
        />

        <label>Resource Link:</label>
        <input
          type="url"
          value={resourceLink}
          onChange={(e) => setResourceLink(e.target.value)}
          placeholder="https://example.com"
        />

        <button type="submit">
          {editingEntry ? "Update Entry" : "Save Entry"}
        </button>
      </div>
    </form>
  );
}

export default LearningEntryForm;
