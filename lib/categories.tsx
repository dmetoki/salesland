import {
    Badge,
      BookUser,
      Building2,
      CircleDollarSign,
      CircleHelp,
      Facebook,
      Frown,
      GraduationCap,
      HandFist,
      Handshake,
      Instagram,
      Landmark,
      Linkedin,
      Meh,
      Newspaper,
      PenTool,
      Pickaxe,
      Rss,
      ShoppingBasket,
      Smile,
      Star,
      Twitter,
      UserCircle2,
      Users,
      Youtube,
    } from "lucide-react"
    
    export const labels = [
      {
        value: "bug",
        label: "Bug",
      },
      {
        value: "feature",
        label: "Feature",
      },
      {
        value: "documentation",
        label: "Documentation",
      },
    ]
    export const dimensions = [
      {
        value: "comercial",
        label: "Comercial",
        icon: ShoppingBasket,
      },
      {
        value: "comunidad",
        label: "Comunidad",
        icon: Users,
      },
      {
        value: "financiera",
        label: "Financiera",
        icon: CircleDollarSign,
      },
      {
        value: "institucional",
        label: "Institucional",
        icon: Landmark,
      },
      {
        value: "laboral",
        label: "Laboral",
        icon: Pickaxe,
      },
      {
        value: "prod y serv",
        label: "Prod y Serv",
        icon: Handshake,
      },
      {
        value: "otros",
        label: "Otros",
        icon: CircleHelp,
      }
    ]
    export const source_types =[
      {
        value: "blog",
        label: "Blog",
        icon: Rss
      },
      {
        value: "facebook",
        label: "Facebook",
        icon: Facebook
      },
      {
        value: "instagram",
        label: "Instagram",
        icon: Instagram
      },
      {
        value: "linkedin",
        label: "Linkedin",
        icon: Linkedin
      },
      {
        value: "news",
        label: "News",
        icon: Newspaper
      },
      {
        value: "reddit",
        label: "Reddit",
        icon: Badge
      },
      {
        value: "twitter",
        label: "Twitter",
        icon: Twitter
      },
      {
        value: "youtube",
        label: "Youtube",
        icon: Youtube
      },
      {
        value: "Otros",
        label: "Otros",
        icon: CircleHelp,
      }
    ]
    export const stakeholders = [
      {
        value: "activista",
        label: "Activista",
        icon: HandFist,
      },
      {
        value: "autoridad",
        label: "Autoridad",
        icon: Star,
      },
      {
        value: "empleado",
        label: "Empleado",
        icon: BookUser,
      },
      {
        value: "empresa",
        label: "Empresa",
        icon: Building2,
      },
      {
        value: "periodista",
        label: "Periodista",
        icon: PenTool,
      },
      {
        value: "profesional",
        label: "Profesional",
        icon: GraduationCap,
      },
      {
        value: "usuario",
        label: "Usuario",
        icon: UserCircle2,
      },
      {
        value: "otros",
        label: "Otros",
        icon: CircleHelp,
      }
    ]
    export const sentiments = [
      {
        label: "Positive",
        value: 5,
        icon: Smile,
        color: "stroke-green-500"
      },
      {
        label: "Neutral",
        value: 0,
        icon: Meh,
        color: "stroke-gray-500"
      },
      {
        label: "Negative",
        value: -5,
        icon: Frown,
        color: "stroke-red-500"
      }
    ]