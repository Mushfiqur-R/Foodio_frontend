"use client"
import Button from "@/components/Button";
import Input from "@/components/InputTextBox";
import Logo from "@/components/Logo";
import { useState } from "react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    address: '',
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSignIn = () => {
    console.log('Sign In:', { email: formData.email, password: formData.password });
    alert('Sign In functionality would be implemented here');
  };

  const handleRegister = () => {
    console.log('Register:', formData);
    alert('Registration functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4">

      <div className="bg-[#F5F5F0] rounded-[24px] p-[48px] w-full max-w-[530px] shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-[16px]">
          <Logo />
        </div>

        {/* Tagline */}
        <p className="text-center text-[#7A7A7A] text-[16px] mb-[32px]">
          Premium flavors, delivered.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-[8px] mb-[32px] bg-white rounded-[56px] p-[4px]">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 h-[40px] rounded-[56px] font-medium text-[14px] transition ${
              activeTab === 'signin'
                ? 'bg-[#F5F5F0] text-[#1A3C34]'
                : 'bg-white text-[#7A7A7A]'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 h-[40px] rounded-[56px] font-medium text-[14px] transition ${
              activeTab === 'register'
                ? 'bg-[#F5F5F0] text-[#1A3C34]'
                : 'bg-white text-[#7A7A7A]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Sign In Form */}
        {activeTab === 'signin' && (
          <div className="space-y-[24px]">
            <div>
              <label className="block text-[#1A3C34] text-[14px] font-medium mb-[8px]">
                Email
              </label>
              <Input
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                width="w-full"
                height="h-[48px]"
                type="email"
              />
            </div>

            <div>
              <label className="block text-[#1A3C34] text-[14px] font-medium mb-[8px]">
                Password
              </label>
              <Input
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange('password')}
                width="w-full"
                height="h-[48px]"
                type="password"
              />
            </div>

            <div className="pt-[8px]">
              <Button
                text="Sign In"
                onClick={handleSignIn}
                width="w-full"
                height="h-[48px]"
                bgColor="#1A3C34"
                textColor="#FFFFFF"
              />
            </div>
          </div>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <div className="space-y-[24px]">
            <div>
              <label className="block text-[#1A3C34] text-[14px] font-medium mb-[8px]">
                Full Name
              </label>
              <Input
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                width="w-full"
                height="h-[48px]"
              />
            </div>

            <div>
              <label className="block text-[#1A3C34] text-[14px] font-medium mb-[8px]">
                Email
              </label>
              <Input
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                width="w-full"
                height="h-[48px]"
                type="email"
              />
            </div>

            <div>
              <label className="block text-[#1A3C34] text-[14px] font-medium mb-[8px]">
                Address
              </label>
              <Input
                placeholder="e.g. House-23, Road-23, Jamaica, USA"
                value={formData.address}
                onChange={handleInputChange('address')}
                width="w-full"
                height="h-[48px]"
              />
            </div>

            <div>
              <label className="block text-[#1A3C34] text-[14px] font-medium mb-[8px]">
                Password
              </label>
              <Input
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange('password')}
                width="w-full"
                height="h-[48px]"
                type="password"
              />
            </div>

            <div className="pt-[8px]">
              <Button
                text="Create Account"
                onClick={handleRegister}
                width="w-full"
                height="h-[48px]"
                bgColor="#1A3C34"
                textColor="#FFFFFF"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

