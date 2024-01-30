import { FC } from "react";
import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

const Meta: FC<MetaProps> = ({ title, description, keywords }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="canonical" href="https://linkbud.hansenlimanta.com" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Linkbud",
  description: "Linkbud is a link page builder for creators.",
  keywords:
    "link, linkbud, linkbud.com, linkbud website, linkbud app, linkbud application, linkbud link, linkbud links, linkbud link page, linkbud link pages, linkbud linkbud, linkbud linkbud link, linkbud linkbud links, linkbud linkbud link page, linkbud linkbud link pages, linkbud linkbud.com, linkbud linkbud website, linkbud linkbud app, linkbud linkbud application, linkbud linkbud link, linkbud linkbud links, linkbud linkbud link page, linkbud linkbud link pages, linkbud linkbud.com link, linkbud linkbud.com links, linkbud linkbud.com link page, linkbud linkbud.com link pages, linkbud linkbud.com website, linkbud linkbud.com app, linkbud linkbud.com application, linkbud linkbud.com link page, linkbud linkbud.com link pages, linkbud linkbud.com linkbud, linkbud linkbud.com linkbud link, linkbud linkbud.com linkbud links, linkbud linkbud.com linkbud link page, linkbud linkbud.com linkbud link pages",
};

export default Meta;
