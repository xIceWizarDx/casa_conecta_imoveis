import ContactController from './ContactController'
import AuthSettingsController from './AuthSettingsController'
import ProfileController from './ProfileController'
import PasswordController from './PasswordController'
const Settings = {
    ContactController: Object.assign(ContactController, ContactController),
AuthSettingsController: Object.assign(AuthSettingsController, AuthSettingsController),
ProfileController: Object.assign(ProfileController, ProfileController),
PasswordController: Object.assign(PasswordController, PasswordController),
}

export default Settings