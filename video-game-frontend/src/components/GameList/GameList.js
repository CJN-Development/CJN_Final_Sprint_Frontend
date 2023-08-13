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
  const handleDeleteGame = (gameIndex) => {
    const updatedGames = [...games];
    updatedGames.splice(gameIndex, 1);
    setGames(updatedGames);
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
        sx={{display:'flex',flexDirection:'column',textAlign:'center',marginTop:4,marginLeft:2,marginRight:2}}
      />

      <List sx={{width: '100%', maxWidth:'100%', padding:4, }}>
        {filteredGames.map((game, index) => (
          <ListItem sx={{
            display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        gap: 2,
        borderBottom: '1px solid #ccc',
      
          }}>
            <ListItemAvatar>
              <Avatar
                alt={game.details.gameName}
                src={
                  "https://m.media-amazon.com/images/M/MV5BNDM1NDkwYWEtZjNkMC00Yzc5LTkzOTMtODcxNjQ2YTg4ZWM0XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"
                }
                sx={{width:100,height:100}}
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
              onClick={() => handleDeleteGame(index)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    
    </div>
  );
}

export default GameList;


