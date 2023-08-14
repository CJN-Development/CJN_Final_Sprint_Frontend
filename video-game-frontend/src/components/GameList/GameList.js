import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";

function GameList() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchGames() {
      try {
        const username = "admin";
        const password = "admin";
        const token = btoa(`${username}:${password}`);

        const headers = {
          Authorization: `Basic ${token}`,
        };

        const response = await axios.get("http://localhost:8080/game", {
          headers,
        });
        console.log(response);

        const gameDataWithDetails = await Promise.all(
          response.data._embedded.game.map(async (game) => {
            const gameResponse = await axios.get(game._links.self.href, {
              headers,
            });
            const publisherResponse = await axios.get(
              game._links.gamePublisher.href,
              { headers }
            );
            const genreResponse = await axios.get(
              game._links.listOfGenres.href,
              { headers }
            );
            const platformResponse = await axios.get(
              game._links.gamePlatform.href,
              { headers }
            );
            // console.log(game._links.listOfGenres.href)
            // console.log(platformResponse);

            // Fetch other related data here
            return {
              ...game,
              details: gameResponse.data,
              publisher: publisherResponse.data,
              genres: genreResponse.data._embedded,
              platforms: platformResponse.data._embedded,
            };
          })
        );
        setGames(gameDataWithDetails);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }

    fetchGames();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleDeleteGame = async (gameUrl) => {
    try {
      const username = "admin";
      const password = "admin";
      const token = btoa(`${username}:${password}`);
  
      const headers = {
        Authorization: `Basic ${token}`,
      };
  
      // Make an API call to delete the game from server
      await axios.delete(gameUrl, { headers });
  
      // Filter out the deleted game from the games list
      const updatedGames = games.filter((game) => game._links.self.href !== gameUrl);
      setGames(updatedGames);
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };
  
  const filteredGames = games.filter(
    (game) =>
      game.details.gameName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.details.releaseDate
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      game.publisher.publisherName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      game.genres.genre
        .map((genre) => genre.genreName)
        .join(", ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      game.platforms.platform
        .map((platform) => platform.platformName)
        .join(", ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  console.log(filteredGames);

  return (
    <div>
      <TextField
        label="Search Games"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
      />

      <List>
        {filteredGames.map((game) => (
          <ListItem key={game._links.self.href}>
            <ListItemAvatar>
              <Avatar
                alt={game.details.gameName}
                src={
                  "https://m.media-amazon.com/images/M/MV5BNDM1NDkwYWEtZjNkMC00Yzc5LTkzOTMtODcxNjQ2YTg4ZWM0XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"
                }
              />
            </ListItemAvatar>
            <ListItemText primary={game.details.gameName} />
            <ListItemText primary={game.details.releaseDate} />
            <ListItemText primary={game.publisher.publisherName} />
            <ListItemText
              primary={
                game.genres.genre
                  ? game.genres.genre.map((genre) => genre.genreName).join(", ")
                  : "N/A"
              }
            />
            <ListItemText
              primary={
                game.platforms.platform
                  ? game.platforms.platform
                      .map((platform) => platform.platformName)
                      .join(", ")
                  : "N/A"
              }
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteGame(game._links.self.href)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <ul>
        {filteredGames.map((game, index) => (
          <li key={index}>
            {/* <strong>Game Name:</strong> {game.details.gameName}<br /> */}
            {/* <strong>Release Date:</strong> {game.details.releaseDate}<br /> */}
            {/* <strong>Publisher Name:</strong> {game.publisher.publisherName ? game.publisher.publisherName : "N/A" }<br /> */}
            {/* <strong>Genre Names:</strong> {game.genres.genre ? game.genres.genre.map((genre) => genre.genreName).join(', ') : 'N/A'}<br /> */}
            {/* <strong>Availible Platforms:</strong> {game.platforms.platform ? game.platforms.platform.map((platform) => platform.platformName).join(', ') : 'N/A'}<br /> */}

            {/* Display other related data */}
            {/* <hr /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
