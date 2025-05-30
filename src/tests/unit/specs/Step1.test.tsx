import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Step1 from "../../../pages/stepper/Step1";
import { store } from "../../../store";

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );

describe("Step1 Component", () => {
  test("renders form fields", () => {
    renderWithProviders(<Step1 />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile Photo/i)).toBeInTheDocument();
    expect(screen.getByText(/Marital Status/i)).toBeInTheDocument();
  });

  test("submit disabled initially", async () => {
    renderWithProviders(<Step1 />);
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  test("fills and submits the form", async () => {
    renderWithProviders(<Step1 />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Single/i));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
    });

    fireEvent.click(screen.getByRole("button", { name: /next/i }));
  });

  test("displays error if email not selected", async () => {
    renderWithProviders(<Step1 />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John" },
    });
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });
});
