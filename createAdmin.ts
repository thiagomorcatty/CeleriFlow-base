import { adminAuth } from "./src/lib/firebase/server";
import * as dotenv from "dotenv";

dotenv.config();

async function createAdminUser() {
  try {
    const userRecord = await adminAuth.createUser({
      email: "admin@email.com",
      password: "Senha12345!",
      displayName: "Administrador CeleriFlow",
    });
    console.log("Successfully created new user:", userRecord.uid);
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
       console.log("User already exists!");
    } else {
       console.error("Error creating new user:", error);
    }
  }
}

createAdminUser();
