import styles from "./StarRating.module.css"
import clsx from "clsx"

function StarRating({ rating, onRate }) {
  return <>
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          className={clsx(styles.star, star <= rating && styles.selected)}
        >★</span>
      ))}
    </div>
  </>
}


export default StarRating