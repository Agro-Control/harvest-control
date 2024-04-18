import Lottie from "lottie-react";
import loading from "@/assets/loadingPipes.json";

const LoadingAnimation = () => {
    return (
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
