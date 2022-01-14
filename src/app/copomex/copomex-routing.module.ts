import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopomexPage } from './copomex.page';

const routes: Routes = [
  {
    path: '',
    component: CopomexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopomexPageRoutingModule {}
