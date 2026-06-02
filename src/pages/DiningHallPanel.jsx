import { useState, useEffect, Fragment } from "react"
import { Pages, Panels } from "../constants/pages";
import { getAllUserProfiles } from "../utils/api/userApi";

import styles from "./DiningHallPanel.module.css";


function DiningHallPanel({setPanel}){
  const [expanded, setExpanded] = useState(Array(11).fill(false))
  return(
    <>
    <h1>UCLA Dining Halls:</h1>
    <div className={styles.restaurantPanel}>

    <div className={styles.restaurantCard} // Bruin Plate
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[0] = !next[0];
                                        return next;
                                        })}
      role="button"
    >
      <h2>Bruin Plate</h2>
      {expanded[0] && (
        <div><p>Looking for one of the healthiest college restaurants in the nation? You’ve found it! Bruin Plate is a creative, honest and responsible eatery that provides seasonal, innovative and sustainable cuisine with mouth-watering results.</p>
        <p>Popular items include roasted Brussel sprouts, arugula topped flatbread, roasted cauliflower soup, yam tacos, bison burger stackers, lemon cod and chipotle chicken bowls, to name a few. Even the desserts are healthy! Bruin Plate’s large floor-to-ceiling windows offer gorgeous views of campus and lots of natural light. Located in the heart of large volumes of student traffic between the UCLA campus and the residential community, Bruin Plate makes the healthy choice an easy choice.</p>
        <p>Bruin Plate inspires mindful-eating through healthy, nutritious and locally procured ingredients. It’s exciting, fresh, wholesome and nutritionally balanced dishes for a diverse community.</p>
        </div>
      )}
    </div>

    <div className={styles.restaurantCard} // Epicuria
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[1] = !next[1];
                                        return next;
                                        })}
      role="button"
    >
      <h2>Epicuria at Covel</h2>
      {expanded[1] && (
        <div><p>Looking for one of the healthiest college restaurants in the nation? You’ve found it! Bruin Plate is a creative, honest and responsible eatery that provides seasonal, innovative and sustainable cuisine with mouth-watering results.</p>
        <p>Popular items include roasted Brussel sprouts, arugula topped flatbread, roasted cauliflower soup, yam tacos, bison burger stackers, lemon cod and chipotle chicken bowls, to name a few. Even the desserts are healthy! Bruin Plate’s large floor-to-ceiling windows offer gorgeous views of campus and lots of natural light. Located in the heart of large volumes of student traffic between the UCLA campus and the residential community, Bruin Plate makes the healthy choice an easy choice.</p>
        <p>Bruin Plate inspires mindful-eating through healthy, nutritious and locally procured ingredients. It’s exciting, fresh, wholesome and nutritionally balanced dishes for a diverse community.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // De Neve
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[2] = !next[2];
                                        return next;
                                        })}
      role="button"
    >
      <h2>De Neve</h2>
      {expanded[2] && (
        <div><p>De Neve celebrates the amazing diversity of foods inspired by North, Central, and South America.  De Neve celebrates the vibrant diversity of foods inspired by North, Central, and South America. Enjoy bold, crave-worthy menu selections like Detroit-style pizza, chimichurri tri-tip, Kansas City BBQ pork ribs, Quesabirria beef tacos, hearty pork pozole, and loaded carne asada fries; just to name a few.</p>
        <p>In addition, it has an amazing salad bar and an incredible “flexitarian-bar” packed with deliciously composed salads, roasted vegetables, warm side dishes, braised meats and more. With its ample seating and central location, De Neve is a great place to meet up with friends for a great meal and great conversation.</p>
        <p>De Neve is located in the lower level of De Neve Commons.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // Feast
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[3] = !next[3];
                                        return next;
                                        })}
      role="button"
    >
      <h2>Feast at Rieber</h2>
      {expanded[3] && (
        <div><p>Enjoy Pan-Asian fusion with flavors spanning China, Hawaii, India, Japan, Korea, the Philippines, Thailand and Vietnam.</p>
        <p>FEAST is one of the few university dining halls in the nation dedicated entirely to Pan-Asian cuisine. From teriyaki chicken and Vietnamese lemongrass pork banh mi to tuna sashimi, Indian chicken vindaloo curry, Chinese black pepper steak bao, and Korean BBQ short ribs.</p>
        <p>FEAST offers the perfect opportunity to enjoy your favorite flavors and explore new ones.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // Epicuria
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[4] = !next[4];
                                        return next;
                                        })}
      role="button"
    >
      <h2>The Study at Hedrick</h2>
      {expanded[4] && (
        <div><p>Commonly known as The Study, this European-style artisanal bakery café merges amazing Northern European influenced food with an equally amazing study space. The Study serves kombucha on tap, as well as offering delicious pressed juices and an amazing array of desserts.</p>
        <p>The Study is also a great spot for parfaits, fruit cups, vegetable trays protein plates, as well as incredible craft-your-own sandwiches and pizzas. In addition to being a cool place to eat, The Study offers private study carrels, quiet reading rooms, and discussion rooms wired with state-of-the-art technology and writable wall surfaces. With ample natural lighting and comfy lounge seating throughout, free high-speed Wi-Fi, plenty of charging outlets and a cozy fireplace, The Study’s unique design make it incredibly popular.</p>
        <p>The Study at Hedrick is located in Hedrick Hall.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // Epicuria
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[5] = !next[5];
                                        return next;
                                        })}
      role="button"
    >
      <h2>Rendevous</h2>
      {expanded[5] && (
        <div><p>Rendezvous East features foods from across Asia fused with American inspiration, such as ramen, sushi bowls and curry, boba and milk tea, while Rendezvous West focuses on Latin foods like custom-made tacos, burritos, enchiladas and nachos, with a creative flair and influence from regions throughout North, Central and South America.</p>
        <p>There is a small seating area indoors, as well as a great little outdoor patio for an al fresco experience in the California sun. This area of campus also boasts large tree-shaded spaces and benches for eating, meeting and just hanging out.</p>
        <p>Rendezvous is located at Rieber Terrace.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // Epicuria
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[6] = !next[6];
                                        return next;
                                        })}
      role="button"
    >
      <h2>Bruin Cafe</h2>
      {expanded[6] && (
        <div><p>Bruin Café offers a versatile menu of fresh, quick, and convenient food and beverage options. For a quick grab-and-go option or a cool place to sit and relax over great food, Bruin Café is perfect. It has an indoor dining space and outdoor patio — both are great spots to eat and study.</p>
        <p>Its daily menu includes wholesome made-to-order sandwiches, healthy salads and wraps, and in-house prepared soups. In addition, it offers café-quality specialty coffees, teas and smoothies. Its weekly array of rotating dinner specials showcase various flavors and global cuisines throughout the academic year.</p>
        <p>Bruin Café is located at Sproul Hall.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // Epicuria
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[7] = !next[7];
                                        return next;
                                        })}
      role="button"
    >
      <h2>Cafe 1919</h2>
      {expanded[7] && (
        <div><p>Located in Delta Terrace, Café 1919 offers a menu inspired by various regions of Italy, featuring hot panini sandwiches, individual gourmet pizzas, fresh salads, and artisanal gelato.</p>
        <p>Payment is accepted via Meal Plan, BruinCard EasyPay, Visitor BruinCard EasyPay, or credit card. A photo ID is required for credit card transactions, and the name must be printed on the card. Cash is not accepted.</p>
        <p>Bruin Plate inspires mindful-eating through healthy, nutritious and locally procured ingredients. It’s exciting, fresh, wholesome and nutritionally balanced dishes for a diverse community.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // Epicuria
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[8] = !next[8];
                                        return next;
                                        })}
      role="button"
    >
      <h2>The Drey</h2>
      {expanded[8] && (
        <div><p>The Drey is a globally-inspired restaurant that serves fresh, natural, and healthy lunch and dinner options that are made with the best ingredients. The Drey offers diverse grab-and-go foods, ready-to-eat entrées, snacks, salads and other classics available.</p>
        <p>To fuel students’ academic efforts and keep guests hydrated, The Drey also serves a wide selection of hot and cold beverages, including popular coffee drinks, teas and agua frescas, which are delicious fresh water-based fruit drinks that originate from Central and Latin America.</p>
        <p>The Drey is conveniently located in Olympic Hall.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // Bruin Bowl
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[9] = !next[9];
                                        return next;
                                        })}
      role="button"
    >
      <h2>Bruin Bowl</h2>
      {expanded[9] && (
        <div><p>At Bruin Bowl, the culinary team crafts distinctive, flavorful bowls using fresh, healthy ingredients. The menu rotates weekly, featuring a variety of cuisines from Mediterranean and farm-to-fork to Indian and other global flavors, making it feel like a new menu each week.</p>
        <p>Each bowl begins with a base; such as whole grains, greens, or flat rice noodles; layered with hearty toppings like roasted seasonal vegetables, grilled chicken, or paneer butter masala. Fresh garnishes and house-made sauces complete the dish. Customize your bowl just the way you like it, and enjoy your meal amid the restaurant’s steampunk-inspired décor.</p>
        </div>
      )}
    </div>
    <div className={styles.restaurantCard} // Bruin Bowl
      onClick={() => setExpanded(prev =>{
                                        const next = [...prev];
                                        next[10] = !next[10];
                                        return next;
                                        })}
      role="button"
    >
      <h2>Food Trucks & Restaurants</h2>
      {expanded[10] && (
        <div><p>Students living on-campus in the residence halls with a meal plan, are able to use their meal plan directly at Food Trucks located on the Hill. Temporary meal passes are not accepted, one must have their Bruin Card to swipe a meal at our Food Truck locations.</p>
        <a href="https://dining.ucla.edu/meal-swipe-exchange/">Click here for a detailed list of food truck schedules.</a>
        </div>
      )}
    </div>

    </div>
    </>
  )
}

export default DiningHallPanel;

// function LocationsPanel({setPanel}) {
//   const [listOfLocs, setListOfLocs] = useState([])
//   const [selectedLocations, setSelectedLocations] = useState("")
//   const [selectedTimeFrame, setSelectedTimeFrame] = useState("")

//   const locations = [
//     {label: "1", value: "bplate"},
//     {label: "2", value: "feast"},
//     {label: "3", value: "de neve"},
//     {label: "4", value: "bcafe"},
//     {label: "5", value: "cafe 1919"},
//     {label: "6", value: "epicuria"},
//     {label: "7", value: "rendezvous"},
//     {label: "8", value: "the study"}
//   ];

//   const hours = [
//     { label: "breakfast", value: "breakfast" },
//     { label: "lunch", value: "lunch" },
//     { label: "dinner", value: "dinner" },
//     { label: "late night", value: "late-night" }
//   ];

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   if (!selectedLocations) {
  //     alert("yo you gotta select a location my guy");
  //     return;
  //   }
  //   if (!selectedTimeFrame) {
  //     alert("Please choose a time.");
  //     return;
  //   }
  //   setListOfLocs([selectedLocations])
  //   if (setPanel) {
  //     setPanel(Panels.DINING);
  //   }
  // }

//   return (
//     <><h1>hi</h1>
//     <form id="dropdownform" onSubmit={onSubmit}>
//       <label>
//         <select
//           value={selectedLocations}
//           onChange={(e) => setSelectedLocations(e.target.value)}
//         >
//           <option value="" disabled>
//             Choose the dining locations!
//           </option>
//           <option value="1">bplate</option>
//           <option value="2">feast</option>
//           <option value="3">de neve</option>
//           <option value="4">bcafe</option>
//           <option value="5">cafe 1919</option>
//           <option value="6">epicuria</option>
//           <option value="7">rendevous</option>
//           <option value="8">the study</option>
//         </select>
//       </label>
//       <label>
//         <select value={selectedTimeFrame} onChange={(e) => setSelectedTimeFrame(e.target.value)}>
//           <option value="" disabled>
//             Choose the hours!
//           </option>
//           <option value="breakfast">breakfast</option>
//           <option value="lunch">lunch</option>
//           <option value="dinner">dinner</option>
//           <option value="late-night">late night</option>
//         </select>
//       </label>
//       <button type="submit">press this to update boss</button>
//     </form>
//     </>
//   )
// }

// export default LocationsPanel;