import { NextResponse } from "next/server";
import { headers } from 'next/headers';

const API_BASE_URL = 'http://localhost:8082';

export async function GET() {
  try {
    const headersList = headers();
    const cookie = headersList.get('cookie');

    console.log('Fetching members with cookie:', cookie);

    const response = await fetch(`${API_BASE_URL}/api/v1/members`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie || '',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from backend:', errorData);
      return NextResponse.json(
        { message: errorData.message || `Failed to fetch members: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched members:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const cookie = headersList.get('cookie');

    const response = await fetch(`${API_BASE_URL}/api/members`, {
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
    console.error('Error creating member:', error);
    return NextResponse.json(
      { message: "Failed to create member", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');
    const headersList = headers();
    const cookie = headersList.get('cookie');

    if (!ids) {
      return NextResponse.json(
        { message: "Member IDs are required" },
        { status: 400 }
      );
    }

    const memberIds = ids.split(',');
    
    const response = await fetch(`${API_BASE_URL}/api/members`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie || '',
      },
      credentials: 'include',
      body: JSON.stringify({ memberIds }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    return NextResponse.json({ message: "Members deleted successfully" });
  } catch (error) {
    console.error('Error deleting members:', error);
    return NextResponse.json(
      { message: "Failed to delete members", error },
      { status: 500 }
    );
  }
}
