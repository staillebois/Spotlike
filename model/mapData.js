const Images = [
    { image: require("../assets/images/nature/cascade_tufs.jpg") },
    { image: require("../assets/images/nature/gorges_du_verdon.jpg") },
    { image: require("../assets/images/nature/mont_saint_michel.jpg") },
    { image: require("../assets/images/nature/trouville.jpg") },
];

export const markers = [
    {
      coordinate: {
        latitude: 48.8071472,
        longitude: 2.3883148,
      },
      title: "Cascade des tufs, France",
      description: "Amazing place",
      image: Images[0].image,
      rating: 4,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: 48.8183153,
        longitude: 2.3883763,
      },
      title: "Gorges du Verdon, France",
      description: "This is the second best place",
      image: Images[1].image,
      rating: 5,
      reviews: 102,
    },
    {
      coordinate: {
        latitude: 48.8045148,
        longitude: 2.3884650,
      },
      title: "Le Mont Saint-Michel, France",
      description: "This is the third best place",
      image: Images[2].image,
      rating: 3,
      reviews: 220,
    },
    {
      coordinate: {
        latitude: 48.8173424,
        longitude: 2.3887009,
      },
      title: "Trouville, France",
      description: "This is the fourth best place",
      image: Images[3].image,
      rating: 4,
      reviews: 48,
    },
];

  export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];

