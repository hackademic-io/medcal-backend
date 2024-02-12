-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Offer_appointment_id_key" ON "Offer"("appointment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_patient_id_key" ON "Offer"("patient_id");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
