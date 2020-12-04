import React from "react";
import * as rlt from "@testing-library/react";
import ContactForm from "./components/ContactForm";

describe("ContactForm Tests", () => {
  test("renders ContactForm without crashing", () => {
    rlt.render(<ContactForm />);
  });

  test("can type in input files", () => {
    //Render Form
    rlt.render(<ContactForm />);

    //Grab Input Elements
    const fnInput = rlt.screen.getByLabelText(/First Name*/i);
    const lnInput = rlt.screen.getByLabelText(/Last Name*/i);
    const eInput = rlt.screen.getByLabelText(/Email*/i);
    const mInput = rlt.screen.getByLabelText(/Message/i);
    const button = rlt.screen.getByRole("button", { type: /submit/i });

    //Fire Input Events
    rlt.fireEvent.change(fnInput, {
      target: { name: "firstName", value: "Solomon" },
    });
    rlt.fireEvent.change(lnInput, {
      target: { name: "lastName", value: "Zelenko" },
    });
    rlt.fireEvent.change(eInput, {
      target: { name: "email", value: "zelenkosolomon@gmail.com" },
    });
    rlt.fireEvent.change(mInput, {
      target: { name: "message", value: "Howdy, Pardner" },
    });

    //Assertions
    expect(fnInput.value === "Solomon").toBeTruthy();
    expect(lnInput.value === "Zelenko").toBeTruthy();
    expect(eInput.value === "zelenkosolomon@gmail.com").toBeTruthy();
    expect(mInput.value === "Howdy, Pardner").toBeTruthy();
  });

  test("can submit form", async () => {
    //Render Form
    rlt.render(<ContactForm />);

    //Grab Input Elements
    const fnInput = rlt.screen.getByLabelText(/First Name*/i);
    const lnInput = rlt.screen.getByLabelText(/Last Name*/i);
    const eInput = rlt.screen.getByLabelText(/Email*/i);
    const mInput = rlt.screen.getByLabelText(/Message/i);
    const button = rlt.screen.getByRole("button", { type: /submit/i });

    //Test Cannot Submit Blank
    rlt.fireEvent.click(button);

    const newPerson = await rlt.screen.findByText(/required/i);
  });
});
