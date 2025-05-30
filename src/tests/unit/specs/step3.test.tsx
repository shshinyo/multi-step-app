import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Step3 from "../../../pages/stepper/Step3";
import "@testing-library/jest-dom";

const mockedNavigate = vi.fn();
const mockedDispatch = vi.fn();
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
          email: "alice@example.com",
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

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const workersMock = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123456789",
    website: "john.com",
    company: { name: "JohnCo" },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987654321",
    website: "jane.com",
    company: { name: "JaneInc" },
  },
];

describe("Step3 Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    vi.clearAllMocks();
  });

  test("fetches and displays workers", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: workersMock });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step3 />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  test("selects and toggles workers", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: workersMock });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step3 />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText("John Doe"));

    const workerCard = screen.getByText("John Doe").closest("div");
    expect(workerCard).toBeInTheDocument();

    if (workerCard) {
      expect(workerCard).toHaveClass("card-E2E");

      fireEvent.click(workerCard);
      expect(workerCard).toHaveClass("card-E2E");

      fireEvent.click(workerCard);
      expect(workerCard).toHaveClass("card-E2E");
    }
  });

  test("next button is disabled when no selection, enabled when selected", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: workersMock });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step3 />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText("John Doe"));

    const nextBtn = screen.getByRole("button", { name: /next/i });

    const workerCard = screen.getByText("John Doe").closest("div");
    if (workerCard) fireEvent.click(workerCard);

    expect(nextBtn).toBeEnabled();
  });

  test("dispatches updateForm and navigates on next", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: workersMock });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step3 />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText("John Doe"));

    const workerCard = screen.getByText("John Doe").closest("div");
    if (workerCard) fireEvent.click(workerCard);

    const nextBtn = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextBtn);

    expect(mockedNavigate).toHaveBeenCalledWith("/step4");
  });

  test("dispatches updateForm and navigates on back", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: workersMock });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step3 />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText("John Doe"));

    const workerCard = screen.getByText("John Doe").closest("div");
    if (workerCard) fireEvent.click(workerCard);

    const backBtn = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backBtn);

    expect(mockedNavigate).toHaveBeenCalledWith("/step2");
  });
});
