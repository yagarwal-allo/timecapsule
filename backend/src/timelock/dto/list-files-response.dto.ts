export interface Web3StorageFile {
  _id: string;
  type: string;
  name: string;
  created: string;
  updated: string;
  cid: string;
  dagSize: number;
  pins: Pins[];
  deals: Deal[]
}

interface Deal {
  dealId: number;
  storageProvider: string;
  status: string;
  pieceCid: string;
  dataCid: string;
  dataModelSelector: string;
  activation: string;
  expiration: string;
  created: string;
  updated: string;
}

interface Pins {
  status: string;
  updated: string;
  peerId: string;
  peerName: string;
  region: string;
}