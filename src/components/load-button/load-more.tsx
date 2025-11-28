import style from "./load-button.module.css";

interface LoadMoreProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoadMore = ({ onClick, disabled = false }: LoadMoreProps) => (
  <button
    className={style["load-button"]}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    LOAD MORE
  </button>
);

export default LoadMore;
