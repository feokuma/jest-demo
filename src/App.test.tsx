import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios", () => ({
    ...jest.requireActual("axios"),
    get: jest.fn(),
}));

const getMocked = axios.get as jest.Mock;

test("renders learn react link", async () => {
    getMocked.mockReturnValue({
        data: [
            {
                id: 1,
                name: "Task 1",
                done: false,
            },
            {
                id: 2,
                name: "Task 2",
                done: false,
            },
        ],
    });
    render(<App />);

    fireEvent.click(screen.getByText("Get tasks"));

    await waitFor(() => {
        const tasks = screen.getAllByRole("listitem");

        expect(tasks[0]).toHaveTextContent("Task 1");
    });
});
