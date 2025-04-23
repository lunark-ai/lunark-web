import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { verifyToken } from '@/lib/authMiddleware';
import { ethers } from 'ethers';

export async function POST(request: NextRequest) {
    const clonedReq = request.clone();
    const body = await clonedReq.json();
    const { price, userId } = body;

    const auth = await verifyToken(request, userId);
    if ('error' in auth) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        if (!price || typeof price !== 'number') {
            return NextResponse.json(
                { error: 'Invalid price parameter' },
                { status: 400 }
            );
        }
    
        const requestBody = {
            submitType: 'pay',
            lineItems: {
                data: [
                    {
                        priceData: {
                            currency: 'usdc',
                            productData: {
                                name: `Lunark AI Credits - $${price}`,
                                description: `Add $${price} worth of credits to your Lunark AI account`
                            },
                            type: 'one_time',
                            unitAmount: ethers.parseUnits(price.toString(), 8).toString()
                        },
                        quantity: 1
                    }
                ]
            },
            paymentSetting: {
                allowSwap: false,
                allowedChains: [
                    { chainId: 1 },   
                    { chainId: 10 },  
                    { chainId: 56 },   
                    { chainId: 137 },  
                    { chainId: 8453 },
                    { chainId: 42161 } 
                ],
                preferredChainId: 8453
            },
            successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`
        };

        const response = await axios.post(
            'https://api.copperx.io/api/v1/checkout/sessions',
            requestBody,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: `Bearer ${process.env.COPPERX_API_KEY}`
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data?.message || 'Failed to create checkout session' },
                { status: error.response?.status || 500 }
            );
        }
        
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}