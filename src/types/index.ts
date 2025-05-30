export interface User {
  name: string;
  email: string;
  address: string;
  preferences: string;
  maritalStatus: string;
  spouseName?: string;
  dependents?: { name: string }[];
  profilePhoto?: string; // store as base64 or blob URL
  workersPreferences?: UserWorker[];
}

export interface UserWorker {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
