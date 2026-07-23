-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "asaas_customer_id" VARCHAR(50);

-- CreateTable
CREATE TABLE "assinatura_plataforma" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "asaas_subscription_id" VARCHAR(50),
    "asaas_payment_id" VARCHAR(50),
    "billing_type" VARCHAR(20) NOT NULL,
    "internacional" BOOLEAN NOT NULL DEFAULT false,
    "valor" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pendente',
    "criado_em" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assinatura_plataforma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assinatura_plataforma_asaas_payment_id_idx" ON "assinatura_plataforma"("asaas_payment_id");

-- CreateIndex
CREATE INDEX "assinatura_plataforma_asaas_subscription_id_idx" ON "assinatura_plataforma"("asaas_subscription_id");

-- AddForeignKey
ALTER TABLE "assinatura_plataforma" ADD CONSTRAINT "assinatura_plataforma_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
