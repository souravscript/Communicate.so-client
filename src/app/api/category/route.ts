import { NextResponse } from "next/server";
import { headers } from 'next/headers';

const API_BASE_URL = 'http://localhost:8082';

export async function GET() {
  try {
    // Get cookies from the incoming request
    const headersList = headers();
    const cookie = headersList.get('cookie');

    // Return error if no authentication
    if (!cookie) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Attempt to fetch data from backend
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/v1/categories`, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie || '',
        },
        credentials: 'include',
      });

      // Handle response status
      if (!response.ok) {
        let errorMessage = 'Failed to fetch categories';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          console.error('Could not parse error response');
        }
        
        return NextResponse.json(
          { message: errorMessage },
          { status: response.status }
        );
      }

      // Parse and return successful response
      const data = await response.json();
      return NextResponse.json(data);

    } catch (error) {
      console.error('Connection error to backend:', error);
      return NextResponse.json(
        { message: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error in category route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const cookie = headersList.get('cookie');

    // Return error if no authentication
    if (!cookie) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate request body
    if (!body.categoryName) {
      return NextResponse.json(
        { message: 'Category name is required' },
        { status: 400 }
      );
    }

    try {
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
        let errorMessage = 'Failed to create category';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          console.error('Could not parse error response');
        }
        
        return NextResponse.json(
          { message: errorMessage },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data, { status: 201 });

    } catch (error) {
      console.error('Connection error to backend:', error);
      return NextResponse.json(
        { message: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error in category route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}