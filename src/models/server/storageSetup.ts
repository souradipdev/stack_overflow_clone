import {Permission} from "node-appwrite";
import {questionAttachmentBucket} from "@/name";
import {dbID, questionAttachmentBucketID} from "@/ids";
import {storage} from "@/models/server/config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentBucketID);
    console.log("Storage connected")
  } catch (error) {
    try {
      await storage.createBucket(questionAttachmentBucketID, questionAttachmentBucket, [
          Permission.create("users"),
          Permission.read("any"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ], false, undefined, undefined, ["jpg", "png", "gif", "jpeg", "webp", "heic"]
      );
      console.log("Storage Created");
      console.log("Storage Connected");

    } catch (error) {
      console.log("Error creating storage ", error);
    }
  }
}