import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromPhotoReducer from './store/photo-store/photo.reducer'
import { PhotoEffects } from './store/photo-store/photo.effects';
import { reducers, metaReducer } from './store/reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers: metaReducer }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreModule.forFeature(fromPhotoReducer.PHOTO_FEATURE_KEY, fromPhotoReducer.reducer),
    EffectsModule.forFeature([PhotoEffects]),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
