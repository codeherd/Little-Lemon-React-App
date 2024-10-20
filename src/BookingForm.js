import { useState, useEffect } from 'react';

function BookingForm({ availableTimes, setDate, setTime, setGuests, setOccasion, submitForm }) {

  const [date, setDateState] = useState('');
  const [time, setTimeState] = useState('');
  const [guests, setGuestsState] = useState(1);
  const [occasion, setOccasionState] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const validateDate = (selectedDate) => {
    const today = getTodayDate();
    return selectedDate >= today;
  };

  const validateForm = () => {
    const isDateValid = validateDate(date);
    if (isDateValid && time && guests >= 1 && occasion) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [date, time, guests, occasion, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      date,
      time,
      guests,
      occasion,
    };

    submitForm(formData);
  };

  return (
    <>
      <h2>Book Now</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", maxWidth: "200px", gap: "20px" }}
        noValidate
      >
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={date}
          required
          onChange={(e) => {
            setDate(e.target.value);
            setDateState(e.target.value);
            validateDate(e.target.value);
          }}
          min={getTodayDate()}
        />
        {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}

        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          value={time}
          required
          onChange={(e) => {
            setTime(e.target.value);
            setTimeState(e.target.value);
          }}
        >
          <option value="">Select a time</option>
          {availableTimes?.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          value={guests}
          required
          onChange={(e) => {
            const guestsValue = parseInt(e.target.value, 10);
            setGuests(guestsValue);
            setGuestsState(guestsValue);
          }}
          min="1"
          max="10"
          placeholder="1"
        />

        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          required
          onChange={(e) => {
            setOccasion(e.target.value);
            setOccasionState(e.target.value);
          }}
        >
          <option value="">Select an occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>

        <input
          type="submit"
          value="Make your reservation"
          disabled={!formValid}
        />
      </form>
    </>
  );
}

export default BookingForm;
