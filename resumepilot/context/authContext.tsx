"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiService } from "@/services/apiService";
import { useRouter } from 'next/navigation';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await apiService.fetchProfile();
      console.log("res", res)
      setUser(res.data.user);
    } catch (error) {
      console.error("Auth fetch failed", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const session = typeof window !== "undefined" && sessionStorage.getItem("user");
    if (session) {
      fetchUser(); // only try to fetch if session exists
    } else {
      setLoading(false);
      Router.push("/auth/signin")
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
