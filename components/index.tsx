import styles from "./styles.module.css";

export function MockDataButton({ path }: { path: string }) {
  return (
    <div
      onClick={() => {
        console.log("path", path)
      }}
      className={`${styles.button} ml-2`}>
      Mock 数据
    </div>
  )
}
