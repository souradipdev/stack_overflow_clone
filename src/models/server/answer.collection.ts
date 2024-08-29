import {IndexType, Permission} from "node-appwrite";
import {dbID, answerCollectionID} from "@/ids";
import {db, answerCollection} from "@/name";
import {databases} from "@/models/server/config";

export default async function createAnswerCollection() {
  try {
    await databases.createCollection(dbID, answerCollectionID, answerCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.delete("users"),
      Permission.update("users"),
      Permission.write("users")
    ]);

    console.log("Answer collection created");

    await Promise.all([
      databases.createStringAttribute(dbID, answerCollectionID, "content", 10000, true),
      databases.createStringAttribute(dbID, answerCollectionID, "questionId", 50, true),
      databases.createStringAttribute(dbID, answerCollectionID, "authorId", 50, true, undefined, true)
    ]);

    console.log("Answer collection attributes created");
  } catch (error) {
    console.log("Answer collection error: ");
    console.log(error);
  }
}