/**
 * MOCK_DATA
 * This serves as our local database for development.
 * The structure mimics the JSON response you would receive 
 * from a DynamoDB query via your Flask backend.
 */

export const MOCK_DATA = {
  flight: [
    { 
      id: 'F1', 
      name: 'Indigo 6E-203', 
      source: 'Hyderabad', 
      dest: 'Dubai', 
      price: 8500, 
      time: '10:00 AM - 01:30 PM', 
      duration: '3h 30m',
      class: 'Economy' 
    },
    { 
      id: 'F2', 
      name: 'Air India AI-102', 
      source: 'Delhi', 
      dest: 'Singapore', 
      price: 9500, 
      time: '11:45 PM - 07:00 AM', 
      duration: '5h 15m',
      class: 'Business' 
    },
    { 
      id: 'F3', 
      name: 'Vistara UK-99', 
      source: 'Mumbai', 
      dest: 'London', 
      price: 45000, 
      time: '02:00 AM - 09:30 AM', 
      duration: '12h 30m',
      class: 'First Class' 
    }
  ],
  bus: [
    { 
      id: 'B1', 
      name: 'Kallada Travels', 
      source: 'Hyderabad', 
      dest: 'Bangalore', 
      price: 1200, 
      time: '09:00 PM - 06:00 AM', 
      duration: '9h',
      type: 'Volvo AC Multi-Axle' 
    },
    { 
      id: 'B2', 
      name: 'Orange Tours', 
      source: 'Chennai', 
      dest: 'Hyderabad', 
      price: 950, 
      time: '08:30 PM - 07:00 AM', 
      duration: '10h 30m',
      type: 'Sleeper Non-AC' 
    },
    { 
      id: 'B3', 
      name: 'SRS Travels', 
      source: 'Bangalore', 
      dest: 'Goa', 
      price: 1500, 
      time: '07:00 PM - 08:00 AM', 
      duration: '13h',
      type: 'Scania AC Sleeper' 
    }
  ],
  train: [
    { 
      id: 'T1', 
      name: 'Rajdhani Express (12431)', 
      source: 'Hyderabad', 
      dest: 'Delhi', 
      price: 2500, 
      time: '06:00 AM - 05:30 AM', 
      duration: '23h 30m',
      coach: '3A' 
    },
    { 
      id: 'T2', 
      name: 'Shatabdi Express (12007)', 
      source: 'Chennai', 
      dest: 'Bangalore', 
      price: 1100, 
      time: '06:00 AM - 11:00 AM', 
      duration: '5h',
      coach: 'CC' 
    }
  ],
  hotel: [
    { 
      id: 'H1', 
      name: 'Taj Banjara', 
      source: 'Hyderabad', 
      dest: 'Hyderabad', 
      price: 5500, 
      rating: 4.8, 
      type: 'Luxury',
      amenities: ['Pool', 'WiFi', 'Spa'] 
    },
    { 
      id: 'H2', 
      name: 'ITC Grand Chola', 
      source: 'Chennai', 
      dest: 'Chennai', 
      price: 8500, 
      rating: 4.9, 
      type: 'Premium',
      amenities: ['Gym', 'Bar', 'Valet'] 
    },
    { 
      id: 'H3', 
      name: 'Holiday Inn Express', 
      source: 'Bangalore', 
      dest: 'Bangalore', 
      price: 2500, 
      rating: 4.2, 
      type: 'Budget',
      amenities: ['Breakfast', 'WiFi'] 
    }
  ]
};
