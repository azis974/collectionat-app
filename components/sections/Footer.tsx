import { Boxes, Linkedin, Twitter, Youtube } from "lucide-react";

const COLUMNS = [
  {
    title: "Producto",
    links: ["Integraciones", "Características", "Seguridad", "Precios"],
  },
  {
    title: "Empresa",
    links: ["Sobre nosotros", "Clientes", "Carreras", "Contacto"],
  },
  {
    title: "Recursos",
    links: ["Documentación", "Centro de ayuda", "Estado del servicio", "Novedades"],
  },
  {
    title: "Legal",
    links: ["Privacidad", "Términos de servicio", "Seguridad de datos"],
  },
];

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <a href="#top" className="flex items-center gap-2 text-white">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                <Boxes className="size-4 text-white" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold tracking-tight">Collectionat</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-zinc-500">
              La capa unificada sobre Microsoft 365 que mantiene la información de tu empresa
              organizada y accesible.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Collectionat. Todos los derechos reservados.
          </p>
          <p className="text-xs text-zinc-600">
            Microsoft, Microsoft 365, Teams, Outlook, SharePoint y OneDrive son marcas de
            Microsoft Corporation. Collectionat no está afiliado a Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
