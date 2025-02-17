import SignUpForm from "@/components/Auth/SignUpForm";
import Separator from "@/components/form/separator";

// Stylesheet for styling the form with custom styles
import "@/styles/auth/auth.css";

export default function SignUp() {
  return (
    <div className="flex mx-9 mt-16 justify-between">
      <div className="default-text">
        <section>
          <h1 className="main-text">Privatus</h1>
          <p>The Social Media App</p>
          <p>That values privacy</p>
        </section>
        <section className="grid mt-16">
          <p>It&apos;s <span className="main-text">Open-source</span></p>
          <p className="justify-self-center">and</p>
          <p className="main-text justify-self-center">Privacy based</p>
        </section>
      </div>
      <div className="w-1/2">
        <SignUpForm />
        <Separator displayText="LogIn" redirectLink="login" />
      </div>
    </div>
  );
}
