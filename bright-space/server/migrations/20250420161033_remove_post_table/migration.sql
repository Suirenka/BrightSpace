-- CreateTable
CREATE TABLE "records" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "lgaKey" INTEGER,
    "lgaDesc" TEXT NOT NULL,
    "numerator" INTEGER,
    "denominator" INTEGER,
    "indicator" DOUBLE PRECISION,
    "isNdp" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);
