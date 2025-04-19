import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

function LearningEntryList() {
  const [entries, setEntries] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [filterConfidence, setFilterConfidence] = useState("");

  // ✅ Delete function
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "entries", id));
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  // ✅ Realtime Firestore data
  useEffect(() => {
    const q = query(collection(db, "entries"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(items);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Filters
  const filteredEntries = entries.filter((entry) => {
    const matchesTag =
      searchTag.trim() === "" ||
      entry.tag?.toLowerCase().includes(searchTag.toLowerCase());

    const matchesConfidence =
      filterConfidence === "" || entry.confidence === filterConfidence;

    return matchesTag && matchesConfidence;
  });

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2>📚 My Learning Entries</h2>

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
            <em>{entry.createdAt?.toDate().toLocaleString()}</em>
          </p>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(entry.id)}
            style={{
              marginTop: "1rem",
              backgroundColor: "#f87171",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default LearningEntryList;
