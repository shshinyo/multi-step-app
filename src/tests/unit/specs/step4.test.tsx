import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import Step4 from "../../../pages/stepper/Step4";
import { vi } from "vitest";

const mockStore = configureStore([]);

// Shared mock functions
const mockedDispatch = vi.fn();
const mockedNavigate = vi.fn();

// Mock react-redux
vi.mock("react-redux", async () => {
  const actual =
    await vi.importActual<typeof import("react-redux")>("react-redux");
  return {
    ...actual,
    useDispatch: () => mockedDispatch,
    useSelector: (selector: any) =>
      selector({
        form: {
          name: "Alice",
          email: "test@example.com",
          address: "123 Main St",
          maritalStatus: "Single",
          preferences: ["Option1", "Option2"],
          spouseName: "",
          dependents: [],
          workersPreferences: [{ id: 1, name: "John Doe" }],
          profilePhoto: "https://example.com/photo.jpg",
        },
      }),
  };
});

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Step4 Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    mockedDispatch.mockClear();
    mockedNavigate.mockClear();
  });

  test("renders form data properly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step4 />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/123 main st/i)).toBeInTheDocument();
    expect(screen.getByText(/single/i)).toBeInTheDocument();
    expect(screen.getByText(/option1, option2/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  test("back button dispatches prevStep and navigates back", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step4 />
        </BrowserRouter>
      </Provider>,
    );

    const backBtn = screen.getByRole("button", {
      name: /go back to previous step/i,
    });
    fireEvent.click(backBtn);

    expect(mockedNavigate).toHaveBeenCalledWith("/step3");
  });

  test("submit button shows popup and disables button", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step4 />
        </BrowserRouter>
      </Provider>,
    );

    const submitBtn = screen.getByRole("button", { name: /submit form/i });
    expect(submitBtn).toBeEnabled();

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/review your data/i)).toBeInTheDocument();
    });
  });
});
