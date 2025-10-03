-- AlterTable
ALTER TABLE "public"."services" DROP COLUMN "duration",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
