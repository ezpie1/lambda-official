import SignUpForm from "@/components/Auth/SignUpForm";
import Separator from "@/components/form/separator";

// Stylesheet for styling the form with custom styles
import "@/styles/form.css";

export default function SignUp() {
  return (
    <div>
      <div className="block form-wrapper">
        <h1 className="text-4xl">SignUp for a Lambda Account</h1>
        <SignUpForm />
        <Separator displayText="LogIn" redirectLink="login" />
      </div>
    </div>
  );
}
