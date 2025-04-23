import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { networks } from '@/constants';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const chainId = searchParams.get('chainId');

    if (!address || !chainId) {
      return NextResponse.json({ error: 'Missing address or chainId' }, { status: 400 });
    }

    const network = networks.find(n => n.chainId === parseInt(chainId));
    if (!network) {
      return NextResponse.json({ error: 'Network not found' }, { status: 400 });
    }

    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const balance = await provider.getBalance(address);

    return NextResponse.json({
      symbol: network.nativeCurrency.symbol,
      name: network.nativeCurrency.name,
      balance: ethers.formatEther(balance.toString()).toString(),
      decimals: network.nativeCurrency.decimals,
      address: '',
      logoURI: network.nativeCurrency.logoURI
    });

  } catch (error: any) {
    console.error('Failed to fetch native balance:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 