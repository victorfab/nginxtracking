import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackingModule } from './tracking/tracking.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tracking/tracking.module').then(m => m.TrackingModule)
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error-tracking/error-tracking.module').then(
        m => m.ErrorTrackingModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TrackingModule],
  exports: [RouterModule]
})
export class ViewsRoutingModule {}
