-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "lnk";

-- CreateTable
CREATE TABLE "lnk"."accounts" (
    "id" TEXT NOT NULL,
    "ga_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lnk"."urls" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "actual_url" TEXT NOT NULL,
    "hit" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "account_id" TEXT,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_ga_id_key" ON "lnk"."accounts"("ga_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "lnk"."accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "urls_slug_key" ON "lnk"."urls"("slug");

-- AddForeignKey
ALTER TABLE "lnk"."urls" ADD CONSTRAINT "urls_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "lnk"."accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
