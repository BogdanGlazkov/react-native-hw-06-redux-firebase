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
    photo:
      "http://192.168.0.101:19000/node_modules%5Cexpo%5CAppEntry.bundle?platform=android&dev=true&hot=false:84153:56",
    comments: 8,
    likes: 153,
    locationTitle: "Ukraine",
    location,
  },
  {
    title: "Sunset on Black Sea",
    photo:
      "http://192.168.0.101:19000/node_modules%5Cexpo%5CAppEntry.bundle?platform=android&dev=true&hot=false:84153:56",
    comments: 3,
    likes: 200,
    locationTitle: "Ukraine",
    location,
  },
  {
    title: "Old house in Venice",
    photo:
      "http://192.168.0.101:19000/node_modules%5Cexpo%5CAppEntry.bundle?platform=android&dev=true&hot=false:84153:56",
    comments: 50,
    likes: 200,
    locationTitle: "Italy",
    location,
  },
];

export default posts;
