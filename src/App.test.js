// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



// import { render, screen } from "@testing-library/react";
// import BookingForm from "./BookingForm";

// test('Renders the BookingForm heading', () => {
//     render(<BookingForm />);
//     const headingElement = screen.getByText("Book Now");
//     expect(headingElement).toBeInTheDocument();
// })

import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";

describe("Booking Form", () => {
  test("User is able to submit the form if the selected input is as follows", () => {
    const date = "2024-10-25";
    const time = "17:00";
    const guests = 2;
    const occasion = "Birthday";
    const handleSubmit = jest.fn();

    const mockSetDate = jest.fn();
    const mockSetTime = jest.fn();
    const mockSetGuests = jest.fn();
    const mockSetOccasion = jest.fn();

    render(
      <BookingForm
        submitForm={handleSubmit}
        availableTimes={["17:00", "17:30", "18:00"]}
        setDate={mockSetDate}
        setTime={mockSetTime}
        setGuests={mockSetGuests}
        setOccasion={mockSetOccasion}
      />
    );

    const dateInput = screen.getByLabelText(/Choose date/);
    fireEvent.change(dateInput, { target: { value: date } });

    const timeSelect = screen.getByLabelText(/Choose time/);
    fireEvent.change(timeSelect, { target: { value: time } });

    const guestsInput = screen.getByLabelText(/Number of guests/);
    fireEvent.change(guestsInput, { target: { value: guests } });

    const occasionSelect = screen.getByLabelText(/Occasion/);
    fireEvent.change(occasionSelect, { target: { value: occasion } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      date,
      time,
      guests,
      occasion,
    });
  });
});
