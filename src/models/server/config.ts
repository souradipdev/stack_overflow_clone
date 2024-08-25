import env from "@/env";

import {Client, Storage, Databases, Avatars, Account} from "node-appwrite";

const client = new Client()
.setEndpoint(env.appwrite.endpoint)
.setProject(env.appwrite.projectId);

const databases = new Databases(client);
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export {databases, client, account, avatars, storage};
