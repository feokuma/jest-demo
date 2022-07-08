import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('<App />', () => {

    test("renders learn react link", async () => {
        mockedAxios.get.mockResolvedValue({
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
})