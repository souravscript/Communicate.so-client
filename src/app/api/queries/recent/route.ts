import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE_URL ='http://localhost:8082';

export async function GET() {
  const headersList = headers();
  const cookie = headersList.get('cookie');
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/queries/recent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie || '',
      },
      //credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || 'Failed to fetch recent queries' },
        { status: response.status }
      );
    }

    const queries = await response.json();
    return NextResponse.json(queries);
  } catch (error) {
    console.error('Error fetching recent queries:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch recent queries" },
      { status: 500 }
    );
  }
}
