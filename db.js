import React from "react";

const location = {
  coords: {
    accuracy: 600,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: 37.4220936,
    longitude: -122.083922,
    speed: 0,
  },
  mocked: false,
  timestamp: 1673563251459,
};

const posts = [
  {
    title: "Forest",
    photo: require("./assets/images/post-forest.jpg"),
    comments: 8,
    likes: 153,
    locationTitle: "Ukraine",
    location,
  },
  {
    title: "Sunset on Black Sea",
    photo: require("./assets/images/post-sunset.jpg"),
    comments: 3,
    likes: 200,
    locationTitle: "Ukraine",
    location,
  },
  {
    title: "Old house in Venice",
    photo: require("./assets/images/post-house.jpg"),
    comments: 50,
    likes: 200,
    locationTitle: "Italy",
    location,
  },
];

export default posts;
