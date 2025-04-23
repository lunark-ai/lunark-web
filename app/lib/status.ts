import { NextResponse } from 'next/server';
import axios from 'axios';

export async function fetchStatus(request?: Request, userId?: string) {
    try {
        const response = await axios.get(`${process.env.API_URL}/status`, {
            headers: {
                'X-API-Key': `${process.env.API_KEY}`
            }
        });
        
        return response.data;
    } catch (error: any) {
        console.error('Could not fetch status:', error);
        return null;
    }
}