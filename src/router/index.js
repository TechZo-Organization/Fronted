import {createRouter, createWebHistory} from "vue-router";

//Main pages:
import HomeContent from "../home/home-content.component.vue";
import DonationsContent from "../donations/donations-content.component.vue";
import MembershipsContent from "../memberships/memberships-content.component.vue";
import HelpContent from "../terms-conditions/components/help-content.component.vue";
import ContactUsContent from "../terms-conditions/components/contact-us-content.component.vue";
import TermsUseContent from "../terms-conditions/components/terms-use-content.component.vue";
import PrivacyPoliciesContent from "../terms-conditions/components/privacy-policies-content.component.vue";
import LoginContent from "../login/login-content.component.vue";
import RegisterContent from "../register/register-content.component.vue";
import AdminContentComponent from "../admin/admin-content.component.vue";
import CrudUsersComponent from "../admin/components/crud-users.component.vue";
import CrudOngsComponent from "../admin/components/crud-ongs.component.vue";
import CrudMembershipsComponent from "../admin/components/crud-memberships.component.vue";
import CrudCategoriesProductComponent from "../admin/components/crud-categories-product.component.vue";
import CrudCategoriesOngComponent from "../admin/components/crud-categories-ong.component.vue";
import PublishComponent from "../publish/publish-content.component.vue";
import ProfileComponent from "../profile/profile-content.component.vue";
import ProductInformationContent from "../product-information/product-information-content.component.vue";
import PublisherProfileContent from "../publisher-profile/publisher-profile-content.component.vue";
import OngInformationContent from "../ong-information/ong-information-content.component.vue";
import ProductCategoriesContent from "../product-categories/product-categories-content.component.vue";
import MembershipPaymentContent from "../membership-payment/membership-payment-content.component.vue";
import EditProfileComponent from "../profile/components/edit-profile.component.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: HomeContent, meta: { title: 'Home' } },
        { path: '/donations', component: DonationsContent, meta: { title: 'Donations' } },
        { path: '/memberships', component: MembershipsContent, meta: { title: 'Memberships' } },
        { path: '/publish', component: PublishComponent, meta: { title: 'Publish' }},
        { path: '/profile', component: ProfileComponent, meta: { title: 'Edit Profile' }},
        { path: '/edit-profile', component: EditProfileComponent, meta: { title: 'Profile' }},
        { path: '/product-information/:id', component: ProductInformationContent, meta: { title: 'Product Information' }},
        { path: '/publisher-profile/:id', component: PublisherProfileContent, meta: { title: 'Publisher Profile' }},
        { path: '/ong-information/:id', component: OngInformationContent, meta: { title: 'Ong Information' }},
        { path: '/product-categories', component: ProductCategoriesContent, meta: { title: 'Product Categories' }},
        { path: '/membership-payment/:id', component: MembershipPaymentContent, meta: { title: 'Membership Payment' }},
        //Terms & conditions pages:
        { path: '/help', component: HelpContent, meta: { title: 'Help' } },
        { path: '/contact-us', component: ContactUsContent, meta: { title: 'Contact us' } },
        { path: '/terms-use', component: TermsUseContent, meta: { title: 'Terms of Use' } },
        { path: '/privacy-policies', component: PrivacyPoliciesContent, meta: { title: 'Privacy policies' } },
        //Login & register:
        { path: '/log-in', component: LoginContent, meta: { title: 'Log in' } },
        { path: '/register', component: RegisterContent, meta: { title: 'Register' } },
        //Admin:
        { path: '/admin', component: AdminContentComponent, meta: { title: 'Admin' } },
        { path: '/admin/users', component: CrudUsersComponent, meta: { title: 'Crud Users' } },
        { path: '/admin/ongs', component: CrudOngsComponent, meta: { title: 'Crud Ongs' } },
        { path: '/admin/memberships', component: CrudMembershipsComponent, meta: { title: 'Crud Memberships' } },
        { path: '/admin/categories-product', component: CrudCategoriesProductComponent, meta: { title: 'Crud Categories Product' } },
        { path: '/admin/categories-ong', component: CrudCategoriesOngComponent, meta: { title: 'Crud Categories Ong' } },
        { path: '/', redirect: '/home' },
    ],
});

export default router;