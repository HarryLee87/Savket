-- DropForeignKey
ALTER TABLE "SMSToken" DROP CONSTRAINT "SMSToken_user_id_fkey";

-- AddForeignKey
ALTER TABLE "SMSToken" ADD CONSTRAINT "SMSToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
