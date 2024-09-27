import { AuthForm } from "@/components";

const Login = () => {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Welcome Back</h3>
      <AuthForm isSingup={false} />
    </div>
  );
};

export default Login;
