import React from "react";

const newsItems = [
  {
    title: "Visa Update for Students",
    date: "2025-10-01",
    content:
      "Japan has updated its student visa process. Please check the embassy website for details.",
  },
  {
    title: "Nepalese Festival in Tokyo",
    date: "2025-10-15",
    content:
      "Join the Nepalese community festival at Ueno Park. Food, music, and cultural events!",
  },
  {
    title: "COVID-19 Guidelines",
    date: "2025-09-28",
    content:
      "Latest COVID-19 safety measures for international students. Masks required in public places.",
  },
];

const News: React.FC = () => (
  <section>
    <h2>News & Updates</h2>
    <ul>
      {newsItems.map((item, idx) => (
        <li key={idx} style={{ marginBottom: "1.5rem" }}>
          <strong>{item.title}</strong>{" "}
          <span style={{ color: "#888" }}>({item.date})</span>
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
    <p style={{ fontSize: "0.9rem", color: "#888" }}>
      <em>Latest news for Nepalese students in Japan.</em>
    </p>
  </section>
);

export default News;
