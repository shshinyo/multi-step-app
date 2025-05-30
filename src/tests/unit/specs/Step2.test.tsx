import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Step2 from "../../../pages/stepper/Step2";
import { store } from "../../../store";
import { updateForm } from "../../../store/slices/formSlice";
import "@testing-library/jest-dom";

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );

describe("Step2 Component", () => {
  beforeEach(() => {
    store.dispatch(
      updateForm({
        maritalStatus: "married",
        address: "",
        preferences: "",
        spouseName: "",
        dependents: [],
      }),
    );
  });

  test("renders fields including spouse and dependents if married", () => {
    renderWithProviders(<Step2 />);
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Preferences/i)).toBeInTheDocument();
    expect(screen.getByText(/Spouse's Name/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ Add Dependent/i)).toBeInTheDocument();
  });

  test("adds and removes dependent fields", () => {
    renderWithProviders(<Step2 />);
    fireEvent.click(screen.getByText(/\+ Add Dependent/i));
    expect(screen.getByText(/Dependent 1/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Remove dependent 1/i }),
    );
    expect(screen.queryByLabelText(/Dependent 1/i)).not.toBeInTheDocument();
  });

  test("submits valid form", async () => {
    renderWithProviders(<Step2 />);
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByLabelText(/Preferences/i), {
      target: { value: "Test preference" },
    });
    fireEvent.change(screen.getByLabelText(/Spouse's Name/i), {
      target: { value: "Jane Doe" },
    });

    waitFor(() => {
      expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
    });

    fireEvent.click(screen.getByRole("button", { name: /next/i }));
  });

  test('navigates back when "Back" is clicked', () => {
    renderWithProviders(<Step2 />);
    const backButton = screen.getByRole("button", { name: /Back/i });
    fireEvent.click(backButton);
  });
});
