'use client'

import React, { createContext, useEffect } from 'react'
import { useUserContext } from '.';
import { createAxiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

interface IPaymentProps {
 processPayment?: (sessionId: string, userId: string) => Promise<void>;
}

export const PaymentContext = createContext<IPaymentProps>({});

export function PaymentContextProvider({ children }: { children: React.ReactNode }) {
   const { user } = useUserContext();

   useEffect(() => {
       if (!user || !window.location.search) return;
       const params = new URLSearchParams(window.location.search);
       const sessionId = params.get('cx_session_id');
       if (sessionId) {
           processPayment(sessionId, user.id);
       }
   }, [user]);

   const processPayment = async (sessionId: string, userId: string) => {
       try {
           await createAxiosInstance().put('/user', {
               sessionId,
               userId
           });
           toast.success('Balance added successfully');
       } catch (error: any) {
           toast.error(error.response?.data?.error || 'Failed to process payment');
       }
   }

   return (
       <PaymentContext.Provider value={{
           processPayment
       }}>
           {children}
       </PaymentContext.Provider>
   )
}