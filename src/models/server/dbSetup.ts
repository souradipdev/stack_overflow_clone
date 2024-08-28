import {databases} from "@/models/server/config";
import createAnswerCollection from "@/models/server/answer.collection";
import createCommentCollection from "@/models/server/comment.collection";
import createVoteCollection from "@/models/server/vote.collection";
import createQuestionCollection from "@/models/server/question.collection";
import {dbID} from "@/ids";
import {db} from "@/name";

export default async function getOrCreateDB() {
  try {
    await databases.get(dbID);
    console.log("Database exists");
    return true;
  } catch (error) {
    // console.log("sdahgfd: ", error);
    try {
      await databases.create(dbID, db);
      console.log("Database created");
      await Promise.all([
        createQuestionCollection(),
        createVoteCollection(),
        createAnswerCollection(),
        createCommentCollection()
      ]);
      // console.log("Collection created");
      console.log("Database connected");
      return true;
    } catch (error) {
      console.log("Error creating databases or collection", error)
      return false;
    }
  }
}