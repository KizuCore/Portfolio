import { JSX } from "react";
import { useTranslation } from "react-i18next";
import LegalDocumentLayout from "./LegalDocumentLayout";
import { LEGAL_UPDATED_HUMAN, LEGAL_UPDATED_ISO } from "../../data/legal";

function PolitiqueCookies(): JSX.Element {
    const { i18n } = useTranslation();
    const lastUpdateHuman = LEGAL_UPDATED_HUMAN;
    const lastUpdateISO = LEGAL_UPDATED_ISO;
    const currentLang = (i18n.resolvedLanguage ?? i18n.language ?? "fr").split("-")[0].toLowerCase();
    const legalLang = currentLang === "es" ? "en" : currentLang === "bzh" ? "fr" : currentLang === "en" ? "en" : "fr";
    const tx = i18n.getFixedT(legalLang);

  return (
    <LegalDocumentLayout kind="cookies" language={legalLang} title={tx("cookie_policy.title")}>
      <section className="mb-6" aria-labelledby="cp-what-title">
          <h2 id="cp-what-title" className="text-2xl">
              {tx("cookie_policy.what.title")}
          </h2>
          <p>{tx("cookie_policy.what.p1")}</p>
          <p>{tx("cookie_policy.what.p2")}</p>
      </section>

      <section className="mb-6" aria-labelledby="cp-types-title">
          <h2 id="cp-types-title" className="text-2xl">
              {tx("cookie_policy.types.title")}
          </h2>
          <ul>
              <li>{tx("cookie_policy.types.necessary")}</li>
              <li>{tx("cookie_policy.types.analytics")}</li>
              <li>{tx("cookie_policy.types.captcha")}</li>
          </ul>
      </section>

      <section className="mb-6" aria-labelledby="cp-use-title">
          <h2 id="cp-use-title" className="text-2xl">
              {tx("cookie_policy.use.title")}
          </h2>
          <p>{tx("cookie_policy.use.p1")}</p>
          <p>{tx("cookie_policy.use.p2")}</p>
      </section>

      <section className="mb-6" aria-labelledby="cp-duration-title">
          <h2 id="cp-duration-title" className="text-2xl">
              {tx("cookie_policy.duration.title")}
          </h2>
          <p>{tx("cookie_policy.duration.p1")}</p>
          <p>{tx("cookie_policy.duration.analytics")}</p>
          <p>{tx("cookie_policy.duration.captcha")}</p>
          <p>{tx("cookie_policy.duration.storage")}</p>
      </section>

      <section className="mb-6" aria-labelledby="cp-manage-title">
          <h2 id="cp-manage-title" className="text-2xl">
              {tx("cookie_policy.manage.title")}
          </h2>
          <p>{tx("cookie_policy.manage.p1")}</p>
          <button
              type="button"
              className="ui-button text-sm cookie-policy-manage-btn"
              onClick={() => window.openCookiePreferences?.()}
              aria-label={tx("cookie_policy.manage.button")}
          >
              {tx("cookie_policy.manage.button")}
          </button>
      </section>

      <section className="mb-2" aria-labelledby="cp-update-title">
          <h2 id="cp-update-title" className="text-2xl">
              {tx("cookie_policy.update.title")}
          </h2>
          <p>{tx("cookie_policy.update.p1")}</p>
          <p className="legal-updated-text">
              <time dateTime={lastUpdateISO}>
                  {tx("cookie_policy.last_update", { date: lastUpdateHuman })}
              </time>
          </p>
      </section>
    </LegalDocumentLayout>
  );
}

export default PolitiqueCookies;
