import { createFileRoute} from "@tanstack/react-router";
import { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useAuth } from "../auth";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

interface UserData {
  [key: string]: string;
}

const ERROR_INITIAL_STATE = {
  email: "",
  password: "",
  confirm_password: "",
};
function RouteComponent() {
  const [type, setType] = useState("login");
  const [data, setData] = useState<UserData>({});
  const [errors, setErrors] = useState(ERROR_INITIAL_STATE);
  const {login, register} = useAuth()
  function handleChangeType() {
    setErrors(ERROR_INITIAL_STATE);
    setType(type === "login" ? "register" : "login");
    setData({});
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function validateEmail() {
    if (!data["email"]) {
      setErrors((prev) => {
        return { ...prev, email: "El email no puede estar vacio" };
      });
      return false;
    }
    if (!data["email"].includes("@")) {
      setErrors((prev) => {
        return { ...prev, email: "El email no tiene un @" };
      });
      return false;
    }

    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!re.test(data["email"])) {
      setErrors((prev) => {
        return { ...prev, email: "El email no es valido" };
      });
      return false;
    }
    setErrors((prev) => {
      return { ...prev, email: "" };
    });
    return true;
  }

  function validatePassword() {
    if (!data["password"]) {
      setErrors((prev) => {
        return { ...prev, password: "La contrasena no puede estar vacia" };
      });
      return false;
    }
    if (data["password"].length < 8) {
      setErrors((prev) => {
        return {
          ...prev,
          password: "La contrasena no puede tener menos de 8 caracteres",
        };
      });
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(data["password"])) {
      setErrors((prev) => {
        return {
          ...prev,
          password: "La contrasena debe contener un caracter especial",
        };
      });
      return false;
    }
    if (!/[A-Z]/.test(data["password"])) {
      setErrors((prev) => {
        return {
          ...prev,
          password: "La contrasena debe contener una mayuscula",
        };
      });
      return false;
    }
    setErrors((prev) => {
      return { ...prev, password: "" };
    });
    return true;
  }
  function validateConfirmPassword() {
    if (!data["confirm_password"]) {
      setErrors((prev) => {
        return {
          ...prev,
          confirm_password: "El campo validar contrasena no puede estar vacio",
        };
      });
      return false;
    }
    if (!(data["confirm_password"] === data["password"])) {
      setErrors((prev) => {
        return { ...prev, confirm_password: "Las contrasenas no coinciden" };
      });
      return false;
    }
    setErrors((prev) => {
      return { ...prev, confirm_password: "" };
    });
    return true;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'login'){
      login(data.email, data.password)
    }
    else{
      register(data.email, data.password, data.confirm_password)
    }
  };
  let formBody;
  if (type === "login") {
    formBody = (
      <>
        <div className="input-container flex flex-col gap-6 mb-[24px]">
          <Input
            fullWidth={true}
            name={"email"}
            onChange={handleChangeInput}
            onBlur={validateEmail}
            errors={errors}
            value={data["email"] ? data["email"] : ""}
            onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
          />
          <Input
            fullWidth={true}
            name={"password"}
            type="password"
            onChange={handleChangeInput}
            onBlur={validatePassword}
            errors={errors}
            value={data["password"] ? data["password"] : ""}
            onFocus={() => setErrors((prev) => ({ ...prev, password: "" }))}
          />
          <Button
            text="Iniciar sesion"
            fullWidth={true}
            disabled={Object.values(errors).some((el) => el !== "")}
          />
        </div>

        <span
          className="hover:cursor-pointer underline"
          onClick={handleChangeType}
        >
          No tienes cuenta? <span className="font-bold">Registrate</span>
        </span>
      </>
    );
  } else {
    formBody = (
      <>
        <div className="input-container flex flex-col gap-6 mb-[24px]">
          <Input
            fullWidth={true}
            name={"email"}
            onChange={handleChangeInput}
            onBlur={() => validateEmail()}
            errors={errors}
            value={data["email"] ? data["email"] : ""}
            onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
          />
          <Input
            fullWidth={true}
            name={"password"}
            type="password"
            onChange={handleChangeInput}
            onBlur={() => validatePassword()}
            value={data["password"] ? data["password"] : ""}
            onFocus={() => setErrors((prev) => ({ ...prev, password: "" }))}
            errors={errors}
          />
          <Input
            fullWidth={true}
            name={"confirm_password"}
            onChange={handleChangeInput}
            type="password"
            onBlur={validateConfirmPassword}
            value={data["confirm_password"] ? data["confirm_password"] : ""}
            onFocus={() =>
              setErrors((prev) => ({ ...prev, confirm_password: "" }))
            }
            errors={errors}
          />
          <Button
            type="submit"
            text="Registrarse"
            fullWidth={true}
            disabled={Object.values(errors).some((el) => el !== "")}
          />
        </div>

        <span
          className="hover:cursor-pointer underline"
          onClick={handleChangeType}
        >
          Ya tienes cuenta? <span className="font-bold">Inicia sesion</span>
        </span>
      </>
    );
  }
  return (
    <div className="w-screen h-screen bg-[#131736] flex items-center justify-center">
      <form
        className="rounded-xl bg-white max-w-[90vw] max-h-[90vh] w-[350px]  p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center bold text-[24px] mb-4">
          {type === "login" ? "Log In" : "Register"}
        </h1>
        <p className="mb-6">
          Rellena las credenciales de abajo para validar tu proceso de
          validación
        </p>
        {formBody}
      </form>
    </div>
  );
}
