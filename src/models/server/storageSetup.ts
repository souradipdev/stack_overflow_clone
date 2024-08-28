import {Permission} from "node-appwrite";
import {questionAttachmentBucket} from "@/name";
import {dbID, questionAttachmentBucketID} from "@/ids";
import {storage} from "@/models/server/config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentBucketID);
    console.log("Storage connected");
    return true;
  } catch (error) {
    try {
      await storage.createBucket(questionAttachmentBucketID, questionAttachmentBucket, [
          Permission.read("any"),
          Permission.read("users"),
          Permission.create("users"),
          Permission.update("users"),
          Permission.delete("users"),
          Permission.write("users")
        ], false, undefined, undefined, ["jpg", "png", "gif", "jpeg", "webp", "heic"]
      );
      console.log("Storage Created");
      console.log("Storage Connected");
      return true;

    } catch (error) {
      console.log("Error creating storage ", error);
      return false;
    }
  }
}