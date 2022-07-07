export const cities = [
    {
        id: "1",
        name: "Electric Vehicle Charging Station",
        address: "Srinagar, Banashankari, Bengaluru, ", 
        distance: "2102",
        distance_metrics: "metres",
        places: {
            latitude: 12.96353,
            longitude: 77.51503,
        },
        connector_types: [
            {
                id: 1,
                level: "Level 1 DC",
                speed: "2"
            },
            {
                id: 2,
                level: "Level 2 DC",
                speed: "1"
            },
            {
                id: 3,
                level: "Normal AC",
                speed: "1"
            },
        ]
    },
    {
        id: "2",
        name: "BESCOM Charging Station",
        address: "Papreddy Palya, Naagarabhaavi, Bengalure",
        distance: "2102",
        distance_metrics: "metres",
        places: {
            latitude: 12.97992,
            longitude: 77.54799,
        },
        connector_types: [
            {
                id: 1,
                level: "Level 1 DC",
                speed: "2"
            },
            {
                id: 2,
                level: "Level 2 DC",
                speed: "1"
            },
            {
                id: 3,
                level: "Normal AC",
                speed: "1"
            },
        ]


    },
    {
        id: "3",
        name: "Charzer Charging Station",
        address: "Bengaluru, Karnataka, India",
        distance: "2102",
        distance_metrics: "metres",
        places: {
            latitude: 12.924215,
            longitude: 77.537510,
        },
        connector_types: [
            {
                id: 1,
                level: "Level 1 DC",
                speed: "2"
            },
            {
                id: 2,
                level: "Level 2 DC",
                speed: "1"
            },
            {
                id: 3,
                level: "Normal AC",
                speed: "1"
            },
        ]
    },
    {
        id: "4",
        name: "Kazam Charging Station",
        address: "Nagdevanahalli, Bengaluru, Karnataka,Bhuvaneshwari Nagar",
        distance: "2102",
        distance_metrics: "metres",
        places: {
            latitude: 12.936090,
            longitude: 77.553287,
        },
        connector_types: [
            {
                id: 1,
                level: "Level 1 DC",
                speed: "2"
            },
            {
                id: 2,
                level: "Level 2 DC",
                speed: "1"
            },
            {
                id: 3,
                level: "Normal AC",
                speed: "1"
            },
        ]
    },
]




const dummyData = {
    cities,
};

export default dummyData;