import React from "react";
import "../styles/Construction.css";

function Construction({ page }) {
  return (
    <section className="ConstructionSection">
      <div className="ConstructionCard">
        <div className="ConstructionIcon">🛠️</div>
        <header className="ConstructionHeader">
          <h2>
            Page <span>Under Construction</span>
          </h2>
          <p>
            Our <strong>{page}</strong> section is being prepared to deliver the
            best possible experience for you.
          </p>
        </header>
      </div>
    </section>
  );
}

export default Construction;
