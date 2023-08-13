import React from "react";
import "./Home.css";

function Home() {
  const ListStyle = {
    listStyleType: "circle",
    marginLeft: "20px",
  };
  return (
    <div>
      <div className="TopHomePage">
        <h2>Welcome to CJND Digital Dynasty!</h2>
        <p>
          CJND was created for you to be able to search some of your favourite
          games and find new games that you want to know some more information
          on.
        </p>
        <p>Each game card in the search engine consists of 6 things:</p>
      </div>
      <div className="List">
        <ul style={ListStyle}>
          <li>Game Cover Art</li>
          <li>Game Name</li>
          <li>Release Date</li>
          <li>Publisher Name</li>
          <li>Genre</li>
          <li>Platform</li>
        </ul>
      </div>
      <div className="Instructions">
        <h2>Don't know how to search for games?</h2>
        <p>
          We at CJND made the search engine as user friendly as possible, just
          click the search bar and input any game name, publisher, platform,
          genre, or release date, and enjoy the results!
        </p>
        <p>
          CJND was created by Cameron D'Amico, Jordan Kelloway, Nathan Greene,
          and Devin Augot. Thanks for visiting our website!
        </p>
      </div>
    </div>
  );
}

export default Home;
