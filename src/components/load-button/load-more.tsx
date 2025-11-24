import style from "./load-button.module.css";

interface LoadMoreProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function LoadMore({ onClick, disabled = false }: LoadMoreProps) {
  return <button className={style["load-button"]} onClick={onClick} disabled={disabled}>LOAD MORE</button>;
}
