import { AuthForm } from "@/components";

const Signup = () => {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Create New Account</h3>
      <AuthForm isSingup={true} />
    </div>
  );
};

export default Signup;
