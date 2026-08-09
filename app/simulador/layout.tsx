import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador — CollectionatApp",
  description: "Recorré una simulación full-screen de las implementaciones reales de Collectionat para Inmobiliarias y Gestión Legal.",
};

export default function SimuladorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
