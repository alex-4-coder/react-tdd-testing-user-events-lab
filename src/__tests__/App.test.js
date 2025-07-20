import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });
  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);
  const image = screen.getByAltText("My profile pic");
  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });
  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  const bio = screen.getByText(/lorem ipsum/i);
  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const githubLink = screen.getByRole("link", { name: /github/i });
  const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

  expect(githubLink).toHaveAttribute("href", expect.stringContaining("https://github.com"));
  expect(linkedinLink).toHaveAttribute("href", expect.stringContaining("https://linkedin.com"));
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  expect(screen.getByLabelText(/react/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/css/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/node\.?js/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  expect(screen.getByLabelText(/react/i)).not.toBeChecked();
  expect(screen.getByLabelText(/css/i)).not.toBeChecked();
  expect(screen.getByLabelText(/node\.?js/i)).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);
  const user = userEvent.setup();

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await user.type(nameInput, "Alex");
  await user.type(emailInput, "alex@example.com");

  expect(nameInput).toHaveValue("Alex");
  expect(emailInput).toHaveValue("alex@example.com");
});

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);
  const user = userEvent.setup();

  const react = screen.getByLabelText(/react/i);
  const css = screen.getByLabelText(/css/i);

  await user.click(react);
  await user.click(css);

  expect(react).toBeChecked();
  expect(css).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/name/i), "Alex");
  await user.type(screen.getByLabelText(/email/i), "alex@example.com");
  await user.click(screen.getByLabelText(/react/i));
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText(/thank you, alex/i)).toBeInTheDocument();
  expect(screen.getByText(/you selected: react/i)).toBeInTheDocument();
});
