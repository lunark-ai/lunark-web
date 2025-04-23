import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ethers } from 'ethers';
import { networks } from '@/constants';

// ERC20 ABI with only the balanceOf function
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)"
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const chainId = Number(searchParams.get('chainId'));

    if (!address || !chainId) {
      return NextResponse.json({ error: 'Address and chainId are required' }, { status: 400 });
    }

    // Get supported tokens for the current chain
    const tokens = await prisma.token.findMany({
      where: {
        deployments: {
          some: {
            chainId,
            toolSupport: {
              some: {
                isEnabled: true
              }
            }
          }
        }
      },
      include: {
        deployments: {
          where: {
            chainId,
            toolSupport: {
              some: {
                isEnabled: true
              }
            }
          }
        }
      }
    });

    if (!tokens.length) {
      return NextResponse.json({ balances: [] });
    }

    // Initialize Web3 provider
    const network = networks.find(n => n.chainId === chainId);
    const provider = new ethers.JsonRpcProvider(network?.rpcUrl);

    // Fetch balances for all tokens
    const balancePromises = tokens.map(async (token) => {
      await new Promise(resolve => setTimeout(resolve, 50));
      const deployment = token.deployments[0];
      const contract = new ethers.Contract(deployment.address, ERC20_ABI, provider);
      const balance = await contract.balanceOf(address);
      return {
        symbol: token.symbol,
        name: token.name,
        decimals: deployment.decimals,
        address: deployment.address,
        logoURI: token.logoURI,
        balance: ethers.formatUnits(balance, deployment.decimals),
        priceChange: '0' // Default to 0 price change
      };
    });

    const balances = await Promise.all(balancePromises);

    // Filter out tokens with zero balance
    const nonZeroBalances = balances.filter(token => 
      parseFloat(token.balance) > 0
    );

    return NextResponse.json({ balances: nonZeroBalances });
  } catch (error) {
    console.error('Failed to fetch token balances:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token balances' },
      { status: 500 }
    );
  }
} 