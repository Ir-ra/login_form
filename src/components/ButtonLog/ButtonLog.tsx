type ButtonLogType = {
  title: string;
  src: string;
}

export default function ButtonLog({title, src}: ButtonLogType) {
  return (
  <button className="buttonLink">
    <img src={src} alt={`${title} icon`} />
    <p className="buttonLink__text">{title}</p>
  </button>
  )
}
