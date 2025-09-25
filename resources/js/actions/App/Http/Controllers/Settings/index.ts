import ContactController from './ContactController'
import ProfileController from './ProfileController'
import PasswordController from './PasswordController'


const Settings = {
    ContactController: Object.assign(ContactController, ContactController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    PasswordController: Object.assign(PasswordController, PasswordController),
}

export default Settings