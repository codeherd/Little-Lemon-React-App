import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';
import BookingForm from './BookingForm';
import ConfirmedBooking from './ConfirmedBooking';
import image1 from './image1.jpg';
import greekSaladImg from './greek-salad.jpg';
import bruschettaImg from './bruschetta.svg';
import lemonDessertImg from './lemon-dessert.jpg';
import brothersImg from './Mario and Adrian b.jpg';
import restaurantImg from './restaurant.jpg';
import deliveryIconImg from './delivery-icon.png';

const seededRandom = function (seed) {
  var m = 2**35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
      return (s = s * a % m) / m;
  };
}

const fetchAPI = function(date) {
  let result = [];
  let random = seededRandom(date.getDate());

  for(let i = 17; i <= 23; i++) {
      if(random() < 0.5) {
          result.push(i + ':00');
      }
      if(random() < 0.5) {
          result.push(i + ':30');
      }
  }
  return result;
};

const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(new Date(action.date));
    default:
      return state;
  }
};

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('');
  const navigate = useNavigate();

  const submitForm = (formData) => {
    const submitAPI = function (formData) {
      return true;
    };

    const success = submitAPI(formData);
    if (success) {
      navigate('/confirmed-booking');
    } else {
      console.log('Failed to submit the reservation.');
    }
  };

  useEffect(() => {
    if (date) {
      dispatch({ type: 'UPDATE_TIMES', date });
    }
  }, [date]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={
          <BookingPage
            availableTimes={availableTimes}
            dispatch={dispatch}
            date={date} setDate={setDate}
            time={time} setTime={setTime}
            guests={guests} setGuests={setGuests}
            occasion={occasion} setOccasion={setOccasion}
            submitForm={submitForm}
          />
        } />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
      </Routes>
    </>
  );
}

export default Main;

export { initializeTimes, updateTimes, fetchAPI};

function BookingPage({ availableTimes, setDate, setTime, setGuests, setOccasion, submitForm }) {
  return (
    <div>
      <BookingForm
        availableTimes={availableTimes}
        setDate={setDate}
        setTime={setTime}
        setGuests={setGuests}
        setOccasion={setOccasion}
        submitForm={submitForm}
      />
    </div>
  );
}

function Homepage() {
  return (
    <div>
      {/* <h1>Welcome to the Little Lemon website</h1> */}
      <CallToAction />
      <Specials />
      <CustomersSay />
      <Chicago />
    </div>
  );
}

function About() {
  return (
    <h1>About Me section coming soon...</h1>
  )
}

function Menu() {
  return (
    <h1>Menu section coming soon...</h1>
  )
}

function Order() {
  return (
    <h1>Order section coming soon...</h1>
  )
}

function Login() {
  return (
    <h1>Login section coming soon...</h1>
  )
}

function CallToAction() {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/reservations');
  };
  return (
    <main className="main">
      <section className="headings">
        <h1 id="main-heading">Little Lemon</h1>
        <h2 id="sub-heading">Chicago</h2>
        <p id="paragraph1">We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <button className="reservation-button" aria-label="Reserve a Table" onClick={handleReserveClick}>Reserve a Table</button>
      </section>

      <section className="image-section">
        <img src={image1} height={450} width={350} alt="serving-food" />
      </section>
    </main>
  )
}

function Specials() {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/menu');
  };
  return (
    <section>
    <section className="specials-section">
          <h1>Specials</h1>
          <button className="online-menu-button" aria-label="Online Menu" onClick={handleReserveClick} >Online Menu</button>
      </section>

      <section className="cards-section">
      <div className="card">
        <img src={greekSaladImg} alt="Greek Salad" className="card-image" width="250" />
        <div className="card-content">
        <div className="card-header">
          <h2>Greek Salad</h2>
          <p className="price">$12.99</p>
        </div>
          <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
        <div className="order-header">
          <p className="order1">Order a delivery</p>
          <img src={deliveryIconImg} height={30} width={30} alt="delivery icon" />
        </div>
        </div>
      </div>

      <div className="card">
        <img src={bruschettaImg} alt="Bruschetta" className="card-image" width="250" />
        <div className="card-content">
        <div className="card-header">
          <h2>Bruschetta</h2>
          <p className="price">$5.99</p>
          </div>
          <p>Our Bruschetta is made from homemade grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
        <div className="order-header">
          <p className="order1">Order a delivery</p>
          <img src={deliveryIconImg} height={30} width={30} alt="delivery icon" />
        </div>
        </div>
      </div>

      <div className="card">
        <img src={lemonDessertImg} alt="Lemon Dessert" className="card-image" width="210" />
        <div className="card-content">
        <div className="card-header">
          <h2>Lemon Dessert</h2>
          <p className="price">$5.00</p>
          </div>
          <p>This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
          <div className="order-header">
          <p className="order1">Order a delivery</p>
          <img src={deliveryIconImg} height={30} width={30} alt="delivery icon" />
        </div>
        </div>
      </div>
    </section>
    </section>
  )
}

function CustomersSay() {
  return (
  <section className="headings3">
        <h1 id="main-heading3">Testimonials</h1>

    <section className="testimonials-section">
    <section className="card2">
        <section class="star-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </section>
        <section class="imageAndName">
        <img src="https://ui-avatars.com/api/?name=Ryan+M&size=128" width="70" alt="User Placeholder" />
        <h2 id="sub-heading3">Ryan M.</h2>
        </section>
        <p id="paragraph3">The Bruschetta was great!</p>
        </section>

        <section className="card2">
        <section class="star-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </section>
        <section class="imageAndName">
        <img src="https://ui-avatars.com/api/?name=Alan+Garcia&size=128" width="70" alt="User Placeholder" />
        <h2 id="sub-heading3">Alan Garcia</h2>
        </section>
        <p id="paragraph3">You have to try their Lemon Dessert!</p>
        </section>

        <section className="card2">
        <section class="star-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </section>
        <section class="imageAndName">
        <img src="https://ui-avatars.com/api/?name=Alexandra+Holmes&size=128" width="70" alt="User Placeholder" />
        <h2 id="sub-heading3">Alexandra Holmes</h2>
        </section>
        <p id="paragraph3">Awesome place and atmosphere with delicious food.</p>
        </section>

        <section className="card2">
        <section class="star-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </section>
        <section class="imageAndName">
        <img src="https://ui-avatars.com/api/?name=Elizabeth+Hastings&size=128" width="70" alt="User Placeholder" />
        <h2 id="sub-heading3">Elizabeth Hastings</h2>
        </section>
        <p id="paragraph3">Really enjoyed the menu selection and venue atmosphere.</p>
        </section>
    </section>
    </section>
  )
}

function Chicago() {
  return (
    <section className="container1">
    <section className="headings2">
        <h1 id="main-heading2">Little Lemon</h1>
        <h2 id="sub-heading2">Chicago</h2>
        <p id="paragraph2">Little Lemon is a restaurant in Chicago. It is owned by two Italian brothers, Mario and Adrian. Having relocated to the U.S., Mario brings his Italian culinary expertise and cherished family recipes to create the menu. Adrian manages the restaurant's marketing and the expansion of their offerings to include a variety of Mediterranean dishes, enhancing their traditional Italian cuisine.</p>
    </section>

    <section className="image-section3">
        <img src={brothersImg} height={350} width={500} alt="two Italian brothers" className="image-bottom" />
        <img src={restaurantImg} height={350} width={500} alt="restaurant outdoor" className="image-top" />
    </section>
    </section>
  )
}

