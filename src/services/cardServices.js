import axios from "axios";

const basePath = "https://deckofcardsapi.com/api/deck/";
const headers = { "Content-Type": "application/json" };

const getShuffleCards = () => {
  // one deck
  let url = basePath + "new/shuffle/?deck_count=1";
  const config = {
    headers,
    method: "GET",
    crossdomain: true
  };
  return axios(url, config);
};

const getDrawCards = id => {
  // one deck
  let url = basePath + id + "/draw/?count=52";
  const config = {
    headers,
    method: "GET",
    crossdomain: true
  };
  return axios(url, config);
};

export { getDrawCards, getShuffleCards };
