import Image from "next/image";
import clsx from "clsx";

export const LogoComp = ({
  className,
  width = 120,
  height = 40,
  alt = "Logo",
  priority = false,
  ...rest
}) => {
  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={clsx("logo", className)}
      {...rest}
    />
  );
};

export default LogoComp;
