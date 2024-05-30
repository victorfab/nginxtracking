export interface Stepper {
  idTrakingStatusCode: number;
  title: string;
  status: string;
  icon: string;
  deliveryDate: string;
  branchName?: string;
  description?: string;
  deliveryType?: string;
  reasonCode: number[];
}
