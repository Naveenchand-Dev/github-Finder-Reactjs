import React from "react";

function About() {
  return (
    <div>
      <h1 className="text-6xl mb-6">Github Finder</h1>
      <p className="mb-4 text-2xl font-light">
        A React app to search GitHub profiles using Github API, and display the
        username and user's profile image
      </p>
      <p className="text-lg text-gray-400">
        Version <span className="text-white">1.0.0</span>
      </p>
      <p className="text-lg text-gray-400">
        Layout By:
        <a className="text-white" href="https://twitter.com/hassibmoddasser">
          Hassib Moddasser
        </a>
      </p>
    </div>
  );
}

export default About;
