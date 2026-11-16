import type { JSX } from "react";
import type { TFunction } from "i18next";
import HobbyArtwork from "./HobbyArtwork";

export default function Hobbies({ t, onSecretClick }: { t: TFunction; onSecretClick: () => void }): JSX.Element {
  const hobbies = [
    { symbol: '✈️', index: 0 },
    { symbol: '🔭', index: 2 },
    { symbol: '🐈', index: 3 },
    { symbol: '🥂', index: 4 },
    { symbol: '🎵', index: 5 },
    { symbol: '🧩', index: 7 },
  ];
  return <>
    <p className="hobbies-intro">{t('outside_of_coding')}</p>
    <div className="profile-hobby-grid">{hobbies.map(({ symbol, index }) => <article key={symbol} className="profile-hobby-card" data-hobby={index}>
      <div className="profile-hobby-banner">
        <h3 className="profile-hobby-heading">
          {index === 4 ? <button type="button" className="profile-hobby-secret" onClick={onSecretClick}><strong>{t(`hobby${index + 1}`)}</strong></button>
            : <strong>{t(`hobby${index + 1}`)}</strong>}
        </h3>
        <HobbyArtwork index={index} />
      </div>
      <span className="profile-hobby-detail">{t(`about_interactions.hobby_details.${index + 1}`)}</span>
    </article>)}</div>
  </>;
}
