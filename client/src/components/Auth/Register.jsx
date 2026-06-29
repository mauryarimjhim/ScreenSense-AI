import AuthLayout from "../../components/Auth/AuthLayout";
import LeftPanel from "../../components/Auth/LeftPanel";
import RegisterForm from "../../components/Auth/RegisterForm";

function Register() {
  return (
    <AuthLayout leftPanel={<LeftPanel />}>
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;