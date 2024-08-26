import {IndexType, Permission} from "node-appwrite";

import {questionCollection} from "@/name";
import {databases} from "@/models/server/config";
import {dbID, questionCollectionID} from "@/ids";

export default async function createQuestionCollection() {
  await databases.createCollection(dbID, questionCollectionID, questionCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users")
  ])
  console.log("Question collection created");

  await Promise.all([
    databases.createStringAttribute(dbID, questionCollectionID, "title", 100, true),
    databases.createStringAttribute(dbID,
      questionCollectionID, "content", 10000, true),
    databases.createStringAttribute(dbID, questionCollectionID, "authorId", 50, true),
    databases.createStringAttribute(dbID, questionCollectionID, "tags", 50, true, undefined, true)
  ]);
  console.log("Question collection attributes created");

  await Promise.all([
    databases.createIndex(dbID, questionCollectionID, "title", IndexType.Fulltext, ["title"], ["asc"]),
    databases.createIndex(dbID, questionCollectionID, "content", IndexType.Fulltext, ["content"], ["asc"])
  ]);
  console.log("Question collection index assigned");
}