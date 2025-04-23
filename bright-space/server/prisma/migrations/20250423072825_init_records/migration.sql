-- CreateTable
CREATE TABLE "records" (
    "id" SERIAL NOT NULL,
    "year" INTEGER,
    "lgaKey" INTEGER,
    "lgaDesc" TEXT NOT NULL,
    "numerator" INTEGER,
    "denominator" INTEGER,
    "indicator" DOUBLE PRECISION,
    "isNdp" BOOLEAN NOT NULL DEFAULT false,
    "indicatorCode" TEXT NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "records_year_lgaKey_indicatorCode_key" ON "records"("year", "lgaKey", "indicatorCode");
