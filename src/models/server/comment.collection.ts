import {IndexType, Permission} from "node-appwrite";
import {db, commentCollection} from "@/name";
import {dbID, commentCollectionID, questionCollectionID} from "@/ids";
import {databases} from "@/models/server/config";

export default async function createCommentCollection() {

  await databases.createCollection(dbID, commentCollectionID, commentCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.delete("users"),
    Permission.update("users"),
    Permission.write("users")
  ]);

  console.log("Comment collection created");

  await Promise.all([
    databases.createStringAttribute(dbID, questionCollectionID, "content", 10000, true),
    databases.createEnumAttribute(dbID, questionCollectionID, "type", ["answer", "question"], true),
    databases.createStringAttribute(dbID, questionCollectionID, "typeId", 50, true),
    databases.createStringAttribute(dbID, questionCollectionID, "authorId", 50, true)
  ]);

  console.log("Comment collection attributes created");
}