import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/photos/photos.module').then(m => m.PhotosPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./modules/favorites/favorites.module').then(m => m.FavoritesPageModule)
  },
  {
    path: 'photo',
    loadChildren: () => import('./modules/photo-detail/photo-detail.module').then(m => m.PhotoDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
