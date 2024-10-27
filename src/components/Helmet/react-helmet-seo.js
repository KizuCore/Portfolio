import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

function SeoMeta() {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t('seo_title')}</title>
        <meta name="description" content={t('seo_description')} />
        <meta property="og:title" content={t('seo_og_title')} />
        <meta property="og:description" content={t('seo_og_description')} />
        <meta name="twitter:title" content={t('seo_twitter_title')} />
        <meta name="twitter:description" content={t('seo_twitter_description')} />
      </Helmet>
    </HelmetProvider>
  );
}

export default SeoMeta;
