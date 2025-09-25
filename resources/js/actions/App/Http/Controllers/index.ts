import ImageController from './ImageController'
import Settings from './Settings'
import HeroSlideController from './HeroSlideController'
import FeaturedPropertyController from './FeaturedPropertyController'
import Auth from './Auth'


const Controllers = {
    ImageController: Object.assign(ImageController, ImageController),
    Settings: Object.assign(Settings, Settings),
    HeroSlideController: Object.assign(HeroSlideController, HeroSlideController),
    FeaturedPropertyController: Object.assign(FeaturedPropertyController, FeaturedPropertyController),
    Auth: Object.assign(Auth, Auth),
}

export default Controllers