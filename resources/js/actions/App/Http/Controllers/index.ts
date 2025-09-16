import ImageController from './ImageController'
import HeroSlideController from './HeroSlideController'
import FeaturedPropertyController from './FeaturedPropertyController'
import Settings from './Settings'
import Auth from './Auth'
const Controllers = {
    ImageController: Object.assign(ImageController, ImageController),
HeroSlideController: Object.assign(HeroSlideController, HeroSlideController),
FeaturedPropertyController: Object.assign(FeaturedPropertyController, FeaturedPropertyController),
Settings: Object.assign(Settings, Settings),
Auth: Object.assign(Auth, Auth),
}

export default Controllers