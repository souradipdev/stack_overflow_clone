import {Permission} from "node-appwrite";
import {dbID, voteCollectionID} from "@/ids";
import {db, voteCollection} from "@/name";
import {databases} from "@/models/server/config";

export default async function createVoteCollection() {
  try {
    await databases.createCollection(dbID, voteCollectionID, voteCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.delete("users"),
      Permission.update("users"),
      Permission.write("users")
    ]);
    console.log("Vote Collection Created");

    await Promise.all([
      databases.createEnumAttribute(dbID, voteCollectionID, "type", ["question", "answer"], true),
      databases.createStringAttribute(dbID, voteCollectionID, "typeId", 50, true),
      databases.createEnumAttribute(dbID, voteCollectionID, "voteStatus", ["upvoted", "downvoted"], true),
      databases.createStringAttribute(dbID, voteCollectionID, "votedById", 50, true),
    ]);

    console.log("Vote Attributes Created");
  } catch (error) {
    console.log("Vote collection error: ");
    console.log(error);
  }
}