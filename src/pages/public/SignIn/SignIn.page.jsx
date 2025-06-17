import { Button, Input } from "@Components";
import { LayoutForm } from "@CptPublic";
import { useCookie, useSession } from "@Hooks";
import { useToast } from "@Providers";
import { ServiceSignIn } from "@Services";
import { ThemeBasic } from "@Theme";
import { cn, isValidEmail } from "@Utils";
import { AtSign, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const visibility = showPassword ? "text" : "password";
  const toggleVisibility = () => setShowPassword(!showPassword);

  const { addToast } = useToast();
  const { signIn } = useSession();
  const { setCookie } = useCookie();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        addToast({
          type: "warning",
          title: `Faltan datos`,
          content: "Por favor ingrese correo electrónico y contraseña",
          duration: 3000,
          persistent: false,
        });
        return;
      }

      if (!isValidEmail(email)) {
        addToast({
          type: "warning",
          title: `Correo o nombre de usuario inválido`,
          content:
            "Por favor ingrese un correo electrónico o nombre de usuario válido",
          duration: 3000,
          persistent: false,
        });
        return;
      }

      setIsLoading(true);

      const userData = await ServiceSignIn({ email, password });
      addToast({
        type: "success",
        title: `Bienvenid@ ${userData.data.user.user_name}`,
        content: userData.message,
        duration: 5000,
        persistent: false,
      });
      await signIn(userData.data.user);
      setCookie("tk", userData.data.tokens.token);
      setCookie("rf", userData.data.tokens.refresh_token);
      navigate("/tablero/administracion-de-colaboradores");
    } catch (error) {
      console.log(error);
      return addToast({
        type: "destructive",
        title: error.error,
        content: error.message,
        duration: 3000,
        persistent: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutForm>
      <div className="p-8 space-y-6">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <img
            src="https://www.bancodebogota.com/documents/38440/2713321/Banco+de+Bogota%CC%81.svg/ae6fe9a9-fdc2-c13a-7404-9d3b62424d7e?t=1658163297427"
            alt="Banco de Bogotá"
            className="h-16 object-contain"
          />
          <div className="flex flex-col items-center justify-center">
            <h2 className={cn(ThemeBasic.text, "text-2xl font-bold")}>
              Bienvenido a OnBoardingApp
            </h2>
            <p className={cn("text-sm mt-2", ThemeBasic.textGray)}>
              Accede a todos los servicios de OnBoardingApp y administra los
              meetings de tus colaboradores
            </p>
          </div>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="w-full flex flex-col gap-6">
            <Input
              label="Correo electrónico o nombre de usuario"
              type="text"
              endContent={
                <AtSign
                  className={cn("w-5 h-5", ThemeBasic.text)}
                  strokeWidth={1.4}
                />
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Contraseña"
              type={visibility}
              endContent={
                visibility === "password" ? (
                  <Eye
                    className={cn(
                      "w-5 h-5 cursor-pointer transition-colors",
                      ThemeBasic.text,
                      ThemeBasic.hoverText
                    )}
                    strokeWidth={1.4}
                    onClick={toggleVisibility}
                  />
                ) : (
                  <EyeClosed
                    className={cn(
                      "w-5 h-5 cursor-pointer transition-colors",
                      ThemeBasic.text,
                      ThemeBasic.hoverText
                    )}
                    strokeWidth={1.4}
                    onClick={toggleVisibility}
                  />
                )
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className={cn(
              "w-full !rounded-full !py-2",
              ThemeBasic.backgroundPrimary,
              "hover:bg-[#002C76]/90 mt-6"
            )}
            isLoading={isLoading}
          >
            <span className="mr-2 text-white">Iniciar sesión</span>
          </Button>
        </form>

        <div className="text-center text-sm text-[#95A5A6]">
          ¿No tienes una cuenta?{" "}
          <Link
            to={"/crear-cuenta"}
            className={cn(
              ThemeBasic.text,
              ThemeBasic.hoverText,
              "transition-colors"
            )}
          >
            Regístrate
          </Link>
        </div>
      </div>
    </LayoutForm>
  );
};

export default SignInPage;
