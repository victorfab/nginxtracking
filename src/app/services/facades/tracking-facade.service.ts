import { Injectable } from '@angular/core';
import { TrackingService } from '../apis/tracking.service';
import { TrackingDeliveryResponse } from '../../shared/interfaces/tracking-delivery-response.interface';
import { DeliveryType } from '../../shared/enums/delivery-type.enum';
import { CardDeliveryStatus } from 'src/app/shared/interfaces/card-delivery-status.interface';
import { map, retry } from 'rxjs';
import {
  BRANCH_DELIVERY,
  HOME_DELIVERY,
  RESCUE_DELIVERY,
  STATUS_CATALOG
} from 'src/app/shared/constants/status-catalog.contants';
import { Stepper } from 'src/app/shared/interfaces/stepper.interface';

@Injectable({
  providedIn: 'root'
})
export class TrackingFacadeService {
  constructor(private trackingService: TrackingService) {}

  getTrackingResponse() {
    return this.trackingService
      .getTrackingInfo()
      .pipe(retry(3),map(resp => this.getDeliveryType(resp)));
  }

  isBranchDelivery(response: TrackingDeliveryResponse): boolean {
    if (response.fiData) {
      return (
        ![undefined, null, ''].includes(response.fiData.branchIdent) &&
        ![undefined, null, ''].includes(response.fiData.branchName)
      );
    } else {
      return false;
    }
  }
  
  isRescueDelivery(response: TrackingDeliveryResponse): boolean {
    return response.cardOrderStatus.some(
      status => Number(status.trakingStatusCode) === 0
    );
  }
  getDeliveryType(response: TrackingDeliveryResponse) {
    let validSteps: { trakingStatusCode: number; reasonCode: number[] }[];
    let deliveryType: DeliveryType;
    if (!this.isBranchDelivery(response)) {
      validSteps = [...HOME_DELIVERY];
      deliveryType = DeliveryType.HOME_DELIVERY;
    } else if (this.isBranchDelivery(response)) {
      validSteps =
        response.cardOrderStatus.length === 0 ||
        !this.isRescueDelivery(response)
          ? [...BRANCH_DELIVERY]
          : [...RESCUE_DELIVERY];
      deliveryType =
        response.cardOrderStatus.length === 0 ||
        !this.isRescueDelivery(response)
          ? DeliveryType.BRANCH_DELIVERY
          : DeliveryType.RESCUE_DELIVERY;
    } else {
      validSteps = [];
      deliveryType = DeliveryType.UNKNOWN;
    }

    return this.proccessSteps(validSteps, response, deliveryType);
  }

  proccessSteps(
    validSteps: { trakingStatusCode: number; reasonCode: number[] }[],
    response: TrackingDeliveryResponse,
    deliveryType: DeliveryType
  ): Stepper[] {
    let cardDeliveryStatus: CardDeliveryStatus[] = response.cardOrderStatus;
    if (this.hasDeliveryAttemps(cardDeliveryStatus)) {
      validSteps.push({ trakingStatusCode: 16, reasonCode: [10, 11, 12, 13] });
    }
    if (this.hasCancelStatus(cardDeliveryStatus)) {
      validSteps.push({ trakingStatusCode: 22, reasonCode: [0, 1] });
      validSteps = validSteps.filter(c => Number(c.trakingStatusCode) !== 8);
    }
    let steps: Stepper[] = [];
    cardDeliveryStatus.forEach((c: CardDeliveryStatus) => {
      let step = validSteps.find(
        code =>
          Number(code.trakingStatusCode) === Number(c.trakingStatusCode) &&
          code.reasonCode.includes(Number(c.reasonCode))
      );
      if (step) {
        let s = STATUS_CATALOG.find(
          x => Number(x.idTrakingStatusCode) === Number(step?.trakingStatusCode)
        );
        if (s) {
          if (
            [9, 8, 10].includes(Number(s.idTrakingStatusCode)) &&
            deliveryType !== DeliveryType.HOME_DELIVERY
          ) {
            s.branchName = response.fiData?.branchName;
          }
          if (
            Number(s.idTrakingStatusCode) === 8 &&
            deliveryType !== DeliveryType.HOME_DELIVERY
          ) {
            s.title = 'Recogiste tu tarjeta en la sucursal';
          }
          if(
            Number(s.idTrakingStatusCode) === 22 &&
            deliveryType === DeliveryType.HOME_DELIVERY
          ) {
            s.title = 'No fué posible entregar tu tarjeta';
          }
          if (
            Number(s.idTrakingStatusCode) === 22 &&
            deliveryType !== DeliveryType.HOME_DELIVERY
          ) {
            s.branchName = response.fiData?.branchName;
          }
          s.status =
            s.idTrakingStatusCode === 22 ||
            (s.idTrakingStatusCode === 16 &&
              [10, 11, 12, 13].includes(c.reasonCode))
              ? 'CANCEL'
              : 'SUCCESS';
          s.icon =
            s.idTrakingStatusCode === 22 ||
            (s.idTrakingStatusCode === 16 &&
              [10, 11, 12, 13].includes(c.reasonCode))
              ? 'close-1px'
              : 'checkmark';
          s.deliveryDate = c.effDt;
          s.deliveryType = deliveryType;
          steps.push(s);
        }
      }
    });
    if (cardDeliveryStatus.length === 0) {
      STATUS_CATALOG.forEach(sc => {
        if (
          validSteps
            .map(c => Number(c.trakingStatusCode))
            .includes(Number(sc.idTrakingStatusCode))
        ) {
          sc.status = 'PENDING';
          sc.branchName = [9, 8, 10].includes(Number(sc.idTrakingStatusCode))
            ? response.fiData?.branchName
            : undefined;
          if (Number(sc.idTrakingStatusCode) === 8) {
            sc.title = 'Entregamos tu tarjeta';
          }
          if (Number(sc.idTrakingStatusCode) === 6) {
            sc.title = 'Enviamos tu tarjeta';
          }
          steps.push(sc);
        }
      });
      steps[0].status = 'IN_PROGRESS';
    } else {
      this.compareArrays(
        validSteps.map(c => Number(c.trakingStatusCode)),
        steps.map(s => Number(s.idTrakingStatusCode)),
        deliveryType
      ).forEach(c => {
        let s = STATUS_CATALOG.find(
          code => c === Number(code.idTrakingStatusCode)
        );
        if (s) {
          if (
            [9, 8, 10].includes(Number(s.idTrakingStatusCode)) &&
            deliveryType !== DeliveryType.HOME_DELIVERY
          ) {
            s.branchName = response.fiData?.branchName;
          }
          if (
            Number(s.idTrakingStatusCode) === 8 &&
            deliveryType !== DeliveryType.HOME_DELIVERY
          ) {
            s.title = 'Recogiste tu tarjeta en la sucursal';
          }
          s.status = 'PENDING';
          steps.push(s);
        }
      });
      steps = this.updateStatusSteps(steps);
    }
    return steps;
  }

  compareArrays(a: number[], b: number[], deliveryType: DeliveryType) {
    if (deliveryType === DeliveryType.HOME_DELIVERY && b.includes(16)) {
      a = a.filter(s => s !== 8);
    }
    const uniqueValues = [...new Set([...a, ...b])];
    return uniqueValues.filter(
      value => !a.includes(value) || !b.includes(value)
    );
  }

  hasDeliveryAttemps(cardStatus: CardDeliveryStatus[]): boolean {
    return !!cardStatus.find(
      c =>
        Number(c.trakingStatusCode) === 16 &&
        [10, 11, 12, 13].includes(c.reasonCode)
    );
  }

  hasCancelStatus(cardStatus: CardDeliveryStatus[]): boolean {
    return !!cardStatus.find(c => Number(c.trakingStatusCode) === 22);
  }

  updateStatusSteps(stepsValidate: Stepper[]): Stepper[] {
    stepsValidate.forEach((step: Stepper, index) => {
      if (
        stepsValidate[index - 1] &&
        stepsValidate[index - 1].status === 'SUCCESS' &&
        step.status === 'PENDING'
      ) {
        step.status = 'IN_PROGRESS';
      }
    });
    return stepsValidate;
  }
}
