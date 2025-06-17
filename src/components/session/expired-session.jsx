import { useSession } from "@Hooks";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { closeModal } from "@Slice";
import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import { Clock, LogIn } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExpiredSession = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.expired.isOpen);

  const navigate = useNavigate();
  const { isExpired } = useSession();

  useEffect(() => {
    if (isOpenModal) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpenModal, onOpen, onClose]);

  const handleClose = () => {
    dispatch(closeModal());
    isExpired();
    onClose();
    navigate("/", { replace: true });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} hideCloseButton>
      <ModalContent>
        <>
          <ModalBody>
            <div className="text-center space-y-2 mt-5">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div
                    className={cn(
                      "h-16 w-16 rounded-full flex items-center justify-center",
                      ThemeBasic.backgroundCard
                    )}
                  >
                    <Clock className={cn("h-10 w-10", ThemeBasic.textWhite)} />
                  </div>
                </div>
              </div>
              <h2 className={cn("text-2xl font-semibold", ThemeBasic.title)}>
                Sesión Expirada
              </h2>
              <p className={cn("text-sm", ThemeBasic.textGray)}>
                Tu sesión ha expirado por inactividad
              </p>
            </div>
            <div className="text-center space-y-4">
              <p className={ThemeBasic.textGray}>
                Por razones de seguridad, tu sesión ha sido cerrada. Por favor,
                vuelve a iniciar sesión para continuar usando One Service Domicilios.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={handleClose}
              className={cn(
                "w-full rounded-full font-normal text-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center py-2",
                ThemeBasic.backgroundPrimary,
                ThemeBasic.textWhite,
                ThemeBasic.hoverBackgroundPrimary
              )}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Volver a Iniciar Sesión
            </button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ExpiredSession;
