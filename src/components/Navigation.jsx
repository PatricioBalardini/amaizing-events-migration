import React from "react";
import "../App.css";


export default function Navigation({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <a href={item.url}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
}
