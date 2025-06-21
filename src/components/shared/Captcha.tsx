"use client";

import { CaptchaProps } from "@/interfaces/shared";
import { RotateCw } from "lucide-react";
import { useEffect } from "react";
import { Input } from ".";

const Captcha = ({
  name,
  captchaName,
  captchaError,
  setCaptchaError,
  onChange,
  captcha,
  setCaptcha,
  generateRandomString,
}: CaptchaProps) => {
  const refreshString = () => {
    setCaptcha(generateRandomString());
    if (setCaptchaError) {
      setCaptchaError("");
      generateRandomString();
    }
  };

  useEffect(() => {
    if (captchaError) {
      setCaptcha(generateRandomString());
    }
  }, [captchaError, generateRandomString, setCaptcha]);

  return (
    <>
      <div
        style={{ userSelect: "none" }}
        onMouseDown={(e) => e.preventDefault()}
        className="flex items-center gap-1.5 tracking-widest"
      >
        <RotateCw
          className="cursor-pointer"
          size={18}
          onClick={refreshString}
        />
        <div className="bg-grey px-2 text-xl italic text-black">{captcha}</div>
      </div>
      <input type="text" name={name} hidden readOnly value={captcha} />
      <Input
        label={"Enter Captcha code"}
        name={captchaName}
        type={"text"}
        error={captchaError}
        onChange={onChange}
      />
    </>
  );
};
export default Captcha;
