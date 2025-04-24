import React, { useEffect, useState } from "react";
const API_BASE = "http://127.0.0.1:8787";

function LearningEntryList({ reload, onEdit }) {
  const [entries, setEntries] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [filterConfidence, setFilterConfidence] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // ✅ Delete function
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirm) return;

    try {
      await fetch(`${API_BASE}/entries/${id}`, {
        method: "DELETE",
      });
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  // ✅ Fetch entries from backend
  useEffect(() => {
    fetch(`${API_BASE}/entries`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
        setEntries(sorted);
      })
      .catch((err) => console.error("Failed to fetch entries:", err));
  }, [reload, sortOrder]); // 👈 Add sortOrder to trigger re-sorting

  // ✅ Filters
  const filteredEntries = entries.filter((entry) => {
    const matchesTag =
      searchTag.trim() === "" ||
      entry.tag?.toLowerCase().includes(searchTag.toLowerCase());

    const matchesConfidence =
      filterConfidence === "" || entry.confidence === filterConfidence;

    return matchesTag && matchesConfidence;
  });

  const handleExport = () => {
    const dataToExport = JSON.stringify(entries, null, 2); // Pretty format
    const blob = new Blob([dataToExport], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "learning-entries.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2>📚 My Learning Entries</h2>

      <button
        onClick={handleExport}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#10b981",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        ⬇ Export as JSON
      </button>

      {/* Filter Bar */}
      <div className="filter-bar">
        <select
          value={filterConfidence}
          onChange={(e) => setFilterConfidence(e.target.value)}
        >
          <option value="">-- Filter by confidence --</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
        />

        {/* New: Sort Order Toggle */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Sort by: Newest First</option>
          <option value="asc">Sort by: Oldest First</option>
        </select>
      </div>

      {/* Entries */}
      {filteredEntries.length === 0 && <p>No matching entries found.</p>}
      {filteredEntries.map((entry) => (
        <div key={entry.id} className="entry">
          <h3>{entry.topic}</h3>
          <p>
            <strong>Notes:</strong> {entry.notes}
          </p>
          <p>
            <strong>Confidence:</strong> {entry.confidence}
          </p>
          <p>
            <strong>Tag:</strong> {entry.tag}
          </p>
          {entry.timeSpent && (
            <p>
              <strong>Time Spent:</strong> {entry.timeSpent}
            </p>
          )}
          {entry.resourceLink && (
            <p>
              <strong>Resource:</strong>{" "}
              <a
                href={entry.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {entry.resourceLink}
              </a>
            </p>
          )}
          <p>
            <em>{entry.createdAt?.toDate?.().toLocaleString?.()}</em>
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              onClick={() => handleDelete(entry.id)}
              style={{
                backgroundColor: "#f87171",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              Delete
            </button>

            <button
              onClick={() => onEdit(entry)}
              style={{
                backgroundColor: "#60a5fa",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LearningEntryList;
