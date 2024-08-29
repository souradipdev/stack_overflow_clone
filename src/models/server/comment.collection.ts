import {IndexType, Permission} from "node-appwrite";
import {db, commentCollection} from "@/name";
import {dbID, commentCollectionID} from "@/ids";
import {databases} from "@/models/server/config";

export default async function createCommentCollection() {
  try {
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
      databases.createStringAttribute(dbID, commentCollectionID, "content", 10000, true),
      databases.createEnumAttribute(dbID, commentCollectionID, "type", ["answer", "question"], true),
      databases.createStringAttribute(dbID, commentCollectionID, "typeId", 50, true),
      databases.createStringAttribute(dbID, commentCollectionID, "authorId", 50, true)
    ]);

    console.log("Comment collection attributes created");
  } catch (error) {
    console.log("Comment collection error: ");
    console.log(error);
  }

}