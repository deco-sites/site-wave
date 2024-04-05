import Divider from "../../components/footer/Divider.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import Social from "../../components/footer/Social.tsx";
import Localizations from "deco-sites/site-wave/components/footer/Localizations.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Instagram"
    | "Youtube"
    | "Linkedin";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  apple?: string;
  android?: string;
}

export interface LocalItem {
  title: string;
  content: string;
  isIcon?: boolean;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    local?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: SocialItem[];
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;

  local?: LocalItem[];
}

const LAYOUT = {
  "Primary": "bg-black text-white",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  social,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  local = [],
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );

  const _local = layout?.hide?.local
    ? <></>
    : local.map((item, index) => (
      <Localizations
        key={index}
        title={item.title}
        content={item.content}
        isIcon={item.isIcon}
      />
    ));

  return (
    <footer
      class={clx(
        "w-full flex flex-col pb-2 md:pb-10 gap-10",
        LAYOUT[layout?.backgroundColor ?? "Primary"],
      )}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        <div class="py-20 ">
          <Divider />
        </div>
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col lg:flex-row lg:space-between container pb-20">
            <div>
              <div class="flex items-center flex-row lg:flex-col justify-between lg:items-start">
                <div class="">
                  {_logo}
                </div>
                <div class="lg:mt-10">
                  <Social content={social} />
                </div>
              </div>
              <div class="mt-10">
                {_newsletter}
              </div>
            </div>
            <div>
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 sm:gap-8 lg:justify-between">
                {_sectionLinks}
              </div>
              <div class="grid grid-cols-2 gap-4 lg:flex justify-between mt-10 ">
                {_local}
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
