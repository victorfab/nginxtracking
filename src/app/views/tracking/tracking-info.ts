export interface TrackingInfo {
  fullName: string;
  env: boolean;
  cardNumLastDig: string;
  cardOrderInfo: CardOrderInfo[];
  fiData: FiData;
  trackingType: string;
}

export interface CardOrderInfo {
  cardOrderStatus: CardOrderStatus;
}

export interface CardOrderStatus {
  effDt: string;
  trakingStatusCode: number;
}

export interface FiData {
  branchIdent: string;
  branchName: string;
}
