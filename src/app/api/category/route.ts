import { NextResponse } from "next/server";
import { headers } from 'next/headers';

const API_BASE_URL = 'http://localhost:8082';

export async function GET() {
  try {
    // Get cookies from the incoming request
    const headersList = headers();
    const cookie = headersList.get('cookie');

    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      headers: {
        'Content-Type': 'application/json',
        // Forward the cookie header
        'Cookie': cookie || '',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: "Failed to fetch categories", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const cookie = headersList.get('cookie');

    console.log("categoryName", body);
    console.log("Forwarding cookie:", cookie);

    const response = await fetch(`${API_BASE_URL}/api/v1/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie || '',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { message: "Failed to create category", error },
      { status: 500 }
    );
  }
}