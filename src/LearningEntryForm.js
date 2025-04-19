import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function LearningEntryForm() {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [confidence, setConfidence] = useState('medium');
  const [tag, setTag] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [resourceLink, setResourceLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'entries'), {
        topic,
        notes,
        confidence,
        tag: tag === 'Custom' ? customTag : tag,
        timeSpent,
        resourceLink,
        createdAt: Timestamp.now(),
      });

      // Clear form
      setTopic('');
      setNotes('');
      setConfidence('medium');
      setTag('');
      setCustomTag('');
      setTimeSpent('');
      setResourceLink('');
      alert('Entry added!');
    } catch (err) {
      console.error('Error adding entry:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h2>Add Learning Entry</h2>

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
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">-- Select a tag --</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Python">Python</option>
          <option value="Web Development">Web Development</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="Custom">Custom</option>
        </select>

        {tag === 'Custom' && (
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

        <button type="submit">Save Entry</button>
      </div>
    </form>
  );
}

export default LearningEntryForm;
