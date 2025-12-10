// Firebase client (browser only)
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQt7H_g32c8aWtQE2qJ9tE9mB6TavZGnQ",
  authDomain: "janasenim.firebaseapp.com",
  projectId: "janasenim",
  storageBucket: "janasenim.firebasestorage.app",
  messagingSenderId: "182281149258",
  appId: "1:182281149258:web:f877bc38cfe497abb7ffb3",
  measurementId: "G-FEG2CYV3JE"
}

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
  }
}

export { app }

// Для server-side (API routes)
import * as admin from 'firebase-admin'

const serviceAccount = {
  type: "service_account",
  project_id: "janasenim",
  private_key_id: "2580bd5a95998f351cee4c3debf7b8a6e7884ceb",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDSBS6730i07nsU\nzWiZruIFnmey1yTmJ2Mr7Cnej/ew9Fy+4JbnAtuz5fvksj8lVd8XSAyLbHwj5N1T\nG+dWx+n0W0CzSD+AOtTpj4QwjID1HI4Tm3px0QG/g7N3XWxMXzu3MCjcecN6QFN/\n6VNdA3lsishPOsjBHjHmZX2+Nw66iuaiDthkDeQjVmXibyv826vJ/97rCaEDdpIW\nWIJJmd8drXIhCdun71lhhiYdp7Tk6Eufph+l5WHo4mNliVL/NLBLvadvsK0lvneG\ncKf/UdEKtVfaVxIfX+D5fO7OS0maRO9+/qnexLehhLqyyhROBVGkON7BDdk7wkpA\nV0B9B3HlAgMBAAECggEANkMRhofTjK+7DC5gEqjtC7+YEkxk47QUeuIrFS5ENCuG\nlOiJBImoAwxuLvHgv8A2ghji6NjwIAP/LPxeIn1HVJOJHWkSwwowPWIPqM18ehfV\nG3rFwYdbOMSJx1LTas4GKzfdrs0k9L6O9FLv72243xLiWxoYiVDIWrspKE6oVwiZ\nReWuKHJburX8Ho4PbkN5UKuSxmLRcS5MErV+FGuqamHu7PXkjeXXaAROvAUfxOCx\n/YyRjd99uBi7fg/Ao/SCGfX6iXUwSR9Pt9b4MQV0yoN1RE0sKS8wxtwLA+cN+aHJ\nv7cryRJ2N/Hq6WJE9isXyY6i+CXWScyusYeReuSS1wKBgQDzWPAqwmKTttMeB6P1\nSD6+57aFGZmBQtzjXb23WEINcBW/ecMehEEa9QQ9Qt/MrLFV4O59jyihkhWATVRM\nnr/HqrIkMHuo8QK9y9Dxii76cvUwX/vmGVQOpNam/RPpPwLxoiv9EhzKYs+jy6t0\nByWpxk+bhnnp5wXJmyjJPys+ewKBgQDc8KUfL/PWLejzMi+FG2R0iSHgWKbsx3Xu\nHUe11KDtwrk0QuuMmnx13eknBqSP+nZXFYOGQ3FthENyotX0WhrBDlKlnO7ajIEc\ns8mNvhzQ9DLZYpkIBS3Y4Fm4dgp/d9+wzy3swY4ToCV2Z3AsBXf6ll6yqmRswzPj\nfyVk8stTHwKBgQCcFcvWYWBBRt8bP+NWjMRSRuW3cbgYRP7Rh2sMkrurSt1oN32D\nsWjhFY9mi+Joscv9PY07U/vHxp+r7+3GR3zTYRVqSP7IWe5cNsMKaou/cMT8BlTY\nPh7AVdKowWNoFFabDl4QsPFujvqIITcT8RGjV+Pv6c2AzgHUUoVSsAXYyQKBgQDK\nwXDXORttT357SHABmEzNAVf8WX7+xmE8XtSDUplI+K0b/9nIk7FqPXcM4HS+yJw3\neL/VxCjg10NKfZMZhmMNDkbcQzOTjuOh4oAyOuiY/bF4e5pymMYlRGYx+OnTZr/6\ns3ay0kG/UvVuPqjbTT140uwezG4SveTtfq5jgMkFAwKBgQDXygjM/LonDrA1TufW\na/BmkJzm4v4SAAnTEB7hZgIstR2xF9BBkjUkE4Bje8W+EPAuDsgml7e8QukGPbS/\ntDzKEZMqWlZYDTek8FwD2B6dSh1iWJbaptBSdPEEhesoIMMLSQ4HGk8aCLng8zB5\nzb1zUVARoGSjV9h05T8lxzIFEA==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@janasenim.iam.gserviceaccount.com",
  client_id: "109286070908422071421",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40janasenim.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })
}

export const db = admin.firestore()
