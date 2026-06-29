import AuthLayout from "../../components/Auth/AuthLayout";
import LeftPanel from "../../components/Auth/LeftPanel";
import LoginForm from "../../components/Auth/LoginForm";

function Login() {
  return (
    <AuthLayout leftPanel={<LeftPanel />}>
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;