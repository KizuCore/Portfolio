import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/styles/LoadingImage.css";

type Props = ImgHTMLAttributes<HTMLImageElement>;

export default function LoadingImage(props: Props) {
  // Chaque nouvelle source possède son propre état de chargement, y compris lors du parcours des projets.
  return <ImageState key={props.src} {...props} />;
}

function ImageState({ alt = "", onLoad, onError, ...props }: Props) {
  const { t } = useTranslation();
  const image = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    // Les images en cache peuvent finir de charger avant que React n’attache le gestionnaire de chargement.
    if (image.current?.complete && image.current.naturalWidth > 0) setStatus("ready");
  }, []);
  return (
    <span className={`loading-image loading-image--${status}`} aria-busy={status === "loading"}>
      <img {...props} ref={image} alt={alt}
        onLoad={(event) => { setStatus("ready"); onLoad?.(event); }}
        onError={(event) => { setStatus("error"); onError?.(event); }}
      />
      {status === "loading" && (
        <span className="loading-image-overlay" role="status">
          <span className="image-spinner" aria-hidden="true" />
          <span className="visually-hidden">{t("a11y.loading_content")}</span>
        </span>
      )}
      {status === "error" && <span className="loading-image-overlay loading-image-error" role="status">{alt}</span>}
    </span>
  );
}
