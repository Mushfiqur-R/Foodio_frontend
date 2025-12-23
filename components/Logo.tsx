import Image from "next/image";
import logoImage from "../assets/foodio.jpg";

const Logo = () => {
  return (
    <div className="flex items-center gap-[8.09px] opacity-100">
      {/* Image */}
      <Image
        src={logoImage}
        alt="Logo"
        width={26}
        height={26}
      />

      {/* Text */}
      <span
        className="text-[#1A3C34] font-[CormorantGaramond] font-semibold text-[26px] leading-[100%] tracking-[-5%]"
        style={{ lineHeight: "100%" }}
      >
        Foodio
      </span>
    </div>
  );
};

export default Logo;
