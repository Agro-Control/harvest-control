import loading from "@/assets/loadingPipes.json";
import Lottie from "lottie-react";



/**
 * Componente que renderiza a animação de loading, usando arquivo json
 */
const LoadingAnimation = () => {
    return (
        // O componente Lottie recebe o arquivo json e transforam em animação
        <Lottie
            animationData={loading}
            loop={true}
            style={{
                width: "200px",
                height: "200px",
            }}
        />
    );
};

export default LoadingAnimation;
