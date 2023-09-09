import Link from "next/link";

import Input from "@/components/input";

import LogoAmarilo from "@/public/amarilo-logo.png";

import PasswordForm from "@/components/passwordForm";

export default function Auth() {
  return (
    <div className="w-100 flex h-screen flex-wrap content-evenly justify-center">
      <PasswordForm
        formType="login"
        db_host={process.env.DB_HOST}
        db_anon_key={process.env.DB_ANON_KEY}
      />
    </div>
  );
}
