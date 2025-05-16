import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import MainMenu from "../components/MainMenu.vue";
import ScanQR from "../components/ScanQR.vue";
import AttendanceLog from "../components/AttendanceLog.vue";
import CheckAvailability from "../components/CheckAvailability.vue";
import Settings from "../components/Settings.vue";
import ReportIssue from "../components/ReportIssue.vue";
import About from "../components/About.vue";
import LogOut from "../components/LogOut.vue";
import HelpCantLogIn from "../components/HelpCantLogIn.vue";
import PrivacyTerms from "../components/PrivacyTerms.vue"; // Assuming you'll rename the Privacy Policy file
import AdminDashboard from "../components/AdminDashboard.vue";
import MyAccountDetails from "../components/MyAccountDetails.vue";
import LiveView from "../components/LiveView.vue";
import ConnectWifi from "../components/ConnectWifi.vue";
import SoftwareAcces from "../components/SoftwareAcces.vue";
import PrintingServices from "../components/PrintingServices.vue";
import Feedback from "../components/Feedback.vue";
import SignInLogs from "../components/SignInLogs.vue";
import OpenForumsandDiscussions from "../components/OpenForumsandDiscussions.vue";

const routes = [
  { path: "/", name: "SignIn", component: SignIn }, // Default route
  { path: "/signup", name: "SignUp", component: SignUp },
  { path: "/main-menu", name: "MainMenu", component: MainMenu },
  { path: "/scan-qr", name: "ScanQR", component: ScanQR },
  {
    path: "/open-forum",
    name: "OpenForumsandDiscussions",
    component: OpenForumsandDiscussions,
  },
  { path: "/attendance-log", name: "AttendanceLog", component: AttendanceLog },
  {
    path: "/check-availability",
    name: "CheckAvailability",
    component: CheckAvailability,
  },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/report-issue", name: "ReportIssue", component: ReportIssue },
  { path: "/about", name: "About", component: About },
  { path: "/admin", name: "Admin", component: AdminDashboard },
  { path: "/log-out", name: "LogOut", component: LogOut },
  { path: "/help-login", name: "HelpCantLogIn", component: HelpCantLogIn },
  { path: "/privacy-terms", name: "PrivacyTerms", component: PrivacyTerms },
  { path: "/live-view", name: "LiveView", component: LiveView },
  { path: "/connect-wifi", name: "ConnectWifi", component: ConnectWifi },
  { path: "/feedback", name: "Feedback", component: Feedback },
  {
    path: "/printing-services",
    name: "PrintingServices",
    component: PrintingServices,
  },
  {
    path: "/software-access",
    name: "SoftwareAccess",
    component: SoftwareAcces,
  },
  {
    path: "/signin-logs",
    name: "SignInLogs",
    component: SignInLogs,
  },
  {
    path: "/account-details",
    name: "MyAccountDetails",
    component: MyAccountDetails,
  },
  // Assuming you'll rename the Privacy Policy file
];

const router = createRouter({
  history: createWebHistory("/Final-Project-IT-101/"), // Updated base URL
  routes,
});

export default router;
