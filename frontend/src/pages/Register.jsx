import Form from "../components/Form";

function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Form route="/api/user/register/" method="register" />;
    </div>
  );
}

export default Register;
