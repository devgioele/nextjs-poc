export type Position = {
  latitude: number;
  longitude: number;
};

export type ISSNowData = {
  timestamp: number;
  iss_position: Position;
  message: 'success' | string;
};
