import "dotenv/config";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function requiredEnvironment(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} nao configurada.`);
  return value;
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: requiredEnvironment("FIREBASE_PROJECT_ID"),
      clientEmail: requiredEnvironment("FIREBASE_CLIENT_EMAIL"),
      privateKey: requiredEnvironment("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    }),
  });
}

const email = requiredEnvironment("FIREBASE_USER_EMAIL").trim().toLowerCase();
const password = requiredEnvironment("FIREBASE_USER_PASSWORD");

const auth = getAuth();
const user = await auth.getUserByEmail(email);
await auth.updateUser(user.uid, { password });

console.log(`Senha atualizada para ${email}.`);
