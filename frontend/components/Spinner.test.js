import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";
import Spinner from "./Spinner";

// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test("sanity", () => {
  expect(true).toBe(true);
});

// test("App renders as expected without errors", () => {
//   render(<App />);
// });

// test("Elements renders correctly", () => {
//   {
//     render(<App />);

//     const displayInput = screen.getAllByRole("input");
//     const displayButton = screen.getByRole("input");

//     expect(displayInput).toBeInTheDocument();
//     expect(displayButton).toBeInTheDocument();
//   }
// });

// import mockApi from "../../backend/mock-server";
// jest.mock("../../backend/mock-server");

// test("Spinner renders when logged in", async () => {
//   //Arrange
//   render(<App />);

//   //Mock API
//   mockApi.login({
//     username: "test",
//     password: "1234567",
//   });

//   await waitFor(() => {
//     expect(<Spinner />).toBeInTheDocument;
//   });
// });
