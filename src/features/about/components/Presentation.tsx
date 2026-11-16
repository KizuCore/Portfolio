import type { JSX } from "react";
import type { TFunction } from "i18next";
import { Trans } from "react-i18next";
import { FiCode } from "@react-icons/all-files/fi/FiCode";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import { MinecraftMemory } from "./ProfileInteractions";

export default function Presentation({ t }: { t: TFunction }): JSX.Element {
  return (
    <>
      <h2 className="about-profile-lead">
        <Trans t={t} i18nKey="presentation.introduction" components={{ strong: <strong className="profile-emphasis" /> }} />
      </h2>
      <p className="about-profile-role">{t('presentation.role')}</p>
      <p className="about-profile-background">{t('presentation.background')}</p>
      <div className="profile-stories">
        <section className="profile-story">
          <span className="profile-story-icon"><FiCode aria-hidden="true" /></span>
          <div>
            <h3>{t('presentation.first_website_title')}</h3>
            <p><Trans t={t} i18nKey="presentation.first_website" components={{ foodwars: <strong className="profile-emphasis" />, website: <strong className="profile-emphasis" /> }} /></p>
          </div>
        </section>
        <section className="profile-story">
          <span className="profile-story-icon"><FiUsers aria-hidden="true" /></span>
          <div>
            <h3>{t('presentation.minecraft_title')}</h3>
            <p><Trans t={t} i18nKey="presentation.minecraft" components={{ minecraft: <MinecraftMemory />, strong: <strong className="profile-emphasis" /> }} /></p>
          </div>
        </section>
      </div>
    </>
  );
}
