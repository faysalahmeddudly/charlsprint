import Image from "next/image";
import clsx from "clsx";

export const LogoComp = ({
  className,
  width = 183,
  height = 62,
  alt = "Logo",
  priority = false,
  src="/logo.png",
  ...rest
}) => {
  return (
    <Image
      src={src}
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
