export const defaultUser = {
  id: 1,
  name: 'John Smith',
  email: 'user@example.com',
  phone: '9876543210',
  role: 'tenant',
  avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
  bio: 'Working professional looking for a comfortable PG accommodation.',
  location: 'Bangalore',
  preferences: {
    budget: { min: 5000, max: 15000 },
    occupancy: 'single',
    foodPreference: 'veg',
    preferredLocations: ['Koramangala', 'HSR Layout', 'Indiranagar']
  },
  bookings: [],
  savedProperties: [1, 3, 5],
  notifications: [
    {
      id: 1,
      type: 'booking',
      message: 'Your booking request for Serene PG has been confirmed.',
      createdAt: '2023-12-15T09:30:00.000Z',
      read: true
    },
    {
      id: 2,
      type: 'price',
      message: 'Price dropped for a property in your wishlist.',
      createdAt: '2023-12-20T14:22:00.000Z',
      read: false
    }
  ],
  createdAt: '2023-11-10T08:15:00.000Z'
};

export const defaultLandlord = {
  id: 2,
  name: 'Rahul Sharma',
  email: 'landlord@example.com',
  phone: '8765432109',
  role: 'landlord',
  avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=random',
  bio: 'Owner of multiple PG accommodations in Bangalore.',
  location: 'Bangalore',
  properties: [1, 2, 3],
  accountDetails: {
    bankName: 'HDFC Bank',
    accountNumber: 'XXXXX7890',
    ifscCode: 'HDFC0001234'
  },
  notifications: [
    {
      id: 1,
      type: 'booking',
      message: 'New booking request for your PG in Koramangala.',
      createdAt: '2023-12-22T11:45:00.000Z',
      read: false
    }
  ],
  createdAt: '2023-10-05T10:30:00.000Z'
};