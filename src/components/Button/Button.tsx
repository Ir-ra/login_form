type ButtonType = "button" | "submit" | "reset";

type ButtonProps = {
  title: string;
  type: ButtonType;
  disabled: boolean;
  style?: string;

}
export default function Button({ title, disabled, type, style }: ButtonProps) {
  return (
    <button
      className={`${style !== 'outline' ? 'button' : 'button button__outline'}`}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
