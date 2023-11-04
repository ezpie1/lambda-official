interface Props {
  displayText: string;
  redirectLink: string;
}

export default function Separator(props: Props) {
  return (
    <div>
      <div className="flex my-10 justify-around">
        <div className="my-auto w-24 h-1 separator rounded-full"></div>
        <p>Or</p>
        <div className="my-auto w-24 h-1 separator rounded-full"></div>
      </div>
      <div className="flex justify-center">
        <a href={`/${props.redirectLink}`} className="link-text">
          {props.displayText}
        </a>
      </div>
    </div>
  );
}
