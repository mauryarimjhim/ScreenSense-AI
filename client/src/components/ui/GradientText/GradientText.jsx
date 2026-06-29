function GradientText({children})
{
    return(
        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
            {children}
        </span>
    );
}

export default GradientText;