import ImageController from './ImageController'
import VideoController from './VideoController'
import Settings from './Settings'
import HeroSlideController from './HeroSlideController'
import FeaturedPropertyController from './FeaturedPropertyController'
import Auth from './Auth'
const Controllers = {
    ImageController: Object.assign(ImageController, ImageController),
VideoController: Object.assign(VideoController, VideoController),
Settings: Object.assign(Settings, Settings),
HeroSlideController: Object.assign(HeroSlideController, HeroSlideController),
FeaturedPropertyController: Object.assign(FeaturedPropertyController, FeaturedPropertyController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers