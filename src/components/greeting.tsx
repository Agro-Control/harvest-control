const Greeting = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden text-white ">
            <h1 className="font-poppins text-2xl font-bold uppercase">Be Welcome 😎</h1>
            <p className="mt-5 text-base">
                Made with 💙 by{" "}
                <a
                    className="transition-colors duration-200  hover:text-blue-400"
                    href="https://www.github.com/maiconlara"
                    target="_blank"
                    rel="noreferrer"
                >
                    Maicon Lara
                </a>
            </p>
        </div>
    );
};
export default Greeting;
