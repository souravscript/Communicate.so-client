import { NextResponse } from "next/server";
import { headers } from 'next/headers';

const API_BASE_URL = 'http://localhost:8082';

export async function GET() {
  try {
    const headersList = headers();
    const cookie = headersList.get('cookie');

    const response = await fetch(`${API_BASE_URL}/api/v1/data-sources`, {
      headers: {
        'Content-Type': 'application/json',
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
    console.error('Error fetching data sources:', error);
    return NextResponse.json(
      { message: "Failed to fetch data sources", error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const headersList = headers();
    const cookie = headersList.get('cookie');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: "Data source ID is required" },
        { status: 400 }
      );
    }

    console.log(`Toggling data source with ID: ${id}`);

    const response = await fetch(`${API_BASE_URL}/api/v1/data-sources/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie || '',
      },
      credentials: 'include',
      body: JSON.stringify({ isEnabled: true }), // Add this to explicitly set the enabled state
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error response from backend:', error);
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    console.log('Successfully toggled data source:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating data source:', error);
    return NextResponse.json(
      { message: "Failed to update data source", error },
      { status: 500 }
    );
  }
}