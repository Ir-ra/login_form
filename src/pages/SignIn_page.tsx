import SignIn from "../components/SignIn/SignIn";
import Title from "../components/Title/Title";
import google from '../assets/google.svg';
import git from '../assets/git.svg';
import ButtonLog from "../components/ButtonLog/ButtonLog";
import Divider_or from "../components/Divider/Divider";

export default function SignIn_page() {
  return (
    <main>
      <div>
        <Title title='Log in to your account' />
        <div className="buttonLink__container">
          <ButtonLog title="Google" src={google} />
          <ButtonLog title="Github" src={git} />
        </div>
        <Divider_or />
        <SignIn />
      </div>
    </main>
  )
}
