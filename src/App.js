import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <h1>Hi, I'm Alex</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua...
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <fieldset>
          <legend>Select your interests:</legend>

          <label>
            <input
              type="checkbox"
              value="React"
              onChange={handleCheckboxChange}
              checked={formData.interests.includes("React")}
              aria-label="React"
            />
            React
          </label>

          <label>
            <input
              type="checkbox"
              value="CSS"
              onChange={handleCheckboxChange}
              checked={formData.interests.includes("CSS")}
              aria-label="CSS"
            />
            CSS
          </label>

          <label>
            <input
              type="checkbox"
              value="Node.js"
              onChange={handleCheckboxChange}
              checked={formData.interests.includes("Node.js")}
              aria-label="Node.js"
            />
            Node.js
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

    
      {submitted && (
        <div>
          <h2>Thank you, {formData.name}!</h2>
          <p>You selected: {formData.interests.join(", ")}</p>
        </div>
      )}
    </main>
  );
}

export default App;
